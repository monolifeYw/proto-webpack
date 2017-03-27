const fs = require('fs');
const path = require('path');

function extend(target) {
  var sources = [].slice.call(arguments, 1);
  sources.forEach(function (source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });
  return target;
}

module.exports = function(manifestPath, opts) {
  var manifest;
  var isLoaded = false;

  function loadManifest() {
    try {
      // fs.stat(path, callback) 파일의 정보를 알려줌
      // fs.statSync 호출이 동기 인지 확인
      
      var data = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      
      /*console.log('fs.statSync(manifestPath)', fs.statSync(manifestPath));
      console.log('fs.statSync(manifestPath)', fs.statSync(manifestPath).isDirectory());
      if (fs.statSync(manifestPath).isDirectory()) {
        // 해당 디렉토리를 읽음
        var manifestFiles = fs.readdirSync(manifestPath);
        if (manifestFiles.length === 0) {
          // error
        }

        console.log('manifestFiles', manifestFiles);

        manifestFiles.forEach(function (manifest) {
          extend(data, JSON.parse(fs.readFileSync(path.resolve(manifestPath, manifest), 'utf-8')));
        });
      } else {
        data = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      }*/


      isLoaded = true;
      return data;

    } catch (err) {
      console.log('Don`t load manifest : ', err);
    }
  }


  function getAssets() {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    // return (!isLoaded) ? JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) : null;
  }

 /* function getAsset(path) {
    if (!isLoaded) {
      manifest = loadManifest();
    }
    console.log('manifest Lists', manifest);

    if (manifest) {
      return manifest[path];
    } else {
      return path;
    }
  }*/

  return function (req, res, next) {
    res.locals.webAssets = getAssets;
    next();
  }
}