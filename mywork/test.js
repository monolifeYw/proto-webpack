// ================================
var express = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var proxy = require('proxy-middleware');
var app = express();

// ==============================
var url = require('url');
var path = require('path');

// url.parse(urlStr, [parseQueryString], [slashesDenoteHost])
// URL 문자열을 받아서 객체를 반환
var urlParse = url.parse('http://www.wemakeprice.com');
// console.log('urlParse', urlParse);
// console.log('urlParse type', typeof urlParse);
// 
// 
// 

const ENVIRON = require('./build-configs/env');



console.log('ENVIRON, ', path.resolve(ENVIRON.SOURCE_DIR, 'handlebars'));



const envUrl = './build-configs/env/';

console.log('envUrl', path.basename(envUrl));













function setConfig(...pipeConf) {
  const envConfig = require('./build-configs/webpack.development')(ENVIRON);
  console.log(pipeConf);
  pipeConf.map(function (fn) {
    console.log('@@@@@@', fn, pipeConf);
    fn(envConfig);
  })
}

setConfig(function (conf) {
  console.log('setConfig', conf);
});


















var __path1 = path.resolve('http://localhost:8080', 'dist');
var __path2 = path.join(__dirname, 'dist');
console.log(__path1);



/*

urlParse Url 
{
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.wemakeprice.com',
  port: null,
  hostname: 'www.wemakeprice.com',
  hash: null,
  search: null,
  query: null,
  pathname: '/',
  path: '/',
  href: 'http://www.wemakeprice.com/' 
}
 */



var __url = 'http://localhost:8081/dist/';
var __urlParse = url.parse(__url);
var __proxy = proxy(__urlParse);

var __url1 = 'http://localhost:8081/'
var __url2 = path.join(`${__url1}`, 'dist');

console.log(__url2);

// console.log('__urlParse', __urlParse);
// console.log('__proxy', __proxy);

// 원래의 데이터가 http://localhost:8081/dist/manifest-1.0.0.json 일때
// http://localhost:1111/dist/manifest-1.0.0.json 로도 접근이 가능
app.use('/dist/', __proxy);


// hot module test
const config = require('./webpack.config.js');
// console.log(Object.keys(config.entry));

const entry = config.entry;
Object.keys(config.entry).forEach(function (prop) {
  // console.log(typeof config.entry[prop]);
  // config.entry[prop].unshift('webpack-dev-server/client?http://localhost:8081/');
  config.entry[prop].unshift('webpack/hot/dev-server');
  console.log(config.entry[prop]);
});
config.entry['wds'] = `webpack-dev-server/client?http://localhost:8081/`







// set server 
app.listen(1111, function () {
  console.log('Server Start!!! 1111');
});
