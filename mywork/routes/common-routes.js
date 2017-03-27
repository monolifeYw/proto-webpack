const express = require('express');
const router = express.Router();
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
    console.log('local', res.locals.webAssets);
    // res.locals.webAssets();
    assets = resourceUtil(res.locals.webAssets());
    res.render('index', {
      layout: false, 
      title: 'Dummy Page', 
      manifest: assets
    });
  });


module.exports = router;