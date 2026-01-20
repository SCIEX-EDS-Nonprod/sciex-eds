/* eslint-disable */
import { i18n } from '../../scripts/translation.js';

const lang = document.documentElement.lang || 'en';
const strings = i18n[lang] || i18n.en;

const renderCommonSearchResultList = (
  customerDocResultClick,
  data
) => {
  console.log('Rendered Data:', data);

  const noResults = document.getElementById('coveo-no-results');
  const target = document.querySelector('.search-result-section');
  if (noResults && target) {
    target.appendChild(noResults);
  }

  const resultsElement = document.getElementById('coveo-results');
  const resultsLoading = document.getElementById('coveo-results-loading');
  const noResultsElement = document.getElementById('coveo-no-results');
  const sortElement = document.getElementById('sort');
  const querySortElement = document.getElementsByClassName('query-sort-section')[0];
  const querySortSection = document.querySelector('.query-sort-section');

  resultsElement.innerHTML = '';

  // Show loader
  if (resultsLoading) {
    resultsLoading.classList.remove('tw-hidden');
  }

  // 🔹 USE DATA ARRAY HERE
  const results = Array.isArray(data) ? data : [];
  let sortedResults = results;

  // ========================
  // RESULTS FOUND
  // ========================
  if (sortedResults.length > 0) {
    // Hide loader
    if (resultsLoading) {
      resultsLoading.classList.add('tw-hidden');
    }

    const facets = document.getElementById('facets');
    if (facets) {
      facets.classList.remove('tw-hidden');
    } 

    if (sortElement) sortElement.removeAttribute('style');
    if (noResultsElement) noResultsElement.style.display = 'none';
    if (querySortElement) querySortElement.style.display = '';
    if (querySortSection) querySortSection.removeAttribute('style');

    sortedResults.forEach((result) => {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';

      const descriptionHtml =
        result?.raw?.description || result?.Excerpt || '';

      const resultMarkup = `
        <div class="item-details"> 
          <h3>${result?.title || ''}</h3>
          <div class="description">Address the need for complete sequence coverage, comprehensive determination of PTMs and reliable high-throughput assays with LC/MS solutions designed specifically to address the challenges of peptide mapping at all stages of the therapeutic development pipeline.</div>
          ${result?.raw?.ogimage
          ? `<img src="${result.raw.ogimage}" alt="ogimage" width="200" height="200">`
          : ''
        }
        </div>
        <a class="view-details-btn" target="_blank" href="${result?.printableUri || '#'}">
          ${strings.view}
        </a>
      `;

      resultItem.innerHTML = resultMarkup;

      const viewDetailsBtn = resultItem.querySelector('.view-details-btn');
      if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener('click', () => {
          customerDocResultClick?.(result);
        });
      }

      resultsElement.appendChild(resultItem);
    });
  }

  // ========================
  // NO RESULTS
  // ========================
  else {
    if (resultsLoading) {
      resultsLoading.classList.add('tw-hidden');
    }

    const facets = document.getElementById('facets');
    if (facets) {
      facets.classList.add('tw-hidden');
    }

    const divElement = document.getElementById('noresults-text1');
    const inputText = document.getElementById('coveo-query')?.value || '';

    if (divElement && inputText.trim() !== '') {
      const { text1 } = divElement.dataset;
      divElement.innerText = `${text1} "${inputText}"`;
    }

    if (noResultsElement) noResultsElement.style.display = '';
    if (querySortElement) querySortElement.style.display = 'none';
    if (querySortSection) {
      querySortSection.style.setProperty('display', 'none', 'important');
    }
  }

  // ========================
  // SEARCH WRAPPER WIDTH
  // ========================
  const searchWrapper = document.querySelector('.search-wrapper');
  if (searchWrapper) {
    searchWrapper.style.width =
      noResultsElement && noResultsElement.style.display === 'none'
        ? 'auto'
        : 'fit-content';
  }
};

export default renderCommonSearchResultList;
