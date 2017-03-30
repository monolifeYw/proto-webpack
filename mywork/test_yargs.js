const argv = require('yargs').argv;

console.log(argv);
console.log('_', argv._);


/*
node test_yargs.js -v
{ _: [], v: true, verbose: true, '$0': 'test_yargs.js' }
 */


/*
node test_yargs.js -d
node test_yargs.js --d
{ _: [], d: true, '$0': 'test_yargs.js' }

node test_yargs.js -- --hmr
{ _: [ '--hmr' ], '$0': 'test_yargs.js' }

node test_yargs.js --ships=4 --distance=22
{ _: [], ships: 4, distance: 22, '$0': 'test_yargs.js' }

node test_yargs.js -- a=3 b=4
-> -- 는 _안의 배열 값으로 들어가기 위한 조건
{ _: [ 'a=3', 'b=4' ], '$0': 'test_yargs.js' }

node test_yargs.js -sp --fr --fa
{ _: [],
  s: true,
  p: true,
  fr: true,
  fa: true,
  '$0': 'test_yargs.js' }

node test_yargs.js a b c d e
{ _: [ 'a', 'b', 'c', 'd', 'e' ], '$0': 'test_yargs.js' }
 */

const argv2 = require('yargs')
              .alias('v', 'verbose')
              .argv;

// console.log(argv2);


const argv3 = require('yargs')
              .default({x: 10, y: 20})
              .argv;

console.log(argv3);


const argv4 = require('yargs').options({
  hmr: {
    default: false, type: 'boolean'
  }
}).argv;

console.log('argv4', argv4);
