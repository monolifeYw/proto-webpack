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
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var pkg = require('./package.json');

console.log('DEV', env);
console.log('Path', __dirname + '/public');

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

// manifest Loader
app.use(manifestLoader('./static/dist/manifest-' + pkg.version + '.json'));

// set router
app.use(router);

// webpack server
// 서버를 2개로 띄우기 위함
if (env === 'development') {
  var config = require('./webpack.config');
  var webpack = require('webpack');
  var webpackCompiler = webpack(config);
  var opts = Object.assign({}, config.devServer, {
    publicPath: '/dist'
  });
  var devServer = new webpackDevServer(webpackCompiler, opts);
  devServer.listen(8081, function () {
    console.log('Webpack-dev-server is listening... 8081');
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
app.listen(8080, function () {
  console.log('Server Start!!! 8080');
});
