const tmplHeader = require('./hbs/header');

function check() {
  module.hot.check(function(err, updatedModules) {
    if (updatedModules) {
      check();
    }
  });
}

window.onmessage = function(event) {
  if (event.data === 'webpackHotUpdate' && module.hot.status() === 'idle') {
    check();
  }
};

if (module && module.hot) {
  module.hot.accept();
}

// const handlebars = require('handlebars/runtime');

// console.log('handlebars', handlebars);
console.log('Handlebars!!', Handlebars);



const data = {
  teamName: 'frontend',
  teamGrade: 88,
  teamMembers: [
    'lee', 'park', 'yaawg', 'haeawh2a', 'l22', '!!!n', 'jw'
  ]
}

// console.log('dom', document.getElementById('hbsContainer'));

window.addEventListener('DOMContentLoaded', function () {
  require('./entry')(data);
});


