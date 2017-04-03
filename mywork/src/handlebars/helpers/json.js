module.exports = function(object) {
  console.log('[Helper]', object);
  return JSON.stringify(object);
};