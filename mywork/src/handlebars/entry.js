/*const serverHelpers = require('./helpers/serverHelpers');

console.log('serverHelpers', serverHelpers);*/

const tmplHeader = require('./hbs/header');

const init = (data) => {
    document.getElementById('hbsContainer').innerHTML = tmplHeader(data);
}

module.exports = init;