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

// console.log('environment', ENV.SET_ESLINT_PATH);

module.exports = {

  entry: {
    'vendor': [ENV.SOURCE_DIR + '/vendor.js'],  // in context path
    'app': [
      ENV.SOURCE_DIR + '/bootstrap_test.js',
      ENV.SOURCE_DIR + '/app_index.js'
    ],
    'app2': [ENV.SOURCE_DIR + '/app_index_other.js'],
    'handle': [ENV.SOURCE_DIR + '/handlebars'],
    'entryProto': [ENV.SOURCE_DIR + '/entryProto.js']
  },

  externals: [{
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
    }
  }],

  resolve: {
    extensions: ['.js', '.hbs', '.css', '.scss'],
    modules: [
      'node_modules',
      ENV.SOURCE_DIR
    ]
  },

  externals: [{
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
    }
  }],

  module: {
    rules: [
      // preload
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: [ENV.SOURCE_DIR],
        exclude: /(node_modules|dist|static)/
      },

      // js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      // hbs
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          helperDirs: [
            ENV.SOURCE_DIR + '/handlebars/helpers'
          ],
          runtime: 'handlebars/runtime'
        }
      },

      // scss
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', 
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed',
                sourceMap: true,
                sourceMapContents: true
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [

    new ExtractTextPlugin({
      filename: 'app.css',
      disable: false,
      allChunks: true
    }),

    new webpack.LoaderOptionsPlugin({

      // css 에 대한 minimize
      // minimize: true,
      options: {
        eslint: {
          // Fail only on errors
          // 실패해도 빌드를 계속 진행할 것인가에 대한 부분
          failOnWarning: false,
          failOnError: false, // @@@@@@@@ true 로 변경해야 함
          configFile: ENV.SET_ESLINT_PATH,
          useEslintrc: true,
          cache: false
        }
      }
    }),

    /*
    // uglify plugin
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,  // 난독화
      beautify: false, // 가독성
      // compress: true, // tree shaking
      compress: {
        warnings: true,
        // optional: don't convert foo["bar"] to foo.bar
        properties: false

        // unused: true 
      },
      output: {
        comments: false, // 주석 삭제 여부
        quote_keys: true,
      },

      // 1->2 
      sourceMap: true
    }),
    */
   
    // global variables
    new webpack.BannerPlugin('*******************\n Wemakeprice Frontend Bundling \n********************'),

    // dev-server 모드에서 Hot Module Replace를 가능
    // new HotModuleReplacementPlugin()

  ]
};























