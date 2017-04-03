if (module && module.hot) {
  module.hot.accept();
}

exports.wl = {
  test: function () {
    console.log('[WL] test function')
  }
}