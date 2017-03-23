// import 
var express = require('express');
var logger = require('morgan');
var exphbs = require('express-handlebars');

var router = require('./routes/common-routes');

var app = express();

// set environment //
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('DEV', env);
console.log('Path', __dirname + '/public');

// set middleware //
// public path
app.use(express.static(__dirname + '/public'));

// set view engine
var hbs = exphbs.create({
    extname: '.hbs'
  });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set('view cache', false);

// set logger 
app.use(logger('short'));

// set router
app.use(router);

// webpack middleware
if (env === 'development') {
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
  var webpackDevMiddlewareInstance = webpackMiddleware(webpackCompiler, opts);
  
  app.use(webpackDevMiddlewareInstance);
}

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
  console.log('Server Start!!!');
});
