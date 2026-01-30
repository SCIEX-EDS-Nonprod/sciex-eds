import { resourceLibraryResultClick } from '../favorite-all/favorite-all-controller/favorite-allDocController.js';
import { i18n } from '../translation.js';
import { renderCommonFacet } from './favorite-all-facets.js';
import renderFavoriteQuerySummary from './favoriteQuerySummary.js';
import renderfavoriteSearchResultList from './favoriteSearchResultList.js';

const lang = document.documentElement.lang || 'en';
const strings = i18n[lang] || i18n.en;

// Detect mobile
function canMobileActions() {
  return window.innerWidth <= 767;
}

const renderFavoriteFacetBreadcrumb = (data, toggleAssetType, toggleTag) => {
  const facetBreadcrumbElement = document.getElementById('facet-readcrumb');
  facetBreadcrumbElement.innerHTML = '';

  const breadcrumbContainer = document.createElement('div');
  breadcrumbContainer.classList.add('facet-breadcrumb-container');

  /* ======================================================
     FILTER COUNT WRAPPER FOR MOBILE
  ====================================================== */
  const filterCountWrapper = document.createElement('div');
  filterCountWrapper.id = 'filter-count-wrapper';
  filterCountWrapper.classList.add('tw-hidden');

  const filterCountShowLessButton = document.createElement('div');
  filterCountShowLessButton.id = 'filter-count-show-less';
  filterCountShowLessButton.classList.add('tw-hidden', 'tw-flex');
  const showLessSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M0 6L12 6" stroke="#0068FA"/></svg>';
  filterCountShowLessButton.innerHTML = `${showLessSvg} Show Less`;

  // Show filters
  filterCountWrapper.addEventListener('click', function () {
    const filters = breadcrumbContainer.querySelectorAll('.facet-breadcrumb');
    filters.forEach(f => f.classList.remove('tw-hidden'));

    if (filterCountShowLessButton.classList.contains('tw-hidden')) {
      filterCountShowLessButton.classList.remove('tw-hidden');
    }

    this.style.display = 'none';
    breadcrumbContainer.style.marginTop = '0px';
    facetBreadcrumbElement.style.marginBottom = '30px';

    const clearAllBtn = breadcrumbContainer.querySelector('button');
    if (clearAllBtn) clearAllBtn.style.bottom = '-20px';
  });

  // Hide filters (Show Less)
  filterCountShowLessButton.addEventListener('click', function () {
    const filters = breadcrumbContainer.querySelectorAll('.facet-breadcrumb');
    filters.forEach(f => f.classList.add('tw-hidden'));
    this.classList.add('tw-hidden');

    filterCountWrapper.style.display = 'block';
    breadcrumbContainer.style.marginTop = '20px';
    facetBreadcrumbElement.style.marginBottom = '0px';

    const clearAllBtn = breadcrumbContainer.querySelector('button');
    if (clearAllBtn) {
      clearAllBtn.style.marginTop = '-100px';
      clearAllBtn.style.bottom = 'auto';
    }
  });

  facetBreadcrumbElement.appendChild(filterCountWrapper);
  facetBreadcrumbElement.appendChild(filterCountShowLessButton);

  /* ======================================================
     ASSET TYPE BREADCRUMBS
  ====================================================== */
  data.forEach(asset => {
    if (asset.state === 'selected') {
      const gridContainer = document.createElement('div');
      gridContainer.classList.add('facet-breadcrumb');

      gridContainer.addEventListener('click', () => {
        asset.state = 'idle';
        asset.tags?.forEach(group => group.value?.forEach(tag => tag.state = 'idle'));

        renderFavoriteFacetBreadcrumb(data, toggleAssetType, toggleTag);
        renderfavoriteSearchResultList(resourceLibraryResultClick, data);
        renderFavoriteQuerySummary(data);
        renderCommonFacet(data, toggleAssetType, toggleTag);
      });

      const gridItem1 = document.createElement('div');
      gridItem1.classList.add('grid-item');
      const box1 = document.createElement('div');
      box1.textContent = `${strings.assetType} : ${asset.assetType}`;
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
    }
  });

  /* ======================================================
     TAG BREADCRUMBS (DEDUPED)
  ====================================================== */
  const uniqueSelectedTags = {};
  data.forEach(asset => {
    asset.tags?.forEach(group => {
      group.value?.forEach(tag => {
        if (tag.state === 'selected') {
          const key = `${group.key}__${tag.key}`;
          uniqueSelectedTags[key] = { groupKey: group.key, itemKey: tag.key };
        }
      });
    });
  });

  Object.values(uniqueSelectedTags).forEach(({ groupKey, itemKey }) => {
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('facet-breadcrumb');

    gridContainer.addEventListener('click', () => {
      data.forEach(asset => {
        if (asset.state === 'selected') {
          const group = asset.tags?.find(g => g.key === groupKey);
          const tag = group?.value?.find(v => v.key === itemKey);
          if (tag) tag.state = 'idle';
        }
      });

      renderFavoriteFacetBreadcrumb(data, toggleAssetType, toggleTag);
      renderfavoriteSearchResultList(resourceLibraryResultClick, data);
      renderFavoriteQuerySummary(data);
      renderCommonFacet(data, toggleAssetType, toggleTag);
    });

    const gridItem1 = document.createElement('div');
    gridItem1.classList.add('grid-item');
    const box1 = document.createElement('div');
    box1.textContent = `${groupKey} : ${itemKey}`;
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
  });

  /* ======================================================
     MOBILE FILTER COUNT LOGIC
  ====================================================== */
  if (canMobileActions()) {
    const filtersCount = breadcrumbContainer.querySelectorAll('.facet-breadcrumb');
    if (filtersCount.length > 1 && filterCountWrapper) {
      filterCountWrapper.classList.remove('tw-hidden');
      filterCountWrapper.innerHTML = `<span>Filters: +${filtersCount.length}</span>`;
      filtersCount.forEach(f => f.classList.add('tw-hidden'));
    }
  }

  /* ======================================================
     CLEAR ALL BUTTON
  ====================================================== */
  const clearAllBtn = document.createElement('button');
  clearAllBtn.textContent = 'Clear All';
  clearAllBtn.style.marginRight = '0';
  clearAllBtn.style.marginLeft = 'auto';
  clearAllBtn.style.color = 'var(--Blue-700, #0068FA)';
  clearAllBtn.style.fontSize = '16px';
  clearAllBtn.style.fontStyle = 'normal';
  clearAllBtn.style.fontWeight = '530';
  clearAllBtn.style.lineHeight = '24px';
  clearAllBtn.style.letterSpacing = '0.08px';

  clearAllBtn.addEventListener('click', () => {
    data.forEach(asset => {
      asset.state = 'idle';
      asset.tags?.forEach(group => group.value?.forEach(tag => tag.state = 'idle'));
    });

    renderFavoriteFacetBreadcrumb(data, toggleAssetType, toggleTag);
    renderfavoriteSearchResultList(resourceLibraryResultClick, data);
    renderFavoriteQuerySummary(data);
    renderCommonFacet(data, toggleAssetType, toggleTag);
  });

  /* ======================================================
     SHOW / HIDE CONTAINER
  ====================================================== */
  const hasSelected =
    data.some(a => a.state === 'selected') ||
    data.some(a => a.tags?.some(g => g.value?.some(v => v.state === 'selected')));

  if (hasSelected) {
    breadcrumbContainer.appendChild(clearAllBtn);
    facetBreadcrumbElement.style.display = 'block';
  } else {
    facetBreadcrumbElement.style.display = 'none';
  }

  /* ======================================================
     MOBILE FOOTER CLEAR ALL
  ====================================================== */
  const mobileFilterClearAll = document.getElementById('mobile-filter-footer-clear-all');
  if (mobileFilterClearAll) {
    mobileFilterClearAll.addEventListener('click', () => {
      data.forEach(asset => {
        asset.state = 'idle';
        asset.tags?.forEach(group => group.value?.forEach(tag => tag.state = 'idle'));
      });

      renderFavoriteFacetBreadcrumb(data, toggleAssetType, toggleTag);
      renderfavoriteSearchResultList(resourceLibraryResultClick, data);
      renderFavoriteQuerySummary(data);
      renderCommonFacet(data, toggleAssetType, toggleTag);
    });
  }

  facetBreadcrumbElement.appendChild(breadcrumbContainer);
};

export default renderFavoriteFacetBreadcrumb;
