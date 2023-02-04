import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    const prevBtn = `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
  `;

    const nextBtn = `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
`;

    // Page 1 and other pages
    if (curPage === 1 && numOfPages > 1) {
      return nextBtn;
    }

    // Last page and if it is greater than one than we will render back button
    if (curPage === numOfPages && numOfPages > 1) {
      return prevBtn;
    }
    // Other page
    if (curPage < numOfPages) {
      return prevBtn + nextBtn;
    }

    // Only 1 Page
    return '';
  }
}

export default new PaginationView();
