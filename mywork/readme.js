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