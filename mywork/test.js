// ================================
var express = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var proxy = require('proxy-middleware');
var app = express();

// ==============================
var url = require('url');

// url.parse(urlStr, [parseQueryString], [slashesDenoteHost])
// URL 문자열을 받아서 객체를 반환
var urlParse = url.parse('http://www.wemakeprice.com');
// console.log('urlParse', urlParse);
// console.log('urlParse type', typeof urlParse);
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
