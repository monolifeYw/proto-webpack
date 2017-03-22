// webpack
const webpack = require('webpack');

// util
const path = require('path');

// plugin
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
// const dist = path.resolve(process.cwd(), 'dist');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log(path.join(__dirname, '/static/dist'));


module.exports = {
  /* 내부 사용 가능 모듚
    object { amd?, bail?, cache?, context?, dependencies?, devServer?, 
    devtool?, entry, externals?, loader?, module?, name?, node?, output?, 
    performance?, plugins?, profile?, recordsInputPath?, recordsOutputPath?, recordsPath?, 
    resolve?, resolveLoader?, stats?, target?, watch?, watchOptions? }
   */


  // source-map : Bundling 된 파일을 브라우저에서 디버깅할때 원래 어떤 부분에서 문제가 생긴지 알기 힘듬
  //              Bundle 파일 내의 코드를 원래 소스 파일로 연결
  //              모든 기능이 포함된 완전한 소스맵을 별도의 파일로 생성, 빌드 프로세스가 느려짐
  // Bundle 코드를 곧바로 원래 소스 파일로 매핑하지 않는 옵션 : 'eval', 'cheap-source-map', 'cheap-eval-source-map'
  // - 빌드시간이 아주 중요한 대규모 프로젝트에 적합
  devtool: 'inline-source-map',

  // 웹팩이 파일을 읽어들이기 시작하는 부분
  entry: {
    'vendor': path.join(__dirname, '/src/vendor.js'),
    'app': [
      path.join(__dirname, '/src/bootstrap_test.js'),
      path.join(__dirname, '/src/app_index.js')
    ]
    // 'app2': path.join(__dirname, '/src/App')
    


    // test: ['a.js', 'b.js'] // a.js + b.js = test.js
    // polyfill 적용시 사용
  },

  output: {
    path: path.join(__dirname, '/static/dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[id]-chunk.js',
    publicPath: '/dist/', // ex : {[entry.index]}.bundle.js
    // library: '[name]'
    
    // [name] entry의 value 명
    // [hash] 랜덤한 문자열을 붙여줌
    // [chunkhash] 파일이 달라질 때에만 랜덤값이 변경, 변경되지 않은 파일들은 계속 캐싱하고 변경된 파일만 불러올 수 있음
  },

  resolve: {
    extensions: ['.js', '.scss'],
    modules: ['node_modules']
  },

  // modules : 외부 스크립트와 도구를 통해 소스 파일을 전처리하고 다양한 변경과 변환을 적용
  // 전처리(Preprocessing) - 실질적인(사용자 작성 코드) 컴파일 이전에 정의해 놓은 작업을 먼저 수행
  module: {
    rules: [
      // preload
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: [path.join(__dirname, '/src')],
        exclude: /(node_modules|static|proxy)/
      },

      // js
      {
        // test(required) : 이 로더로 처리하기 위해 일치해야 하는 파일 확장자를 비교하는 정규표현식
        test: /\.js$/,

        // 복수 지정 가능 : /(module1|module2|module3)/
        exclude: /node_modules/,

        // 웹팩2에서 변경된 점
        // - loader 옵션에 babel 대신 babel-loader 전체 이름을 적어주어야 한다
        // -  json-loader가 내장되어 따로 적어줄 필요가 없다
        loader: 'babel-loader'
      },

      // scss
      {
        test: /\.scss$/,

        // css-loader는 css 파일들을 읽어주고
        // style-loader는 읽은 css 파일들을 style 태그로 만들어 head 태그 안에 넣어줌

        // 여러 개의 로더를 동시에 사용할 때는 use를 사용
        // use: ['style-loader', 'css-loader', 'sass-loader']
        
        // 파일로 따로 css 파일로 만들기 위해서는 module, plugins 에 모두 사용
        use: ExtractTextPlugin.extract({

          // 이 플러그인이 실패했을 때 대안으로 style-loader가 작동
          // style-loader 는 서버사이드를 지원하지 않음
          // https://www.zerocho.com/category/Javascript/post/58ac2d6f2e437800181c1657
          fallback: 'style-loader',

          // css-loader, sass-loader를 거친 후 extract-text-webpack-plugin으로 파일을 추출
          use: ['css-loader', 'sass-loader']
        })


        /*use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]*/
      }
    ]
  },


  plugins:[
    new CommonsChunkPlugin({
      names: ['app', 'vendor'],
      filename: '[name].common.js',
      minChunks: Infinity
    }),

    // css 파일 추출
    new ExtractTextPlugin({
      filename: 'app.css'
    }),

    // lint
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          // Fail only on errors
          // 실패해도 빌드를 계속 진행할 것인가에 대한 부분
          failOnWarning: false,
          failOnError: true,

          configFile: path.join(__dirname, '/src/.eslintrc'),
          useEslintrc: true,
          cache: false
        }
      }
    })

  ],
  
  /*
    - options
    object { 
      hot?, hotOnly?, lazy?, host?, filename?, publicPath?, port?, socket?, 
      watchOptions?, headers?, clientLogLevel?, overlay?, key?, cert?, ca?, pfx?, 
      pfxPassphrase?, inline?, public?, https?, contentBase?, watchContentBase?, open?, 
      features?, compress?, proxy?, historyApiFallback?, staticOptions?, setup?, stats?, 
      ?, noInfo?, quiet?, serverSideRender?, index?, log?, warn? 
    }
   */
  devServer: {
    // 특정 컨텐츠 기반의 루트 지정
    contentBase: './static',

    // 사용할 포트 지정 (기본값 8080)
    port: '8080',

    // 작은 클라이언트 엔트리를 Bundle에 삽입해 페이지 변경시(수정) 자동 새로 고침 된다.
    inline: true
  }

}















