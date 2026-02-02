/* eslint-disable */
import {
  favoriteSearchEngine,
  removeFavoriteSearchEngine
} from '../favorite-all/favorite-allDocEngine.js';
import { i18n } from '../translation.js';
import renderFavoriteQuerySummary from './favoriteQuerySummary.js';

const lang = document.documentElement.lang || 'en';
const strings = i18n[lang] || i18n.en;

const renderfavoriteSearchResultList = (
  customerDocResultClick,
  data
) => {
  console.log('rendereddataaa', data)
  const noResults = document.getElementById('coveo-no-results');
  const target = document.querySelector('.search-result-section');
  if (noResults && target) {
    target.appendChild(noResults);
  }

  const resultsElement = document.getElementById('coveo-results');
  const resultsLoading = document.getElementById('coveo-results-loading');
  const noResultsElement = document.getElementById('coveo-no-results');

  resultsElement.innerHTML = '';

  // ========================
  // SHOW LOADER
  // ========================
  resultsLoading?.classList.remove('tw-hidden');

  // ========================
  // FLATTEN RESULTS
  // ========================
  const allResults = Array.isArray(data)
    ? data.flatMap(group =>
      group.pageData?.map(item => ({
        ...item,
        assetType: group.assetType
      })) || []
    )
    : [];

  // ========================
  // SELECTED ASSET TYPES
  // ========================
  const selectedAssetTypes = data
    .filter(a => a.state === 'selected')
    .map(a => a.assetType);

  let filteredResults = allResults;

  // ========================
  // FILTER BY ASSET TYPE
  // ========================
  if (selectedAssetTypes.length > 0) {
    filteredResults = filteredResults.filter(item =>
      selectedAssetTypes.includes(item.assetType)
    );
  }

  // ========================
  // COLLECT SELECTED TAG IDS
  // ========================
  const selectedTagIds = data.flatMap(asset =>
    asset.tags?.flatMap(tag =>
      tag.value
        ?.filter(v => v.state === 'selected')
        .flatMap(v => v.value)
    ) || []
  );

  // ========================
  // FILTER BY TAG IDS
  // ========================
  if (selectedTagIds.length > 0) {
    filteredResults = filteredResults.filter(item =>
      selectedTagIds.includes(item.id)
    );
  }

  // ========================
  // RESULTS FOUND
  // ========================
  if (filteredResults.length > 0) {
    resultsLoading?.classList.add('tw-hidden');
    noResultsElement.style.display = 'none';

    filteredResults.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';

      const relatedProductsHtml = Array.isArray(result.relatedProducts)
          ? result.relatedProducts
              .filter(Boolean)
              .map(product => `<a href=${product.href} class="related-product-link">${product.title}</a>`)
              .join(' <span class="pipe-separator">|</span> ')
          : '';

      resultItem.innerHTML = `
        <div class="item-details">
          <h3>${result.title || ''}</h3>
          <div class="description">${result.description || ''}</div>
          <div class="related-products">
            ${
              relatedProductsHtml
                ? `<strong>Related Products :</strong> ${relatedProductsHtml}`
                : ''
            }
          </div>
        </div>

        <div class="action-section">
          <span class="favorite-icon" aria-label="Favorite">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 22">
              <path
                d="M21.1412 11.2293L11.7662 20.5143L2.39125 11.2293C1.77288 10.6275 1.2858 9.90428 0.96068 9.10505C0.635562 8.30583 0.479448 7.44795 0.502167 6.58543C0.524887 5.7229 0.725949 4.87443 1.09269 4.09343C1.45944 3.31243 1.98391 2.61583 2.6331 2.04748C3.28229 1.47914 4.04213 1.05137 4.86476 0.79111C5.68739 0.53085 6.555 0.443739 7.41296 0.535261C8.27091 0.626783 9.10062 0.894955 9.84984 1.32289C10.5991 1.75083 11.2516 2.32926 11.7662 3.02176C12.2832 2.33429 12.9364 1.76091 13.6851 1.33752C14.4338 0.91412 15.2619 0.649821 16.1174 0.561159C16.973 0.472497 17.8376 0.561382 18.6572 0.822249C19.4768 1.08312 20.2338 1.51035 20.8807 2.07721C21.5276 2.64408 22.0505 3.33836 22.4168 4.11662C22.783 4.89488 22.9847 5.74036 23.0091 6.60014C23.0336 7.45993 22.8803 8.3155 22.5589 9.11332C22.2375 9.91114 21.7549 10.634 21.1412 11.2368"
                fill="#e60023"
                stroke="#e60023"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <a
            class="view-details-btn"
            target="_blank"
            href="${result.path || '#'}"
          >
            ${strings.view}
          </a>
        </div>
      `;

      // ========================
      // REMOVE FAVORITE
      // ========================
      resultItem
        .querySelector('.favorite-icon')
        ?.addEventListener('click', async () => {
          try {
            const response = await removeFavoriteSearchEngine(result.path);
            if (response?.message === 'The operation went successfully') {

              // ✅ remove from existing data
              data.forEach(asset => {
                if (Array.isArray(asset.pageData)) {
                  asset.pageData = asset.pageData.filter(
                    item => item.path !== result.path
                  );
                }
              });

              // ✅ remove empty assetTypes automatically
              const cleanedData = data.filter(
                asset => asset.pageData && asset.pageData.length > 0
              );

              renderfavoriteSearchResultList(
                customerDocResultClick,
                cleanedData
              );

              renderFavoriteQuerySummary(cleanedData);
            }
          } catch (e) {
            console.error(e);
          }
        });


      // ========================
      // CLICK TRACKING
      // ========================
      resultItem
        .querySelector('.view-details-btn')
        ?.addEventListener('click', () => {
          customerDocResultClick?.(result);
        });

      resultsElement.appendChild(resultItem);
    });
  }

  // ========================
  // NO RESULTS
  // ========================
  else {
    resultsLoading?.classList.add('tw-hidden');
    noResultsElement.style.display = '';
  }
};

export default renderfavoriteSearchResultList;
