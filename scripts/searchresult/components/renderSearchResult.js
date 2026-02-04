import {
  headlessResultsList,
  handleResultClick,
} from '../controller/controllers.js';
import { i18n } from '../../translation.js';

const lang = document.documentElement.lang || 'en';
const strings = i18n[lang] || i18n.en;

const renderSearchResults = () => {
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

  const results = headlessResultsList.state.results || [];
  const sortedResults = results;

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
    sortElement.removeAttribute('style');
    noResultsElement.style.display = 'none';
    querySortElement.style.display = '';
    if (querySortSection) {
      querySortSection.removeAttribute('style');
    }
    sortedResults.forEach((result) => {
      const regulatoryInfo = document.createElement('div');
      regulatoryInfo.className = 'regulatory-info';
      const partNumber = result.raw.productpartnumber ? `${strings.partNumber} : ${result.raw.productpartnumber} | ` : '';
      const lotNumber = result.raw.lotnumber ? `${strings.lotNumber} : ${result.raw.lotnumber} | ` : '';
      const componentLotNumber = result.raw.kitpartnumber ? `${strings.kitNumber} : ${result.raw.kitpartnumber} ` : '';

      regulatoryInfo.innerHTML = `${partNumber}  ${lotNumber}  ${componentLotNumber}`;

      const courseInfo = document.createElement('div');
      courseInfo.className = 'course-info';
      const duration = result.raw.duration ? `Duration : ${result.raw.duration} | ` : '';
      const language = result.raw.language ? `Language : ${result.raw.language} | ` : '';
      const courseType = result.raw.coursetypecategories ? `Type : ${result.raw.coursetypecategories} | ` : '';
      const courseLevel = result.raw.levelcategories ? `Course Level : ${result.raw.levelcategories} | ` : '';
      courseInfo.innerHTML = `${duration}  ${language}  ${courseType}  ${courseLevel}  Rating : `;

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

      const rating = result?.raw?.rating ?? 0;
      Array.from(stars).slice(0, rating).forEach((star) => star.classList.add('filled'));

      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      resultItem.innerHTML = `
          <div class="item-details"> 
            ${result.raw.isnewcourse || result.raw.coursetypecategories
    ? `<div class="tag-container">
                ${result.raw.coursetypecategories.toString() === 'Premium online' ? '<span class="tag premium">Premium</span>' : ''}
                ${result.raw.isnewcourse ? '<span class="tag new">New</span>' : ''}
              </div> ` : ''
}
            <h3>${result.title || 'No Title Available'}</h3>
            ${
  result.raw.description
    ? `<p class="description">${result.raw.description}</p> `
    : `<p class="description">${result.Excerpt}</p>`
}
            ${
  result.raw.ogimage
    ? `<img src="${result.raw.ogimage}" alt="ogimage" width="200" height="200">`
    : ''
}
        </div>
        <div class="action-section">
              <div class="item-icons">
                <span class="favorite-icon" aria-label="Favorite">
                     <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 22">
                        <path d="M21.1412 11.2293L11.7662 20.5143L2.39125 11.2293C1.77288 10.6275 1.2858 9.90428 0.96068 9.10505C0.635562 8.30583 0.479448 7.44795 0.502167 6.58543C0.524887 5.7229 0.725949 4.87443 1.09269 4.09343C1.45944 3.31243 1.98391 2.61583 2.6331 2.04748C3.28229 1.47914 4.04213 1.05137 4.86476 0.79111C5.68739 0.53085 6.555 0.443739 7.41296 0.535261C8.27091 0.626783 9.10062 0.894955 9.84984 1.32289C10.5991 1.75083 11.2516 2.32926 11.7662 3.02176C12.2832 2.33429 12.9364 1.76091 13.6851 1.33752C14.4338 0.91412 15.2619 0.649821 16.1174 0.561159C16.973 0.472497 17.8376 0.561382 18.6572 0.822249C19.4768 1.08312 20.2338 1.51035 20.8807 2.07721C21.5276 2.64408 22.0505 3.33836 22.4168 4.11662C22.783 4.89488 22.9847 5.74036 23.0091 6.60014C23.0336 7.45993 22.8803 8.3155 22.5589 9.11332C22.2375 9.91114 21.7549 10.634 21.1412 11.2368"
                          stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                  </span> 
                  <img src="/icons/share.svg" alt="Share" class="share-icon" />
              </div>
              <a class="view-details-btn" target="_blank" href="${result.printableUri}">${strings.view}</a>
        </div>
        `;

      const favIcon = resultItem.querySelector('.favorite-icon');
      favIcon.addEventListener('click', () => {
        favIcon.classList.toggle('favorited');
      });


      const viewDetailsBtn = resultItem.querySelector('.view-details-btn');
      viewDetailsBtn.addEventListener('click', () => {
        handleResultClick(result);
      });

      const heading = resultItem.querySelector('h3');

      if (duration || courseType || courseLevel) {
        heading.insertAdjacentElement('afterend', courseInfo);
      }

      if (partNumber || lotNumber || componentLotNumber) {
        heading.insertAdjacentElement('afterend', regulatoryInfo);
      }

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

export default renderSearchResults;