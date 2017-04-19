/* eslint-disable global-require */

// polyfills and vendors

if (!window._babelPolyfill) {
  // require('babel-polyfill');
  // require('expose-loader?$!expose-loader?jQuery!jquery');
  // require('expose-loader?Handlebars!handlebars.runtime');
  require('expose-loader?Handlebars!handlebars/runtime');
}
