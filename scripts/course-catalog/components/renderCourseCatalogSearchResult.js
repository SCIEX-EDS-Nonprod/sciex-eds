/* eslint-disable */
import { courseCatalogResultsList, courseCatalogResultClick } from '../course-catalog-controller/controllers.js';

const renderCourseCatalogSearchResults = () => {
  const resultsElement = document.getElementById('coveo-results');

  // loader div
  const resultsLoading = document.getElementById('coveo-results-loading');

  // show loader
  if (resultsLoading) {
    if (resultsLoading.classList.contains('tw-hidden')) {
      resultsLoading.classList.remove('tw-hidden');
    }
  }

  const noResultsElement = document.getElementById('coveo-no-results');
  const sortElement = document.getElementById('sort');

  const querySortElement = document.getElementsByClassName('query-sort-section')[0];
  const querySortSection = document.querySelector('.query-sort-section');
  resultsElement.innerHTML = '';

  const results = courseCatalogResultsList.state.results || [];
  const selectElement = document.getElementById('sort-element');
  const selectedValue = selectElement.value;
  const selectedCriterion = JSON.parse(selectedValue);
  let sortedResults;
  if (selectedCriterion.by === 'relevancy') {
    sortedResults = results;
  } else if (
    selectedCriterion.by === 'field'
    && selectedCriterion.field === 'title'
  ) {
    sortedResults = [...results].sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedCriterion.by === 'indexeddate') {
    sortedResults = [...results].sort((a, b) => {
      const dateA = new Date(a.indexeddate);
      const dateB = new Date(b.indexeddate);
      return dateB - dateA;
    });
  } else {
    sortedResults = results; // No sorting
  }

  if (sortedResults.length > 0) {
    // hide loader
    if (resultsLoading) {
      resultsLoading.classList.add('tw-hidden');
    }
    const facets = document.getElementById('facets');
    if (facets) {
      if (facets.classList.contains('tw-hidden')) {
        facets.classList.remove('tw-hidden');
      }
    }
    selectElement.removeAttribute('style');
    sortElement.removeAttribute('style');
    noResultsElement.style.display = 'none';
    querySortElement.style.display = '';
    if (querySortSection) {
      querySortSection.removeAttribute('style');
    }
    sortedResults.forEach((result) => {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';

      let descriptionHtml = '';
      if (result.raw.description) {
        descriptionHtml = `<p class="description">${result.raw.description}</p>`;
      } else {
        descriptionHtml = `<p class="description">${result.Excerpt}</p>`;
      }

      const courseInfo = document.createElement('div');
      courseInfo.className = 'course-info';
      courseInfo.innerHTML = 'Duration : 1 day | Language : German | Type : at SCIEX | Course Level : Intermediate | Rating : ';

      const ratingContainer = document.createElement('span');
      ratingContainer.className = 'rating';

      [1, 2, 3, 4, 5].forEach((i) => {
        const star = document.createElement('span');
        star.className = 'star';
        star.innerHTML = '&#9733;';
        star.setAttribute('data-value', i);
        ratingContainer.appendChild(star);
      });

      courseInfo.appendChild(ratingContainer);
      const stars = ratingContainer.querySelectorAll('.star');

      Array.from(stars).slice(0, result.rating).forEach((star) => star.classList.add('filled'));

      const resultMarkup = `
        <div class="item-details"> 
          <div class="tag-container">
            <span class="tag new">New</span>
            <span class="tag course">Course</span>
          </div>
          <h3>${result.title || 'No Title Available'}</h3>
          ${descriptionHtml}
          ${
  result.raw.ogimage
    ? `<img src="${result.raw.ogimage}" alt="ogimage" width="200" height="200">`
    : ''
}
        </div>
        <a class="view-details-btn" target="_blank" href="${result.printableUri}">View Course</a>
      `;

      resultItem.innerHTML = resultMarkup;

      const heading = resultItem.querySelector('h3');

      heading.insertAdjacentElement('afterend', courseInfo);

      const descriptionElement = resultItem.querySelector('.description');
      const itemDetails = resultItem.querySelector('.item-details');

      if (descriptionElement) {
        descriptionElement.style.maxHeight = '3em';
        descriptionElement.style.overflow = 'hidden';
        descriptionElement.style.textOverflow = 'ellipsis';
        descriptionElement.style.display = '-webkit-box';
        descriptionElement.style.webkitBoxOrient = 'vertical';

        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'show-more-btn-des';

        const showMoreText = '<span class="show-more-text">Read More</span>';
        showMoreBtn.innerHTML = showMoreText;
        showMoreBtn.style.display = 'none';

        const showMoreIcon = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8L14 8" stroke="#0068FA"/>
            <path d="M8 2L8 14" stroke="#0068FA"/>
          </svg>
        `;
        showMoreBtn.innerHTML += showMoreIcon;

        const checkOverflow = () => {
          if (descriptionElement.scrollHeight > descriptionElement.clientHeight) {
            showMoreBtn.style.display = 'inline-flex';
          }
        };

        const resizeObserver = new ResizeObserver(() => {
          checkOverflow();
        });
        resizeObserver.observe(descriptionElement);

        checkOverflow();
        showMoreBtn.addEventListener('click', () => {
          const isExpanded = descriptionElement.style.maxHeight === 'none';
          descriptionElement.style.maxHeight = isExpanded ? '3em' : 'none';
          showMoreBtn.innerHTML = isExpanded
            ? `<span class="show-more-text">Read More</span>${showMoreIcon}`
            : '<span class="show-more-text">Read Less</span> ' + `        
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="21" viewBox="0 0 16 21" fill="none">
                  <path d="M2 8L14 8" stroke="#0068FA"/>
                </svg>`;
        });

        itemDetails.appendChild(showMoreBtn);
      }

      const viewDetailsBtn = resultItem.querySelector('.view-details-btn');
      viewDetailsBtn.addEventListener('click', () => {
        courseCatalogResultClick(result);
      });

      resultsElement.appendChild(resultItem);
    });
  } else {
    // hide loader
    if (resultsLoading) {
      resultsLoading.classList.add('tw-hidden');
    }
    const divElement = document.getElementById('noresults-text1');
    const facets = document.getElementById('facets');
    if (facets) {
      if (!facets.classList.contains('tw-hidden')) {
        facets.classList.add('tw-hidden');
      }
    }

    // Access the data attribute 'data-example' using dataset
    const { text1 } = divElement.dataset;
    const inputText = document.getElementById('coveo-query').value;
    if (inputText.trim() !== '') {
      const updatedtext1 = `${text1} "${inputText}"`;
      document.getElementById('noresults-text1').innerText = updatedtext1;
    }
    noResultsElement.style.display = '';
    querySortElement.style.display = 'none';
    if (querySortSection) {
      querySortSection.style.setProperty('display', 'none', 'important');
    }
  }

  const searchWrapper = document.querySelectorAll('.search-wrapper')[0];
  if (noResultsElement && noResultsElement.style.display === 'none') {
    searchWrapper.style.width = 'auto';
  } else {
    searchWrapper.style.width = 'fit-content';
  }
};

export default renderCourseCatalogSearchResults;
