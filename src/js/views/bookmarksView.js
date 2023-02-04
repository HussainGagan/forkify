import View from './View.js';
import icons from 'url:../../img/icons.svg';
import { addBookmark } from '../model.js';
import previewView from './previewView.js';

class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errMsg = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
