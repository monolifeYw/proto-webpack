if (module && module.hot) {
  module.hot.accept();
}

const handlebars = require('handlebars/runtime');

console.log('handlebars', handlebars);

const tmplHeader = require('./hbs/header');

const data = {
  teamName: 'frontend',
  teamGrade: 88,
  teamMembers: [
    'lee', 'park', 'yang', 'jang', 'shin', 'han', 'jeon'
  ]
}


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('hbsContainer').innerHTML = tmplHeader(data);
});

