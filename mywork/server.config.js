// import 
var express = require('express');
var logger = require('morgan');
var exphbs = require('express-handlebars');

var router = require('./routes/common-routes');

var app = express();

var manifestLoader = require('./middleware/manifest');

// dev server
var webpackDevServer = require('webpack-dev-server');

// set environment //
var ENV = require('./build-configs/env');

var pkg = require('./package.json');

var url = require('url');

var proxy = require('proxy-middleware');

const path = require('path');

// console.log('DEV', ENV.ENV);
// console.log('Path', __dirname + '/public');

// set middleware //
// public path
app.use(express.static(__dirname + '/public'));

// set view engine
var hbs = exphbs.create({
    extname: '.hbs',
    partialsDir: 'views/partials/'
    // helpers: require('./views/helpers/helpers')
  });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set('view cache', false);

// set logger 
app.use(logger('short'));

console.log('pkg.version', pkg.version);


// set router
app.use(router);



// manifest Loader
// app.use(manifestLoader('./static/dist/manifest-' + pkg.version + '.json'));

// webpack server
// 서버를 2개로 띄우기 위함
if (ENV.ENV === 'development') {
  var config = require('./webpack.config');
  var webpack = require('webpack');
  var webpackCompiler = webpack(config);

  // dev server
  Object.keys(config.entry).forEach(function (prop) {
    config.entry[prop].unshift('webpack/hot/dev-server');
  });

  const proxyUrl = 'http://' + ENV.SVR_WDS_HOST + ':' + ENV.SVR_WDS_PORT + '/';
  // config.entry['wds'] = `webpack-dev-server/client?http://${ENV.SVR_WDS_HOST}:${ENV.SVR_WDS_PORT}/`
  config.entry['wds'] = 'webpack-dev-server/client?' + proxyUrl;

  // proxy url
  console.log('###############', url.parse(path.join(proxyUrl, 'dist')));
  // app.use('/dist/', proxy(url.parse(path.join(proxyUrl, 'dist'))));
  app.use('/dist/', proxy(url.parse('http://' + ENV.SVR_WDS_HOST + ':' + ENV.SVR_WDS_PORT + '/dist/')));


  var devServer = new webpackDevServer(webpackCompiler, config.devServer);
  devServer.listen(ENV.SVR_WDS_PORT, function () {
    console.log('Webpack-dev-server is listening...', ENV.SVR_WDS_PORT);
  });
}



// webpack middleware
/*
if (env !== 'development') {
  var webpackMiddleware = require('webpack-dev-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var webpackCompiler = webpack(config);
  var opts = {
    stats: {
      colors: true
    },
    publicPath: '/dist'
  }
  // webpack-hot-middleware: 
  // - 파일이 수정 될 때 번들이 완료된 파일을 새로 로딩하는게 아닌, 
  //   바뀐 부분만 패치하는 방식으로 업데이트하는 기능을 지원하는 라이브러리
  var webpackDevMiddlewareInstance = webpackMiddleware(webpackCompiler, opts);
  
  app.use(webpackDevMiddlewareInstance);
}
*/
// set error
// 404
app.use(function (req, res, next) {
  var err = new Error('not found');
  err.status = 404;
  next(err);
});

// Base error
app.use(function (err, req, res, next) {
  var status = err.status || 500;
  res.status(status).render('error', {status: status, layout: false});
});


// set server 
app.listen(ENV.SVR_EXP_PORT, function () {
  console.log('Server Start!!!', ENV.SVR_EXP_PORT);
});
