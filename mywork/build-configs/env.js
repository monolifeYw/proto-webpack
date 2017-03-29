const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// import
const path = require('path');

module.exports = (function () {

  const ENV = {};
  
  ENV.ENV = env;

  ENV.isProd = (env === 'production');

  // Path = root
  ENV.BASE_PATH = path.resolve(__dirname, '..');

  ENV.SOURCE_DIR = path.resolve(ENV.BASE_PATH, 'src');

  ENV.BUILD_DIRNAME = (env === 'development') ? 'build' : 'dist';

  ENV.BUILD_PATH = path.resolve(ENV.BASE_PATH, ENV.BUILD_DIRNAME);

  ENV.PUBLIC_PATH = '/dist/';

  ENV.SVR_EXP_HOST = 'localhost';

  ENV.SVR_EXP_PORT = 8080;

  ENV.SVR_WDS_HOST = 'localhost';

  ENV.SVR_WDS_PORT = 8081;

  ENV.SVR_WDS_PATH = 'http://' + ENV.SVR_WDS_HOST + ':' + ENV.SVR_WDS_PORT + '/';

  ENV.SET_ESLINT_PATH = path.join(ENV.SOURCE_DIR, '.eslintrc');

  return ENV;
})();