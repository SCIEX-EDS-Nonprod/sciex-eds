import { resourceLibraryResultClick } from '../favorite-all/favorite-all-controller/favorite-allDocController.js';
import { i18n } from '../translation.js';
import { renderCommonFacet } from './favorite-all-facets.js';
import renderFavoriteQuerySummary from './favoriteQuerySummary.js';
import renderfavoriteSearchResultList from './favoriteSearchResultList.js';

const lang = document.documentElement.lang || 'en';
const strings = i18n[lang] || i18n.en;

function canMobileActions() {
  const screenWidth = window.innerWidth;
  if (screenWidth > 767) {
    return false;
  }
  return true;
}

const renderFavoriteFacetBreadcrumb = (data,toggleAssetType) => {
  const facetBreadcrumbElement = document.getElementById('facet-readcrumb');
  facetBreadcrumbElement.innerHTML = '';

  const breadcrumbContainer = document.createElement('div');
  breadcrumbContainer.classList.add('facet-breadcrumb-container');

  // create filter wrapper to wrap category filter terms
  const filterCountWrapper = document.createElement('div');
  filterCountWrapper.classList.add('tw-hidden');
  filterCountWrapper.id = 'filter-count-wrapper';

  // create filter wrapper show less button
  const filterCountShowLessButton = document.createElement('div');
  filterCountShowLessButton.classList.add('tw-hidden', 'tw-flex');
  filterCountShowLessButton.id = 'filter-count-show-less';
  const showLessSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M0 6L12 6" stroke="#0068FA"/></svg>';
  filterCountShowLessButton.innerHTML = `${showLessSvg} Show Less`;

  // add click event to show filters list and show less
  filterCountWrapper.addEventListener('click', function showfilters() {
    const breadcrumb = document.querySelector('#facet-readcrumb');
    const breadcrumbCont = breadcrumb.querySelector('.facet-breadcrumb-container');
    const filtersCount = breadcrumbCont.querySelectorAll('.facet-breadcrumb');
    const filtersCountShowLessButton = breadcrumb.querySelector('#filter-count-show-less');
    const clearAllFiltersButton = breadcrumbCont.querySelector('button');
    if (breadcrumb && filtersCount) {
      filtersCount.forEach((item) => {
        if (item.classList.contains('tw-hidden')) {
          item.classList.remove('tw-hidden');
        }
      });
      if (filtersCountShowLessButton) {
        if (filtersCountShowLessButton.classList.contains('tw-hidden')) {
          filtersCountShowLessButton.classList.remove('tw-hidden');
        }
      }
      breadcrumb.style.marginBottom = '30px';

      if (breadcrumbCont) {
        breadcrumbCont.style.marginTop = '0px';
      }
      if (clearAllFiltersButton) {
        clearAllFiltersButton.style.bottom = '-20px';
      }
      this.style.display = 'none';
    }
  });

  // add click event to hide filters list and hide filters count
  filterCountShowLessButton.addEventListener('click', function hideFilters() {
    const breadcrumb = document.querySelector('#facet-readcrumb');
    const breadcrumbContai = breadcrumb.querySelector('.facet-breadcrumb-container');
    const filtersCount = breadcrumbContai.querySelectorAll('.facet-breadcrumb');
    const filtersCountWrapper = breadcrumb.querySelector('#filter-count-wrapper');
    const clearAllFiltersButton = breadcrumbContai.querySelector('button');
    if (breadcrumb && filtersCount) {
      filtersCount.forEach((item) => {
        item.classList.add('tw-hidden');
      });
      this.classList.add('tw-hidden');
    }

    breadcrumb.style.marginBottom = '0px';
    if (filtersCountWrapper) {
      filtersCountWrapper.style.display = 'block';
    }
    if (breadcrumbContai) {
      breadcrumbContai.style.marginTop = '20px';
    }
    if (clearAllFiltersButton) {
      clearAllFiltersButton.style.marginTop = '-100px';
      clearAllFiltersButton.style.bottom = 'auto';
    }
  });

  facetBreadcrumbElement.appendChild(filterCountWrapper);
  facetBreadcrumbElement.appendChild(filterCountShowLessButton);

  // Iterate through data and render selected items as breadcrumbs
  data.forEach((item) => {
    if (item.state === 'selected') {
      const gridContainer = document.createElement('div');
      gridContainer.classList.add('facet-breadcrumb');
      gridContainer.addEventListener('click', () => {
        item.state = 'idle';
        renderFavoriteFacetBreadcrumb(data,toggleAssetType);
        renderfavoriteSearchResultList(resourceLibraryResultClick, data);
        renderFavoriteQuerySummary(data);
        renderCommonFacet(data, toggleAssetType);
      });

      const gridItem1 = document.createElement('div');
      gridItem1.classList.add('grid-item');
      const box1 = document.createElement('div');
      box1.textContent = `${strings.assetType} : ${item.assetType}`;
      gridItem1.appendChild(box1);

      const gridItem2 = document.createElement('div');
      gridItem2.classList.add('grid-item');
      const clearIcon = document.createElement('span');
      clearIcon.innerHTML = '&#10005;';
      clearIcon.style.cursor = 'pointer';

      gridItem2.appendChild(clearIcon);
      gridContainer.appendChild(gridItem1);
      gridContainer.appendChild(gridItem2);
      breadcrumbContainer.appendChild(gridContainer);

      if (canMobileActions()) {
        // count number of filters selected and render the filter count wrapper...
        const filtersCount = breadcrumbContainer.querySelectorAll('.facet-breadcrumb');
        const filterCountDiv = document.getElementById('filter-count-wrapper');

        if (filtersCount) {
          if (filtersCount.length > 1) {
            if (filterCountDiv) {
              if (filterCountDiv.classList.contains('tw-hidden')) {
                filterCountDiv.classList.remove('tw-hidden');
              }

              filterCountDiv.innerHTML = '';
              filterCountDiv.innerHTML = `<span>Filters: +${filtersCount.length}</span>`;
              filtersCount.forEach((val) => {
                val.classList.add('tw-hidden');
              });
            }
          } else if (filtersCount.length === 1) {
            filtersCount.forEach((filter) => {
              if (filter.classList.contains('tw-hidden')) {
                filter.classList.remove('tw-hidden');
              }
            });
          }
        }
      }
    }
  });

  const button = document.createElement('button');
  button.style.marginRight = '0';
  button.style.marginLeft = 'auto';
  button.textContent = 'Clear All';
  button.style.color = 'var(--Blue-700, #0068FA)';
  button.style.fontSize = '16px';
  button.style.fontStyle = 'normal';
  button.style.fontWeight = '530';
  button.style.lineHeight = '24px';
  button.style.letterSpacing = '0.08px';

  button.addEventListener('click', () => {
    data.forEach((item) => {
      item.state = 'idle';
    });
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', data)
    renderFavoriteFacetBreadcrumb(data,toggleAssetType);
    renderfavoriteSearchResultList(resourceLibraryResultClick, data);
    renderFavoriteQuerySummary(data);
    renderCommonFacet(data,toggleAssetType)
  });

  // Check if any items are selected
  const hasSelected = data.some(item => item.state === 'selected');

  if (hasSelected) {
    facetBreadcrumbElement.style.display = 'block';
    breadcrumbContainer.appendChild(button);
  } else {
    facetBreadcrumbElement.style.display = 'none';
  }

  const mobileFilterClearAll = document.getElementById('mobile-filter-footer-clear-all');
  if (mobileFilterClearAll) {
    mobileFilterClearAll.addEventListener('click', () => {
      data.forEach((item) => {
        item.state = 'idle';
      });
        renderFavoriteFacetBreadcrumb(data,toggleAssetType);
        renderfavoriteSearchResultList(resourceLibraryResultClick, data);
        renderFavoriteQuerySummary(data);
        renderCommonFacet(data, toggleAssetType);
    });
  }

  facetBreadcrumbElement.appendChild(breadcrumbContainer);
};

export default renderFavoriteFacetBreadcrumb;
