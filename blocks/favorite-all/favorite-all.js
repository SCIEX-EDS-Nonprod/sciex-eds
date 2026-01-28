import initializeSerachInterface from '../../scripts/common-components/renderUI.js';
import { resourceLibrarySearchEngine } from '../../scripts/favorite-all/favorite-allDocEngine.js';
import renderCommonSearchBox from '../../scripts/common-components/commonRenderSearchBox.js';
import {
  resourceLibrarySearchBoxController,
  resourceLibrarySortController,
  resourceLibraryResultClick,
  favoriteResultsList,
  resourceLibraryPaginationController,
  allFacetController
} from '../../scripts/favorite-all/favorite-all-controller/favorite-allDocController.js';
import renderCommonSorting from '../../scripts/common-components/commonSorting.js';
import renderCommonPagination from '../../scripts/common-components/commonPagination.js';
import { renderCommonFacet } from '../../scripts/common-components/favorite-all-facets.js';
import renderfavoriteSearchResultList from '../../scripts/common-components/favoriteSearchResultList.js';
import renderFavoriteQuerySummary from '../../scripts/common-components/favoriteQuerySummary.js';
import renderFavoriteFacetBreadcrumb from '../../scripts/common-components/favoriteFacetBreadcrumb.js';

async function readBlockProperties(block) {
  // Create no results section
  const coveoNoResultsDiv = document.createElement('div');
  coveoNoResultsDiv.id = 'coveo-no-results';
  coveoNoResultsDiv.style.display = 'none';
  const noResultsText = document.createElement('div');
  noResultsText.className = 'no-result-text';
  coveoNoResultsDiv.appendChild(noResultsText);
  document.body.appendChild(coveoNoResultsDiv);

  // lifeSciencesDiv
  const lifeSciencesDiv = document.createElement('div');
  lifeSciencesDiv.id = 'coveo-life-sciences';
  const path = window.location.pathname;
  const resp = await fetch(`${path}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();
    const main = document.createElement('main');
    main.innerHTML = html;
    const sections = Array.from(main.querySelector('.favorite-all').children);
    block.textContent = '';

    let description;
    sections.forEach((section, index) => {
      switch (index + 1) {
        case 1: {
          description = section.querySelector('div');
          description.className = 'banner-description';
          lifeSciencesDiv.appendChild(description);
          block.appendChild(lifeSciencesDiv);
          break;
        }
        case 2: {
          const picture = main.querySelector('picture');
          if (picture) {
            coveoNoResultsDiv.appendChild(picture);
          }
          break;
        }
        case 3: {
          const noResultsText1 = section.querySelector('div');
          noResultsText1.id = 'noresults-text1';
          noResultsText1.setAttribute('data-text1', noResultsText1.textContent);
          coveoNoResultsDiv.appendChild(noResultsText1);
          break;
        }
        case 4: {
          const noResultsText2 = section.querySelector('div');
          noResultsText2.classList.add('noresults-text2');
          coveoNoResultsDiv.appendChild(noResultsText2);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}

export default async function decorate(block) {
  // Create suggestion popup div
  const suggestionPopupDiv = document.createElement('div');
  suggestionPopupDiv.id = 'suggestion-popup';
  document.body.appendChild(suggestionPopupDiv);

  const facetsId = {
    assettypes: 'Asset type'
  };

  const desiredOrder = [
    'assettypes-facet',
    'applications-facet',
    'massspectrometerscategories-facet',
    'capillaryelectrophoresiscategories-facet',
    'hplcandceproductscategories-facet',
    'integratedsolutionscategories-facet',
    'softwarecategories-facet',
    'standardsandreagentscategories-facet',
    'language-facet',
  ];


  // const assetTypes = data.map(item => item.value);


  function toggleAssetType(value) {
    favoriteResultsList.forEach(item => {
      if (item.assetType === value.assetType) {
        item.state = item.state === "selected" ? "idle" : "selected";
      }
    });
    renderfavoriteSearchResultList(resourceLibraryResultClick, favoriteResultsList);
    renderFavoriteQuerySummary(favoriteResultsList);
    renderFavoriteFacetBreadcrumb(favoriteResultsList, toggleAssetType);
    renderCommonFacet(favoriteResultsList, toggleAssetType);
  }

  // Initialize course catalog components
  try {
    await readBlockProperties(block);
    await initializeSerachInterface(block, 'favorite-all');
    renderCommonSearchBox(resourceLibrarySearchBoxController);
    renderCommonSorting(resourceLibrarySortController);
    resourceLibrarySearchEngine.executeFirstSearch();
    resourceLibrarySearchEngine.subscribe(() => {
      renderfavoriteSearchResultList(resourceLibraryResultClick, favoriteResultsList);
      renderFavoriteQuerySummary(favoriteResultsList);
      renderCommonFacet(favoriteResultsList, toggleAssetType);
      renderFavoriteFacetBreadcrumb(favoriteResultsList, toggleAssetType);
    });
  } catch (error) {
    resourceLibrarySearchEngine.executeFirstSearch();
  }
}
