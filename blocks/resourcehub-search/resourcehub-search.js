import { } from '../../scripts/scripts.js';
import { } from '../../scripts/aem.js';

import { standaloneSearchBoxController } from '../../scripts/header-search/headerSearchController.js';

/**
 *
 * @param {Element} block
 */
function registerDropdown(dropdown) {
  if (!dropdown) return;
  const btn = dropdown.querySelector('.dropbtn');
  const content = dropdown.querySelector('.dropdown-content');
  if (!btn || !content) return;
  btn.setAttribute('aria-expanded', 'false');
  btn.addEventListener('click', () => {
    console.log('dropdown clicked');
    // e.stopPropagation();
    const isOpen = content.style.display === 'block';
    console.log(`isOpen=${isOpen}`);
    // close other dropdowns
    this.querySelectorAll('.dropdown-content').forEach((c) => {
      console.log(`closing other dropdowns${content.textContent}>${c.textContent}`);
      if (c !== content) c.style.display = 'none';
      console.log('closed');
    });

    content.style.display = isOpen ? 'none' : 'block';
    console.log(`content.style.display=${content.style.display}`);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
  content.addEventListener('click', (e) => e.stopPropagation());
}
export default async function decorate(block) {
  console.log('adding standalone search box');
  const searchContainer = document.createElement('div');
  searchContainer.className = 'resourcesearch-container ';
  // hide by default on mobile; will be toggled by the search button
  // searchContainer.classList.add('tw-hidden-mobile');
  const searchBox = document.createElement('input');
  searchBox.type = 'text';
  searchBox.placeholder = 'Search';
  searchBox.className = 'resourcehub-search-box';
  searchBox.id = 'resourcehub-search-box';
  searchBox.maxLength = 200;

  const tooltip = document.createElement('div');
  tooltip.id = 'char-limit-tooltip';
  tooltip.className = 'char-limit-tooltip';
  tooltip.textContent = 'Input exceeds the limit. Please search within 200 characters';
  tooltip.style.display = 'none';

  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown';

  const dropbtn = document.createElement('button');
  dropbtn.className = 'dropbtn';
  const downArrow = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
    <path d="M14.7344 5L8.73437 11L2.73438 5" stroke="#141414"/>
    </svg>`;
  dropbtn.innerHTML = `All ${downArrow}`;

  const dropdownContent = document.createElement('div');
  dropdownContent.className = 'dropdown-content';
  dropdownContent.style.display = 'none';

  const menuItems = {
    All: 'All',
    'knowledge base article': 'Resource library',
    'Self paced learning': 'Self paced learning',
    'Instructor led traning': 'Instructor led traning',
    'Tech notes': 'Technote',
    'Regulatory docs': 'Regulatory docs',
    'User guides': 'User guides',
  };

  /* standaloneSearchBoxController.subscribe(() => {
      const suggestions = standaloneSearchBoxController.state.suggestions || [];
      if (suggestions.length > 0 && searchBox.value) {
        showSuggestions(selectedContentType, true);
      }
    }); */
  let selectedContentType = 'All';
  let selectedfacet = '';
  searchBox.addEventListener('focus', () => {
    standaloneSearchBoxController.showSuggestions();
  });

  searchBox.addEventListener('blur', () => {
    const suggestionPopup = document.getElementById('global-suggestion-popup');
    setTimeout(() => {
      if (suggestionPopup) suggestionPopup.style.display = 'none';
    }, 150);
  });

  Object.keys(menuItems).forEach((key) => {
    const value = menuItems[key];
    const anchorElement = document.createElement('a');
    anchorElement.href = '#';
    anchorElement.textContent = key;
    anchorElement.addEventListener('click', (event) => {
      event.preventDefault();
      dropbtn.innerHTML = key + downArrow;
      dropdownContent.style.display = 'none';
      selectedContentType = value;
      selectedfacet = key;
      console.log('Selected content type:', selectedContentType);
      console.log('Selected facet:', selectedfacet);
    });
    dropdownContent.appendChild(anchorElement);
  });

  dropdown.appendChild(dropbtn);
  dropdown.appendChild(dropdownContent);
  searchContainer.appendChild(searchBox);
  searchContainer.appendChild(tooltip);
  searchContainer.appendChild(dropdown);

  // Register dropdown behaviour (click to toggle, click outside to close)
  registerDropdown(dropdown);

  const searchBtn = document.createElement('button');
  searchBtn.className = 'global-search-btn';
  const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5677 9.16655C15.5677 12.2961 13.0307 14.8331 9.90104 14.8331C6.77141 14.8331 4.23438 12.2961 4.23438 9.16655C4.23438 6.03702 6.77141 3.5 9.90104 3.5C13.0307 3.5 15.5677 6.03702 15.5677 9.16655ZM14.2483 14.2209C13.0811 15.2257 11.562 15.8331 9.90104 15.8331C6.21914 15.8331 3.23438 12.8484 3.23438 9.16655C3.23438 5.48471 6.21914 2.5 9.90104 2.5C13.5829 2.5 16.5677 5.48471 16.5677 9.16655C16.5677 10.8275 15.9603 12.3466 14.9554 13.5138L17.7546 16.3129L18.1081 16.6664L17.401 17.3735L17.0475 17.02L14.2483 14.2209Z" fill="white"/>
    </svg>`;
  searchBtn.innerHTML = searchIcon;
  searchContainer.appendChild(searchBtn);

  // Prevent clicks inside search container from closing dropdowns
  searchContainer.addEventListener('click', (e) => e.stopPropagation());

  searchBtn.addEventListener('click', (event) => {
    console.log(`search button clicked>${searchBox.value.trim()}>`);
    if (searchBox.value.trim() !== '') {
      standaloneSearchBoxController.updateRedirectUrl(`/search-results?term=${searchBox.value}&contentType=${selectedContentType}&facetId=assettypes&value=${selectedfacet}`);
      standaloneSearchBoxController.submit();
    } else {
      standaloneSearchBoxController.submit();
    }
    event.stopPropagation();
  });

  // Duplicate click handler removed — behaviour handled by registerDropdown
  // dropbtn.addEventListener('click', (e) => {
  //  // e.stopPropagation();
  //  console.log('dropdown clicked');
  //   dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  // });

  // Close any open dropdowns when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-content').forEach((c) => {
      c.style.display = 'none';
    });
  });

  searchBox.addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
      standaloneSearchBoxController.updateText(query);
      standaloneSearchBoxController.showSuggestions();
    } else {
      standaloneSearchBoxController.updateText('');
      const suggestionPopup = document.getElementById('global-suggestion-popup');
      if (suggestionPopup) suggestionPopup.style.display = 'none';
    }
  });

  searchBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      standaloneSearchBoxController.updateRedirectUrl(`/search-results?term=${event.target.value}&contentType=${selectedContentType}`);
      standaloneSearchBoxController.submit();
    }
  });

  searchBox.addEventListener('input', () => {
    if (searchBox.value.length >= 200) {
      tooltip.style.display = 'block';
      searchContainer.classList.add('char-limit-reached');
    } else {
      tooltip.style.display = 'none';
      searchContainer.classList.remove('char-limit-reached');
    }
  });

  searchBox.addEventListener('blur', () => {
    tooltip.style.display = 'none';
  });
  block.prepend(searchContainer);
}
