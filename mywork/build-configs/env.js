const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// import
const path = require('path');

// yargs
const argv = require('yargs').options({
  hmr: {
    default: false, type: 'boolean'
  },

  hot: {
    default: false, type: 'boolean'
  }
}).argv;

module.exports = (function () {

  console.log('argv', argv);
  const ENV = {};
  
  ENV.ENV = env;

  ENV.isProd = (env === 'production');

  // Path = root
  // ENV.ROOT_PATH = process.cwd();

  // ENV.BASE_PATH = path.resolve(__dirname, '..');
  ENV.BASE_PATH = process.cwd();

  ENV.SOURCE_DIR = path.resolve(ENV.BASE_PATH, 'src');

  ENV.BUILD_DIRNAME = (env === 'development') ? 'build' : 'dist';

  ENV.BUILD_PATH = path.resolve(ENV.BASE_PATH, ENV.BUILD_DIRNAME);

  ENV.PUBLIC_PATH = '/dist/';

  ENV.SVR_EXP_HOST = 'localhost';

  ENV.SVR_EXP_PORT = 8080;

  ENV.SVR_WDS_HOST = 'localhost';

  ENV.SVR_WDS_PORT = 8080;

  ENV.SVR_WDS_PATH = 'http://' + ENV.SVR_WDS_HOST + ':' + ENV.SVR_WDS_PORT + '/';

  ENV.SET_ESLINT_PATH = path.join(ENV.SOURCE_DIR, '.eslintrc');

  // hot module replacement
  ENV.SVR_HMR_MODE = argv.hmr;

  // hot module replacement : 처음 리로딩 여부
  ENV.SVR_HOT_MODE = argv.hmr && argv.hot;

  return ENV;
})();