// 기본 골격
module.exports = {

  devtool: 'inline-source-map',

  entry: {
    'app': path.join(__dirname, '/src/bootstrap_test.js'),
    'vendor': path.join(__dirname, '/src/vendor.js')
  },

  output: {
    path:,
    filename:,
    sourceMapFilename:,
    chunkFilename,
    publicPath,
  }

  resolve: {

  },

  modules: [
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  ],

  plugins:[],

  devServer: {

  }

}

// 고려사항
// polyfills and vendors

if (!window._babelPolyfill) {
  require('babel-polyfill');
}



npm install webpack --save-dev
npm install babel-polyfill --save-dev
npm install babel-loader --save-dev

"babel-core": "^6.24.0",
"babel-loader": "^6.4.1",
"babel-plugin-transform-class-properties": "^6.23.0",
"babel-plugin-transform-object-rest-spread": "^6.23.0",
"babel-polyfill": "^6.23.0",
"babel-preset-latest": "^6.24.0",
"css-loader": "^0.27.3",
"eslint": "^3.18.0",
"eslint-loader": "^1.6.3",
"extract-text-webpack-plugin": "^2.1.0",
"node-sass": "^4.5.1",
"sass-loader": "^6.0.3",
"style-loader": "^0.15.0",
"webpack": "^2.2.1",
"webpack-dev-server": "^2.4.2"


======  Server Dependencies =======
npm install express --save // server framework
npm install morgan --save  // logger
npm install rimraf --save  // folder/file remove
npm install express-handlebars --save // template

npm install webpack-dev-middleware --save-dev // node middleware


// global variables
new webpack.ProvidePlugin({
  $: 'jquery'
})


또한 OccurrenceOrderPlugin을 추가할 수도 있습니다.

이 플러그인은 발생 횟수에 따라서 모듈 및 청크 id를 할당합니다. 자주 사용되는 id가 낮은(짧은) id를 얻습니다. 
이 id는 예측(predictable)이 가능하며, 전체 파일 크기를 줄이는데(역자주: 파일 용량을 줄이는 것과는 무관함) 추천됩니다.




























