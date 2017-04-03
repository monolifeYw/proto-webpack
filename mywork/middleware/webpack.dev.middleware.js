const webpackMiddleware = require('webpack-dev-middleware');

const webpackHotMiddleware = require('webpack-hot-middleware');

const webpack = require('webpack');

const webpackConfig = require('../webpack.config');

const webpackDevOpts = webpackConfig.devServer;

const webpackCompiler = webpack(webpackConfig);

const test = require('./custom.mid');

// const webpackDevMiddlewareInstance = webpackMiddleware(webpackCompiler, webpackDevOpts);
var t = test('testmode:');
console.log('ttttt', t);
module.exports = {
  devMid: webpackMiddleware(webpackCompiler, webpackDevOpts),
  hotMid: webpackHotMiddleware(webpackCompiler),
  abc: t
}
/*
function abc(m) {
  const mode = m;
  console.log('===========', abc)
  return function (req, res, next) {
    console.log('abc mode', mode);
    console.log('abc', this);
  }
}*/

/*module.exports = (app, ENV) => {
  console.log('ENV && ENV.SVR_HMR_MODE', ENV && ENV.SVR_HMR_MODE);
  const devMid = webpackMiddleware(webpackCompiler, webpackDevOpts);
  const hotMid = (ENV && ENV.SVR_HMR_MODE) ? webpackHotMiddleware(webpackCompiler) : null;

  function middleware(req, res, next) {

    if (typeof devMid === 'undefined') { return next(); }

    devMid.apply(app, arguments);
    // devMid(req, res, next);

    if (hotMid !== null) {
      // hotMid(req, res, next);
      hotMid.apply(app, arguments);
    }
  }

  return middleware;
}*/

/*
_http_outgoing.js:357
    throw new Error('Can\'t set headers after they are sent.');
    ^

Error: Can't set headers after they are sent.
    at ServerResponse.OutgoingMessage.setHeader (_http_outgoing.js:357:11)
    at ServerResponse.header (/Applications/MAMP/htdocs/webpack-proto/mywork/node_modules/express/lib/response.js:725:10)
    at ServerResponse.send (/Applications/MAMP/htdocs/webpack-proto/mywork/node_modules/express/lib/response.js:170:12)
    at done (/Applications/MAMP/htdocs/webpack-proto/mywork/node_modules/express/lib/response.js:962:10)
    at Immediate.<anonymous> (/Applications/MAMP/htdocs/webpack-proto/mywork/node_modules/express-handlebars/lib/utils.js:26:13)
    at runCallback (timers.js:666:20)
    at tryOnImmediate (timers.js:639:5)
    at processImmediate [as _immediateCallback] (timers.js:611:5)
 */