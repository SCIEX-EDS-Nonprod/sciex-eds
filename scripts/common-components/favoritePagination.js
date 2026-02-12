import renderfavoriteSearchResultList from './favoriteSearchResultList.js';
/* ======================================================
   PAGINATION STATE
====================================================== */
let currentPage = 1;
const RESULTS_PER_PAGE = 10;

/* ======================================================
   RENDER FAVORITE PAGINATION (DATA-BASED)
====================================================== */
const renderFavoritePagination = (
  totalResults,
  renderUi,
  data
) => {
  const paginationElement = document.getElementById('pagination');
  if (!paginationElement) return;

  paginationElement.innerHTML = '';

  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  // Reset page if out of range
  if (currentPage > totalPages) {
    currentPage = 1;
  }

  if (totalPages < 1) return;

  /* ========================
     PREVIOUS BUTTON
  ======================== */
  if (currentPage > 1) {
    const prevButton = document.createElement('button');
      prevButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none"><path d="M16.5 20L8.5 12L16.5 4" stroke="#141414"/></svg>';


    prevButton.onclick = () => {
      currentPage--;
      renderfavoriteSearchResultList(data,renderUi)
    };

    paginationElement.appendChild(prevButton);
  }

  /* ========================
     PAGE NUMBERS
  ======================== */
  for (let page = 1; page <= totalPages; page++) {
    const pageButton = document.createElement('button');
    pageButton.className =
      'tw-w-10 tw-h-10 tw-bg-transparent tw-border tw-border-gray-300 tw-rounded-lg tw-text-black tw-p-2';

    pageButton.innerText = page;
    pageButton.disabled = page === currentPage;

    pageButton.onclick = () => {
    currentPage = page;
    renderfavoriteSearchResultList(data,renderUi)
    };

    paginationElement.appendChild(pageButton);
  }

  /* ========================
     NEXT BUTTON
  ======================== */
  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none"><path d="M8.5 20L16.5 12L8.5 4" stroke="#141414"/></svg>';


    nextButton.onclick = () => {
    currentPage++;
    renderfavoriteSearchResultList(data,renderUi)
    };

    paginationElement.appendChild(nextButton);
  }
};

/* ======================================================
   GET CURRENT PAGE
====================================================== */
export const getCurrentPage = () => currentPage;

/* ======================================================
   RESET PAGE (WHEN FILTER CHANGES)
====================================================== */
export const resetPagination = () => {
  
  currentPage = 1;
};

export default renderFavoritePagination;
