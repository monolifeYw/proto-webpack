// env
const ENV = require('./build-configs/env');

// config require
const webpackConfig = require(`./build-configs/webpack.${ENV.ENV}`)(ENV);

if (ENV.SVR_HMR_MODE) {
  Object.keys(webpackConfig.entry).forEach(function (prop) {
    webpackConfig.entry[prop].unshift('webpack/hot/dev-server');
  });

  /*
  https://github.com/glenjamin/webpack-hot-middleware
  
  path - The path which the middleware is serving the event stream on
  name - Bundle name, specifically for multi-compiler mode
  timeout - The time to wait after a disconnection before attempting to reconnect
  overlay - Set to false to disable the DOM-based client-side overlay.
  reload - Set to true to auto-reload the page when webpack gets stuck.
  noInfo - Set to true to disable informational console logging.
  quiet - Set to true to disable all console logging.
  dynamicPublicPath - Set to true to use webpack publicPath as prefix of path. 
  (We can set __webpack_public_path__ dynamically at runtime in the entry point, see note of output.publicPath)
   */

  webpackConfig.entry['wds'] = 'webpack-hot-middleware/client?path=/__webpack_hmr';
  // webpackConfig.entry['wds'] = 'webpack-hot-middleware/client?' + ENV.SVR_WDS_PATH;
}

module.exports = webpackConfig;