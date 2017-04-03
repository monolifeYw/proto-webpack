// env
const ENV = require('./build-configs/env');

// config require
const webpackConfig = require(`./build-configs/webpack.${ENV.ENV}`)(ENV);

if (ENV.SVR_HMR_MODE) {
  Object.keys(webpackConfig.entry).forEach(function (prop) {
    webpackConfig.entry[prop].unshift('webpack/hot/dev-server');
  });

  webpackConfig.entry['wds'] = 'webpack-hot-middleware/client?' + ENV.SVR_WDS_PATH;
}

module.exports = webpackConfig;