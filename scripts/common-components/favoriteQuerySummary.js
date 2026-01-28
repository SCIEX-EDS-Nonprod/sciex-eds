import { i18n } from '../translation.js';

const lang = document.documentElement.lang || 'en';
const strings = i18n[lang] || i18n.en;

const renderFavoriteQuerySummary = (data) => {
  const querySummaryElement = document.getElementById('query-summary');
  const mobileFilterResultBtn = document.getElementById('mobile-filter-footer-results');
  querySummaryElement.innerHTML = '';
  const resultItem = document.createElement('div');
  
  // Calculate total results across all items
  const totalResults = data.reduce((acc, item) => acc + (item.pageData?.length || 0), 0);
  
  // Calculate selected results - only from items with state === 'selected'
  const selectedResults = data.reduce((acc, item) => {
    if (item.state === 'selected') {
      return acc + (item.pageData?.length || 0);
    }
    return acc;
  }, 0);
  
  // Determine which count to display
  const hasSelected = data.some(item => item.state === 'selected');
  const displayCount = hasSelected ? selectedResults : totalResults;
  
  mobileFilterResultBtn.innerHTML = `Results (${displayCount})`;
  resultItem.innerHTML = `${strings.result} <span>1 - ${displayCount}</span> ${strings.of} <span>${displayCount}</span>`;
  
  querySummaryElement.appendChild(resultItem);
};

export default renderFavoriteQuerySummary;
