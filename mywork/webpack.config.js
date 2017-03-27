// webpack
const webpack = require('webpack');

// util
const path = require('path');

// plugin
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
// const dist = path.resolve(process.cwd(), 'dist');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// manifest
const  ManifestPlugin = require('webpack-manifest-plugin');

// package.json
const pkg = require('./package.json');



module.exports = {

  // 해당 모듈의 기본 폴더 지정
  context: __dirname, //path.resolve(__dirname, './src'),

  // Prod 환경에서 build 시 warning, error 시의 Build에 대한 hard Checking 강화
  bail: false,

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
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'inline-source-map',

  // Webpack이 작동하는 의존성 트리의 루트 노드가 되는 진입점(웹팩이 파일을 읽어들이기 시작하는 부분)
  // 이 entry 포인트로 require, @import 등 모듈간의 의존성을 순차적으로 해석하며 의존성 트리를 구성
  entry: {
    // 'vendor': path.join(__dirname, '/src/vendor.js'),
    'vendor': './src/vendor.js',  // in context path
    'app': [
      path.join(__dirname, '/src/bootstrap_test.js'),
      path.join(__dirname, '/src/app_index.js')
    ],
    'app2': path.join(__dirname, '/src/app_index_other.js')

    // 'app2': path.join(__dirname, '/src/App')

    // test: ['a.js', 'b.js'] // a.js + b.js = test.js
    // polyfill 적용시 사용
  },

  // entry에서 부터 구축한 의존성 트리를 바탕으로 만들어낸 번들이 어디에, 어떤 파일 이름으로 저장될지를 지정하는 옵션
  output: {
    // 빌드 결과물이 들어갈 (webpack.config.js로부터의) 상대 경로, Compile 된 Path 기준
    // output으로 나올 파일이 저장될 경로
    // 경로의 기준 : webpack.config.js로부터의 상대경로
    path: path.join(__dirname, '/static/dist'),

    // [name] entry에서의 key 값
    // [hash]
    //  - 컴파일의 md5 해시값
    //  - 매번 웹팩 컴파일 시 랜덤한 문자열을 붙여줌, 캐시 삭제 시 유용
    // [chunkhash] 
    //  - 파일이 달라질 때에만 랜덤값이 변경
    //  - 변경되지 않은 파일들은 계속 캐싱하고 변경된 파일만 불러올 수 있음
    //  - 해당 청크(번들)의 해시값
    filename: '[name].[chunkhash:4].js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[name].[id].[chunkhash:4].js',

    // Build 된 Path 기준
    // 경로의 기준 : 웹 사이트에서의 기준
    // 파일들이 위치할 서버 상의 경로
    // 웹사이트에서 해당 에셋에 접근하기 위해 필요한 경로.
    // 마크업 템플릿에서 정적 파일들을 불러올때의 경로를 설정
    publicPath: '/dist/', // ex : {[entry.index]}.bundle.js
    // library: '[name]'
    
    
  },

  // require(모듈명)에서의 모듈명을 어떻게 해석할지에 대한 옵션.
  resolve: {
    // 모듈 탐색을 시작할 루트 경로
    // node의 모듈 시스템과 마찬가지로, 하위 폴더가 아닌 상위 폴더로 탐색을 진행한다.
    // root (default: node_modules/)

    // 모듈명 뒤에 여기 명시된 확장자명들을 붙여보며 탐색을 수행
    // require('abc')를 resolve 하기 위해 abc, abc,js, abc.scss를 탐색
    extensions: ['.js', '.scss'],

    // 디렉토리의 node_modules를 인식, 모듈 탐색을 시작할 루트 경로
    modules: ['node_modules']
  },

  // modules : 외부 스크립트와 도구를 통해 소스 파일을 전처리하고 다양한 변경과 변환을 적용
  // 전처리(Preprocessing) - 실질적인(사용자 작성 코드) 컴파일 이전에 정의해 놓은 작업을 먼저 수행
  // 의존성 트리 내의 각 모듈들을 어떻게 핸들링할지에 대한 옵션.
  module: {
    // Loaders는 번들이 생성되는 동안 또는 생성되기 전에 개별 파일 수준에서 작업한다.
    rules: [
      // preload
      {
        test: /\.js$/,
        // preloader : loaders 전에 실행되어야 하는 로더들을 선언하는 부분
        // enforce (집행)
        //  - pre : preloader
        //  - post : postloader
        enforce: 'pre',

        // loader : 
        // - 특정 모듈을 어떤 로더들을 거쳐 불러올지에 대한 설정(로더는 각 모듈을 어떻게 불러올 것인가를 담당)
        // - Chaining Loaders : 로더들은 오른쪽에서 왼쪽의 순서로 적용
        //  - version.1 에서의 chaining는 !로 구분
        loader: 'eslint-loader',

        // eslint-loader 에 포함 시킬 resource
        include: [path.join(__dirname, '/src')],

        // eslint-loader 에 제외 시킬 resource
        exclude: /(node_modules|static|proxy)/
      },

      // jsx - test
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: {
          // 트리쉐이킹 : ( modules : false )
          // - 나무를 흔들어서 필요없는 걸 떨어트리는 행위
          // import되지 않은 export들을 정리
          // 
          // ex) import {a} from './module';
          // 실제 ./module 안에서는 a 와 b 가 있을 경우
          // 필요없는 b는 빌드 하지 않는 케이스
          // 
          // 웹팩 2에서는 이런 ES2015 Native Import를 지원
          presets: [{ es2015: { modules: 'false' } }, 'react', 'stage-0']
        },
        exclude: /node_modules/
      },

      // js
      {
        // Goal : node_modules 폴더를 제외한 프로젝트내의 모든 js 를 babel 로 변환 후 묶어준다.
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
          // https://github.com/webpack-contrib/sass-loader
          // 여러 개의 로더에 대해서도 사용 가능. 
          // - 예를 들어 sass-loader를 적용한 뒤 css-loader를 적용하고 싶으면 require(css!sass!hjlog.scss)와 같은 식으로 사용
          // scss 파일은 sass-loader, css-loader를 거친 뒤 ExtractTextPlugin을 통해 최종적으로 style.css라는 별개의 파일로 분리
          use: [
            // css-loader는 모든 CSS와 그안에 의존적인 다른 CSS(ex: import otherCSS) 를 JSON파일로 로드
            'css-loader', 
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed', // 'expanded'
                sourceMap: true,
                sourceMapContents: true
              }
            }
          ]
        })

        // html 내에 style 태그로 css를 인라인하고 싶을때 사용
        /*use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]*/
      }
    ]
  },

  // Plugins은 bundle 이나 chunk 레벨 그리고 bundle이 생성 된 후에 작동
  // 번들링이 끝난 뒤 최종적으로 나온 번들을 조작하고 싶은 경우
  // 보통 결과물(bundle)에 작동하는 추가적인 node_modules
  plugins:[

    // manifest
    new ManifestPlugin({
      fileName: `manifest-${pkg.version}.json`
    }),


    // 번들 자체가 어떻게 생성되는지 수정
    // 공유되는 common script파일을 생성해 주며 각종 옵션을 통해 커스터마이징 설정이 가능
    // 각 Chunk 의 공통의 모듈을 뽑아냄
    new CommonsChunkPlugin({
      // vender > app2 > app 순으로 진행 
      // names: ['app', 'app2', 'vendor'],
      // 번들링 되는 app, app2의 공통부분도 포함되어 진다.
      // entry 의 vendor 과 겹치므로 같은 선상에서 진행된다. 
      // 
      // vender 내에 위의 entry내의 파일들의 공통이 함께 포함된다.
      name: 'vendor', 
      filename: '[name].common.js',
      minChunks: function (module, count) {
        console.log('count', count);
      }
    }),


    // css 파일 추출
    // js파일이 로딩되는 동안 그 안에 있는 css파일들도 같이 로드되지 못함
    //  - js 로드후 스타일이 적용되면서 깜빡임 현상이 발생한다.
    //  - 이를 방지하고 js, css 파일 등을 parallel 하게 로드하여 전체적인 퍼포먼스의 향상을 꾀하기 위해 css 파일등을 외부파일로 추출
    // ExtractTextPlugin은 js bundle파일에서 css bundle파일을 분리
    // 

    // 내부적으로 css-loader, style-loader를 사용하여 한곳에 CSS파일을 수집하고 
    // 외부 style.css 파일로 결과를 추출 하여 index.html 안에 style.css 를 삽입 하면 된다.
    // https://github.com/webpack-contrib/extract-text-webpack-plugin
    // https://www.npmjs.com/package/extract-text-webpack-plugin
    // 
    // filename : [name], [id] and [contenthash]를 포함할 수 있다.
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: false,
      allChunks: true
    }),

    // lint
    // LoaderOptionsPlugin : 로더들에게 옵션을 넣어주는 플러그인
    new webpack.LoaderOptionsPlugin({

      // css 에 대한 minimize
      // minimize: true,
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
    }),

    // uglify plugin
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,  // 난독화
      beautify: false, // 가독성
      // compress: true, // tree shaking
      compress: {
        warnings: true,
        // optional: don't convert foo["bar"] to foo.bar
        properties: false,

        // tree shaking
        // 전제 조건 : modules에서 해당 js > loader > options > presets > es2015 : {modules: false}
        // 확인 메시지 : Dropping unused variable b [bundle.js:77,6]
        unused: true 
      },
      output: {
        comments: false, // 주석 삭제 여부
        quote_keys: true,
      },

      // 1->2 
      sourceMap: true
    }),

    // global variables
    new webpack.BannerPlugin('*******************\n Wemakeprice Frontend Bundling \n********************')


    // dev-server 모드에서 Hot Module Replace를 가능
    // new HotModuleReplacementPlugin()

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
    // 서버루트의 기준 폴더 http://localhost:8080/
    contentBase: './static',

    // host
    host: 'localhost',

    // 사용할 포트 지정 (기본값 8080)
    port: '8080',

    // 작은 클라이언트 엔트리를 Bundle에 삽입해 페이지 변경시(수정) 자동 새로 고침 된다.
    inline: true,

    // Hot Module Reloading
    // devServer 설정이 작동하지 않는 경우 (hot, inline)
    // - package CLI : webpack-dev-server --hot --inline
    
    // hot: true,   // 컴포넌트 수정 될 경우, 그 수정된 부분만 reload
    // inline: true // 전체 페이지에 대한 실시간 리로딩(Live Reloading)

    /*watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }*/
  }
  /*
    - 



   */

}















