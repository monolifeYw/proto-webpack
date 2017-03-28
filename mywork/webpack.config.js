// env
const environment = require('./build-configs/env');

// config require
const requireConfig = require(`./build-configs/webpack.${environment.ENV}`)(environment);

console.log('requireConfig',requireConfig);

module.exports = requireConfig;