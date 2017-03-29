import {render} from './App';
import {App} from './App';
import * as MathAPI from './MathAPI';
import {pi} from './MathAPI';

(function () {

  if (module && module.hot) {
    module.hot.accept();
  }

  console.log(MathAPI.pi);
  console.log(pi);
  console.log('12##', pi);
  console.log(render);
  console.log(App);
})();