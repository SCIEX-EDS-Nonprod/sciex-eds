import { courseCatalogResultsList, courseCatalogSortController } from '../course-catalog-controller/controllers.js';
import renderCourseCatalogSearchResults from './renderCourseCatalogSearchResult.js';

export function sortByTitle(data) {
  return [...data].sort((a, b) => a.title.localeCompare(b.title));
}
export function sortByDateDescending(data) {
  return [...data].sort((a, b) => {
    const dateA = new Date(a.indexeddate);
    const dateB = new Date(b.indexeddate);
    return dateB - dateA;
  });
}
export const sortCondition = {
  sortBy: (criterion) => {
    const values = courseCatalogResultsList.state.results;
    if (criterion.by === 'field' && criterion.field === 'title') {
      // Sorting by Title
      return sortByTitle(values);
    } if (criterion.by === 'indexeddate') {
      // Sorting by Date Ascending
      return sortByDateDescending(values);
    } if (criterion.by === 'relevancy') {
      return courseCatalogSortController.sortBy(criterion);
    }
    return '';
  },
};
const renderCourseCatalogSorting = () => {
  const sortElement = document.getElementById('sort');
  sortElement.innerHTML = '';
  const sortOptions = [
    { label: 'Relevancy', criterion: { by: 'relevancy' } },
    { label: 'Title', criterion: { by: 'field', field: 'title' } },
    { label: 'Date', criterion: { by: 'indexeddate', field: 'indexeddate' } },
  ];
  const selectElement = document.createElement('select');
  selectElement.id = 'sort-element';
  selectElement.className = 'tw-py-2 tw-px-3 tw-border tw-border-gray-300 tw-bg-white tw-text-sm';
  sortOptions.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = JSON.stringify(option.criterion);
    optionElement.innerText = option.label;
    selectElement.appendChild(optionElement);
  });

  selectElement.addEventListener('change', () => {
    // const selectedCriterion = JSON.parse(event.target.value);
    // const sortedData = sortCondition.sortBy(selectedCriterion);
    renderCourseCatalogSearchResults();
  });
  sortElement.appendChild(selectElement);
};
export default renderCourseCatalogSorting;
