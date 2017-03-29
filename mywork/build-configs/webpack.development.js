// webpack
const webpack = require('webpack');

// base
const baseConf = require('./webpack.base');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

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
          // console.log('count', count);
        }
      }),

      // hmr Plugins
      // OccurenceOrderPlugin removed.
      new webpack.HotModuleReplacementPlugin(),

      // [HMR] Consider using the NamedModulesPlugin for module names.
      // 브라우저에서 HMR 에러발생시 module name 표시
      new webpack.NamedModulesPlugin(),

      new webpack.NoEmitOnErrorsPlugin() // NoErrorsPlugin deprecated

    ].concat(baseConf.plugins),

    devServer: {
      // 디폴트는 localhost. 만약 외부의 다른 host를 잡고 싶다면 0.0.0.0.
      host: ENV.SVR_WDS_HOST,

      port: ENV.SVR_WDS_PORT,

      publicPath: ENV.PUBLIC_PATH,

      // console에 진행사항 표시 (remove)
      // progress: true,

      // error, warning을 console에서 안보이게 함
      quiet: false,

      // build Status 를 보여주지 않는다.
      noInfo: false,

      // inline: true,

      hot: true,

      // proxying하기 원하는 URL을 설정. 현재 백엔드 서버 호스트를 설정
      /*proxy: {
        '*': 'http://' + ENV.SVR_EXP_HOST + ':' + ENV.SVR_EXP_PORT
      },*/

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

