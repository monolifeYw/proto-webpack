var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CommonsChunkPlugin = require('../node_modules/webpack/lib/optimize/CommonsChunkPlugin');

console.log(path.resolve(__dirname, 'sass'));


// /Applications/MAMP/htdocs/webpack-proto/lynda/node_modules/webpack/lib/optimize/CommonsChunkPlugin.js
module.exports = {
  // entry: path.join(__dirname, './src/main.js'),
  
  // 웹팩이 파일을 읽어들이기 시작하는 부분
  entry: {
    index: path.join(__dirname, '/step1/src/main.js'),
    about: path.join(__dirname, '/step1/dist/about.js'),
    contact: path.join(__dirname, '/step1/dist/contact.js'),
    vendor: ['jquery']

    // test: ['a.js', 'b.js'] // a.js + b.js = test.js
    // polyfill 적용시 사용
  },

  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].bundle.js',  // ex : {[entry.index]}.bundle.js
    chunkFilename: '[id].bundle.js'
    // publicPath: '/' // == express.static, 파일들이 위치할 서버상의 경로
    // [name] entry의 value 명
    // [hash] 랜덤한 문자열을 붙여줌
    // [chunkhash] 파일이 달라질 때에만 랜덤값이 변경, 변경되지 않은 파일들은 계속 캐싱하고 변경된 파일만 불러올 수 있음

  },

  module: {
    rules: [
      {
        test: /\.js$/,
        // 웹팩2에서 변경된 점
        // - loader 옵션에 babel 대신 babel-loader 전체 이름을 적어주어야 한다
        // -  json-loader가 내장되어 따로 적어줄 필요가 없다
        loader: 'babel-loader',
        // exclude: ['node_modules'],
        exclude: /node_modules/
      },


      {
        test: /\.scss$/,
        /*loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
        })*/


        // use: ['style-loader', 'css-loader', 'sass-loader'],
        // include: /node_modules/
        //loader: 'style-loader!css-loader!sass-loader'
        //styleLoader(cssLoader(sassLoader('source')))
        exclude: /node_modules/,
        use: [
          'style-loader', 
          'css-loader', 
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'sass')]
            }
          }
        ]
        // include: __dirname + '/sass'
      }
      

    ]
  }
  // resolve: ['.js', 'scss']
}

