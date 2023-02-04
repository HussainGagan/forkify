import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && !data.length))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newEle = Array.from(newDom.querySelectorAll('*'));
    const curEl = Array.from(this._parentEl.querySelectorAll('*'));
    // console.log(curEl, newEle);

    newEle.forEach((nEl, i) => {
      const cEl = curEl[i];

      // console.log(cEl, nEl.isEqualNode(cEl));

      // Updates changed text
      if (!nEl.isEqualNode(cEl) && nEl.firstChild?.nodeValue.trim() !== '') {
        // console.log(nEl.firstChild.nodeValue.trim());
        cEl.textContent = nEl.textContent;
      }

      // Updates changed attributes
      if (!nEl.isEqualNode(cEl)) {
        // console.log(Array.from(nEl.attributes));
        Array.from(nEl.attributes).forEach(attr => {
          cEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(msg = this._errMsg) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div> 
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMsg(msg = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div> 
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
