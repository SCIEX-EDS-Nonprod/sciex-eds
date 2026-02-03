import { i18n } from '../translation.js';

const lang = document.documentElement.lang || 'en';
const strings = i18n[lang] || i18n.en;

const renderFavoriteQuerySummary = (data) => {
  const querySummaryElement = document.getElementById('query-summary');
  const mobileFilterResultBtn = document.getElementById(
    'mobile-filter-footer-results'
  );

  querySummaryElement.innerHTML = '';

  /* ======================================================
     FLATTEN ALL RESULTS
  ====================================================== */

  const allResults = Array.isArray(data)
    ? data.flatMap(asset =>
        asset.pageData?.map(item => ({
          ...item,
          assetType: asset.assetType
        })) || []
      )
    : [];

  /* ======================================================
     SELECTED ASSET TYPES
  ====================================================== */

  const selectedAssetTypes = data
    .filter(a => a.state === 'selected')
    .map(a => a.assetType);

  /* ======================================================
     SELECTED TAG IDS
  ====================================================== */

  const selectedTagIds = data.flatMap(asset =>
    asset.tags?.flatMap(tagGroup =>
      tagGroup.value
        ?.filter(v => v.state === 'selected')
        .flatMap(v => v.value)
    ) || []
  );

  /* ======================================================
     APPLY SAME FILTER LOGIC
  ====================================================== */

  let filteredResults = allResults;

  if (selectedAssetTypes.length > 0) {
    filteredResults = filteredResults.filter(item =>
      selectedAssetTypes.includes(item.assetType)
    );
  }

  if (selectedTagIds.length > 0) {
    filteredResults = filteredResults.filter(item =>
      selectedTagIds.includes(item.id)
    );
  }

  /* ======================================================
     RESULT COUNT
  ====================================================== */

  const displayCount =
    selectedAssetTypes.length > 0 || selectedTagIds.length > 0
      ? filteredResults.length
      : allResults.length;

  /* ======================================================
     RENDER
  ====================================================== */

  const resultItem = document.createElement('div');

  mobileFilterResultBtn.innerHTML = `Results (${displayCount})`;

  resultItem.innerHTML = `
    ${strings.result}
    <span>1 - ${displayCount}</span>
    ${strings.of}
    <span>${displayCount}</span>
  `;

  querySummaryElement.appendChild(resultItem);
};

export default renderFavoriteQuerySummary;
