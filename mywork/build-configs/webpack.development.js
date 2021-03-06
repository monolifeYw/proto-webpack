// webpack
const webpack = require('webpack');

// base
const baseConf = require('./webpack.base');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const ExternalsPlugin = require('webpack2-externals-plugin');

module.exports = (ENV) => {


  console.log('##########', baseConf.externals);

  return {
    context: ENV.BASE_PATH,

    bail: false,

    devtool: 'inline-source-map',

    entry: baseConf.entry,

    externals: [{
      'handlebars/runtime': {
        global: 'Handlebars',
        amd: 'handlebars.runtime',
        commonjs2: 'handlebars/runtime',
        commonjs: 'handlebars/runtime'
      },

      'handlebars': {
        global: 'Handlebars',
        amd: 'Handlebars',
        commonjs: 'handlebars',
        commonjs2: 'handlebars'
      }
    }],
    // externals: [/handlebars.runtime/],
    
    resolve: baseConf.resolve,

    module: baseConf.module,

    output: {
      path: ENV.BUILD_PATH,
      filename: '[name].bundle.js',
      chunkFilename: '[name].[id].bundle.js',
      publicPath: ENV.PUBLIC_PATH,
      libraryTarget: 'umd'
    },

    plugins: [
      new CommonsChunkPlugin({

        name: 'vendor', 
        filename: '[name].common.js',
        minChunks: function (module, count) {
          // console.log('count', count);
        }
      }),

      /*new ExternalsPlugin({

      })*/

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

      // hot: true, //ENV.SVR_HOT_MODE,

      // reload: true,

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

