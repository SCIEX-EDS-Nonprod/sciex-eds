import { fetchPlaceholders } from '../aem.js';


const MAX_RESULTS = 10;
const placeholders = await fetchPlaceholders();

function hasAnySelection(data) {
  return data.some((a) => a.state === 'selected');
}

const renderFavoriteQuerySummary = (data = []) => {
  const querySummaryEl = document.getElementById('query-summary');
  const mobileResultBtn = document.getElementById('mobile-filter-footer-results');
  const sortId = document.getElementById('sort');
  const querySummary = document.getElementById('query-sort-section');

  if (!hasAnySelection(data)) {
    querySummaryEl.style.visibility = 'hidden';
    sortId.style.setProperty('display', 'none', 'important');
    querySummary.style.display = 'none';
    const firstResultItem = document.querySelector('.result-item:first-child');
    if (firstResultItem) {
      firstResultItem.style.setProperty('border-top', 'none', 'important');
    }
    return;
  }

  sortId.style.setProperty('display', 'flex', 'important');
  querySummary.style.display = 'flex';
  querySummaryEl.style.visibility = 'visible';

  if (!querySummaryEl || !mobileResultBtn) return;

  querySummaryEl.textContent = '';

  /* ======================================================
     COLLECT STATE
  ====================================================== */

  const selectedAssetTypes = new Set();
  const selectedTagIds = new Set();
  const allResults = [];

  data.forEach((asset) => {
    if (asset.state === 'selected') {
      selectedAssetTypes.add(asset.assetType);
    }

    asset.tags?.forEach((group) => group.value?.forEach((tag) => {
      if (tag.state === 'selected') {
        tag.value?.forEach((id) => selectedTagIds.add(id));
      }
    }));

    asset.pageData?.forEach((item) => {
      allResults.push({ ...item, assetType: asset.assetType });
    });
  });

  /* ======================================================
     FILTER RESULTS
  ====================================================== */

  const hasAssetFilter = selectedAssetTypes.size > 0;
  const hasTagFilter = selectedTagIds.size > 0;

  const filteredResults = hasAssetFilter || hasTagFilter
    ? allResults.filter(
      (item) => (!hasAssetFilter || selectedAssetTypes.has(item.assetType))
            && (!hasTagFilter || selectedTagIds.has(item.id)),
    )
    : allResults;

  const totalResultCount = filteredResults.length;
  const displayResultCount = Math.min(totalResultCount, MAX_RESULTS);

  /* ======================================================
     RENDER
  ====================================================== */

  mobileResultBtn.textContent = `${placeholders?.result} (${displayResultCount})`;

  const resultItem = document.createElement('div');
  resultItem.innerHTML = `
    ${placeholders?.result}
   <span>${displayResultCount === 0 ? 0 : 1} - ${displayResultCount}</span>
    ${placeholders?.of}
    <span>${totalResultCount}</span>
  `;

  querySummaryEl.appendChild(resultItem);
};

export default renderFavoriteQuerySummary;
