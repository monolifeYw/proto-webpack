const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

var assets;

// Object.assign

function resourceUtil(assets) {
  console.log('resourceUtil', assets);

  const assetsCss = [];
  const assetsJs = [];
  const keys = Object.keys(assets);

  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    var ext = key.split('.')[1];


    if (ext === 'css') {
      assetsCss.push(assets[key]);
    } else {
      assetsJs.push(assets[key]);
    }
  }

  // console.log(Object.assign({}, {css: assetsCss}, {js: assetsJs}));
  return Object.assign({}, {css: assetsCss}, {js: assetsJs});
};

router.route('/')
  .get(function (req, res, next) {

    // console.log('local', res.locals.webAssets());
    // res.locals.webAssets();

    assets = (env === 'development') ? null : resourceUtil(res.locals.webAssets());
    

    // console.log('pkg', pkg);
    // var manifestPath = 'http://localhost:8081/dist/manifest-' + pkg.version + '.json';
    // console.log('manifestPath', manifestPath);
    // assets = JSON.parse(fs.readFileSync('http://localhost:8081/dist/manifest-' + pkg.version + '.json', 'utf-8'));
    

    // console.log('assets', assets);

    res.render('index', {
      layout: false, 
      title: 'Dummy Page', 
      srcInfo: {
        manifest: assets,
        devTime: new Date().getTime()
      }
    });
  });


module.exports = router;