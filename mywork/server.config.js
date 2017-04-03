// import 
const express = require('express');
const logger = require('morgan');
const exphbs = require('express-handlebars');

const router = require('./routes/common-routes');

const app = express();

const manifestLoader = require('./middleware/manifest');

// dev server
const webpackDevServer = require('webpack-dev-server');

// set environment //
const ENV = require('./build-configs/env');

const pkg = require('./package.json');

const url = require('url');

const proxy = require('proxy-middleware');

const path = require('path');


const webpackMiddleware = require('./middleware/webpack.dev.middleware');

// console.log('webpackMiddleware', webpackMiddleware);

// console.log('DEV', ENV.ENV);
// console.log('Path', __dirname + '/public');

// set middleware //
// public path
app.use(express.static(__dirname + '/public'));

// set view engine
const hbs = exphbs.create({
    extname: '.hbs',
    partialsDir: 'views/partials/',
    helpers: require('./src/handlebars/helpers/serverHelpers')
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
/*if (ENV.ENV === 'development') {
  const config = require('./webpack.config');
  const webpack = require('webpack');
  
  // dev server
  
 
  app.use('/dist/', proxy(url.parse(ENV.SVR_WDS_PATH + 'dist')));
  // console.log('config', config);
  const webpackCompiler = webpack(config);
  const devServer = new webpackDevServer(webpackCompiler, config.devServer);
  devServer.listen(ENV.SVR_WDS_PORT, function () {
    console.log('Webpack-dev-server is listening...', ENV.SVR_WDS_PORT);
  });
}*/

// webpack Dev server
if (ENV.ENV === 'development') {
  // case.1 
  app.use(webpackMiddleware.devMid);

  if (ENV.SVR_HMR_MODE) {
    app.use(webpackMiddleware.hotMid);
  }

  app.use(webpackMiddleware.abc);

  // case.2 연구 대상
  // app.use(webpackMiddleware(app, ENV));
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
  const err = new Error('not found');
  err.status = 404;
  next(err);
});

// Base error
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  res.status(status).render('error', {status: status, layout: false});
});


// set server 
app.listen(ENV.SVR_EXP_PORT, function () {
  console.log('Server Start!!!', ENV.SVR_EXP_PORT);
});
