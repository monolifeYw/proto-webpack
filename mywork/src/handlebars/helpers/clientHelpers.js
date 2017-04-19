module.exports = function(object, options) {
  if (!object) {
    return options.fn(this);
  } 
};