import { i18n } from '../translation.js';

const lang = document.documentElement.lang || 'en';
const strings = i18n[lang] || i18n.en;

const renderCommonQuerySummary = (dataOrController) => {
  const querySummaryElement = document.getElementById('query-summary');
  const mobileFilterResultBtn = document.getElementById('mobile-filter-footer-results');
  querySummaryElement.innerHTML = '';
  const resultItem = document.createElement('div');
  
  // Handle both array data and controller objects
  let total = 0;
  let firstResult = 0;
  let lastResult = 0;
  
  if (Array.isArray(dataOrController)) {
    // New data array approach
    total = dataOrController.length;
    firstResult = total > 0 ? 1 : 0;
    lastResult = total;
  } else {
    // Legacy controller approach
    const querySummaryState = dataOrController.state;
    total = querySummaryState.total;
    firstResult = querySummaryState.firstResult;
    lastResult = querySummaryState.lastResult;
  }
  
  if (mobileFilterResultBtn) {
    mobileFilterResultBtn.innerHTML = `Results (${total})`;
  }
  
  if (total > 0) {
    resultItem.innerHTML = `${strings.result} <span> ${firstResult} - ${lastResult} </span>
                              ${strings.of} <span>${total}</span>`;
  } else {
    resultItem.innerHTML = `${strings.result} <span>0</span>`;
  }
  
  querySummaryElement.appendChild(resultItem);
};
export default renderCommonQuerySummary;
