import * as PATH from 'path';

export default () => ({

  entry: PATH.join(__dirname, '/main.js'),
  output: {
    filename: 'bundle.js'
  }


});