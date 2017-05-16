'use strict';

const path = require('path');

const glob = require('glob');

const fs = require('fs');

const defaultPattern = '**/*.js';
const prependDIR = 'pc';

const ENTRIES_DIR = __dirname;

// exist (같은 경로인지 확인)
// https://nodejs.org/api/fs.html#fs_fs_existssync_path
console.log('##fs.existsSync : ', fs.existsSync(__dirname));

/*
[ 'entryLoader.js',
  'm/example-bar.js',
  'm/example.js',
  'pc/example-foo.js',
  'pc/example.js' ]
 */
// 와일드카드를 이용하여 패턴에 맞는 모든 파일 호출
// cwd The current working directory in which to search. Defaults to process.cwd()

const pattern = path.join(prependDIR, defaultPattern);
// const pattern = defaultPattern;

console.log('##pattern', pattern);
console.log('##ENTRIES_DIR', ENTRIES_DIR);

let globtest = glob.sync(pattern, {cwd: ENTRIES_DIR});
let entry = globtest.reduce(function (entries, file) {
  console.log('#globtest.reduce - entries : ', entries);
  console.log('#globtest.reduce - file : ', file);

  let parseFile = path.parse(file);
  console.log('#parseFile : ', parseFile);

  const [ dirname, ...restnames ] = parseFile.name.split('-');

  console.log('#dirname : ', dirname);
  console.log('#restnames : ', restnames);
  console.log('==============================================');

  let entryID = path.join(parseFile.dir, dirname, parseFile.name);
  let entryValue = path.join(ENTRIES_DIR, file);

  entries[entryID] = entryValue;

  return entries;
}, {});
console.log('##parseFile a/b/c/d.js : ', path.parse('a/b/c/d.js'));

const [ a, ...b ] = 'a-b-c'.split('-');
console.log('##a-b-c.split : ', a, b);
console.log('##glob.sync : ', globtest);

console.log('##ENTRY## : ', entry);

console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

let entryTarget = glob.sync(defaultPattern, {cwd: ENTRIES_DIR});
console.log('entryTarget', entryTarget);
for (let i = 0; i < entryTarget.length; i++) {
  const entry = entryTarget[i];
  const dirname = path.dirname(entry);

  console.log('::dirname', dirname);
}



