/* eslint-disable */


import   getFavoriteResultsList from '../../scripts/favorite-all/favorite-all-controller/favorite-allDocController.js';
import { renderCommonFacet } from '../../scripts/common-components/favorite-all-facets.js';
import renderfavoriteSearchResultList from '../../scripts/common-components/favoriteSearchResultList.js';
import renderFavoriteQuerySummary from '../../scripts/common-components/favoriteQuerySummary.js';
import renderFavoriteFacetBreadcrumb from '../../scripts/common-components/favoriteFacetBreadcrumb.js';
import initializefavoriteSearchInterface from '../../scripts/common-components/favoriteResourceUi.js';

/* ======================================================
   BLOCK CONTENT (banner + no results)
====================================================== */
async function readBlockProperties(block) {
  const noResultsDiv = document.createElement('div');
  noResultsDiv.id = 'coveo-no-results';
  noResultsDiv.style.display = 'none';

  const noResultsText = document.createElement('div');
  noResultsText.className = 'no-result-text';
  noResultsDiv.appendChild(noResultsText);
  document.body.appendChild(noResultsDiv);

  const bannerWrapper = document.createElement('div');
  bannerWrapper.id = 'banner';

  const resp = await fetch(`${window.location.pathname}.plain.html`);
  if (!resp.ok) return;

  const main = document.createElement('main');
  main.innerHTML = await resp.text();

  const sections = Array.from(
    main.querySelector('.favorite-all')?.children || []
  );

  block.textContent = '';

  sections.forEach((section, index) => {
    const div = section.querySelector('div');
    if (!div) return;

    switch (index) {
      case 0:
        div.className = 'favorite-banner-title';
        bannerWrapper.appendChild(div);
        block.appendChild(bannerWrapper);
        break;

      case 1:
        div.className = 'favorite-banner-description';
        bannerWrapper.appendChild(div);
        break;

      case 2: {
        const picture = main.querySelector('picture');
        if (picture) noResultsDiv.appendChild(picture);
        break;
      }

      case 3:
        div.id = 'noresults-text1';
        div.dataset.text1 = div.textContent;
        noResultsDiv.appendChild(div);
        break;

      case 4:
        div.classList.add('noresults-text2');
        noResultsDiv.appendChild(div);
        break;

      default:
        break;
    }
  });
}

const data = await getFavoriteResultsList();


const favoriteResultsList = data.map(item => ({
  ...item,
  tags: item.tags.filter(tag => tag.key !== "assetType")
}));



/* ======================================================
   RENDER HELPERS
====================================================== */
async function renderUi() {
  renderfavoriteSearchResultList(
    favoriteResultsList
  );
  renderCommonFacet(favoriteResultsList, toggleAssetType, toggleTag);

  renderFavoriteQuerySummary(favoriteResultsList);
  renderFavoriteFacetBreadcrumb(
    favoriteResultsList,
    toggleAssetType,
    toggleTag,
    renderUi
  );
}

/* ======================================================
   TOGGLE HANDLERS
====================================================== */
function toggleTag(tagItem) {
  tagItem.state = tagItem.state === 'selected' ? 'idle' : 'selected';
  renderUi();
}


function toggleAssetType(asset) {
  const wasSelected = asset.state === 'selected';
  asset.state = wasSelected ? 'idle' : 'selected';

  if (!wasSelected) {
    // apply already-selected tags to newly selected asset
    favoriteResultsList.forEach(a => {
      if (a === asset) return;

      a.tags?.forEach(group => {
        group.value?.forEach(tag => {
          if (tag.state === 'selected') {
            const targetGroup = asset.tags?.find(g => g.key === group.key);
            const targetTag = targetGroup?.value?.find(v => v.key === tag.key);
            if (targetTag) targetTag.state = 'selected';
          }
        });
      });
    });
  } else {
    // clear tags when asset is unselected
    asset.tags?.forEach(group =>
      group.value?.forEach(tag => (tag.state = 'idle'))
    );
  }

  renderUi();
}

export function showResourceHubButton(block) {
  const resourceHubButton = document.createElement('a');
  resourceHubButton.className = 'resource-hub-button';
  resourceHubButton.textContent = 'Back to resource hub';
  resourceHubButton.style.cursor = 'pointer';
   resourceHubButton.href = '#'; 
   resourceHubButton.innerHTML = `
    <span>Back to resource hub</span>
    <img src="/icons/right-arrow.svg" alt="arrow" />
  `;

  block.appendChild(resourceHubButton);
}

/* ======================================================
   DECORATE
====================================================== */
export default async function decorate(block) { 

  try {
    await readBlockProperties(block);
    await initializefavoriteSearchInterface(block, 'favorite-all');
        showResourceHubButton(block);

    renderUi();
  } catch (err) {
    // fail silently (current behavior preserved)
    console.error(err);
  }
}
