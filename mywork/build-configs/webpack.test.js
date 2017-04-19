// webpack
const webpack = require('webpack');

// include
// plugin

// const dist = path.resolve(process.cwd(), 'dist');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// env
const ENV = require('./env');

// util
const path = require('path');

// console.log('webpack', webpack);

// console.log('environment', ENV.SET_ESLINT_PATH);

module.exports = {
  context: ENV.BASE_PATH,

  bail: false,

  devtool: 'inline-source-map',

  entry: {
    'vendor': [ENV.SOURCE_DIR + '/vendor.js'],  // in context path
    // 'app': [
    //   ENV.SOURCE_DIR + '/bootstrap_test.js',
    //   ENV.SOURCE_DIR + '/app_index.js'
    // ],
    // 'app2': [ENV.SOURCE_DIR + '/app_index_other.js'],
    'handle': [ENV.SOURCE_DIR + '/handlebars'],
    // 'entryProto': [ENV.SOURCE_DIR + '/entryProto.js']
  },

  output: {
    path: ENV.BUILD_PATH,
    filename: '[name].bundle.js',
    chunkFilename: '[name].[id].bundle.js',
    publicPath: ENV.PUBLIC_PATH,
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.js', '.hbs'],
    modules: [
      'node_modules',
      ENV.SOURCE_DIR
    ]
  },

  externals: [
  {
    'handlebars/runtime': {
      root: 'Handlebars',
      amd: 'handlebars.runtime',
      commonjs2: 'handlebars/runtime',
      commonjs: 'handlebars/runtime'
    },

    'handlebars': {
      root: 'Handlebars',
      amd: 'Handlebars',
      commonjs: 'handlebars',
      commonjs2: 'handlebars'
    },
  },
 {
    'jquery': 'jQuery'
  }
  ],

  module: {
    noParse: [],
    loaders: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          helperDirs: [
            ENV.SOURCE_DIR + '/handlebars/helpers'
          ],
          runtime: 'handlebars/runtime'
        },
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
  ],

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
};























