// webpack
const webpack = require('webpack');

// base
const baseConf = require('./webpack.base');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const conf = {
  devtool: 'dev',

  naming2: 1,

  ids: false
}

// Object.assign({}, baseConf, conf)


module.exports = (ENV) => {

  return {
    context: ENV.BASE_PATH,

    bail: false,

    devtool: 'inline-source-map',

    entry: baseConf.entry,

    resolve: baseConf.resolve,

    module: baseConf.module,

    output: {
      path: ENV.BUILD_PATH,
      filename: '[name].bundle.js',
      chunkFilename: '[name].[id].bundle.js',
      publicPath: ENV.PUBLIC_PATH
    },

    plugins: [
      new CommonsChunkPlugin({

        name: 'vendor', 
        filename: '[name].common.js',
        minChunks: function (module, count) {
          console.log('count', count);
        }
      }),

      // hmr Plugins
      // OccurenceOrderPlugin removed.
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin() // NoErrorsPlugin deprecated

    ].concat(baseConf.plugins),

    devServer: {
      host: ENV.SVR_WDS_HOST,

      port: ENV.SVR_WDS_PORT,

      publicPath: ENV.PUBLIC_PATH,

      noInfo: true,

      inline: true,

      hot: true,

      proxy: {
        '*': 'http://' + ENV.SVR_EXP_HOST + ':' + ENV.SVR_EXP_PORT
      },

      stats: {
        assets: true,
        colors: true,
        version: true,
        hash: true,
        timings: true,
        chunks: true,
        chunkModules: false,
        modules: false
      }
    }
  }
};

