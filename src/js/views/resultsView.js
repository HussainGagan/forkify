import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errMsg = 'No recipes found for your query! Pleas try again :)';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
