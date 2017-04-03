const path = require('path');

// entry
const helperList = [
  './json',
  './header/upper'
]

module.exports = (function () {
  const requireObj = {};
  helperList.map(function (helper) {
    requireObj[path.basename(helper)] = require(helper);
  })
  return requireObj;
})();
