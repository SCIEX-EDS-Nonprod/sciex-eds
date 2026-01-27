import initializeSerachInterface from '../../scripts/common-components/renderUI.js';
import { resourceLibrarySearchEngine } from '../../scripts/favorite-all/favorite-allDocEngine.js';
import renderCommonSearchBox from '../../scripts/common-components/commonRenderSearchBox.js';
import {
  resourceLibrarySearchBoxController,
  resourceLibrarySortController,
  resourceLibraryResultClick,
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
 const favoriteResultsList=[
  {
    "assetType": "Knowledge base article",
    "state":"idle",
    "pageData": [
      {
        "path": "/support/knowledge-base-articles/change-cad-gas-settings-from-simplified-low-medium-high-to-operator-0-12-in-analyst-software_en_us",
        "id": "aE5Ou0000000P6TKAU",
        "title": "Change CAD Gas Settings from Simplified (Low, Medium, High) to Operator (0-12) in Analyst® Software",
        "description": "The default setting of CAD gas in Analyst® software is “Simplified” and only allows to adjust CAD gas in three steps (low, medium, high). Switching to “Operator” allows to use values from 0 to 12 which enables a more efficient optimization of this parameter for MS/MS and LIT experiments.",
        "relatedProducts": ["analyst", "knowledge-base-articles"]
      },
      {
        "path": "/support/knowledge-base-articles/an-if-statement-of-calculated-concentration-less-than-zero-does-not-work-for-concentrations-0-or-n-a-in-a-report-template_en_us",
        "id": "aE5Ou0000000P4rKAE",
        "title": "Reporter 3.2: How To Report Calculated Concentrations of \"<0\" or \"N/A\"",
        "description": "If a MultiQuant™ or Analyst® software results table contains values of \"<0\" and \"N/A\" for some calculated concentration values, these text values must be converted to a numerical zero value first using an Excel query. These calculated concentration values cannot be filtered into a Reporter Template Suite 3.2 results template using an if statement that selects for calculated concentration values that are less than or equal to zero.",
        "relatedProducts": ["english", "software", "knowledge-base-articles"]
      },
      {
        "path": "/support/knowledge-base-articles/discoveryquant-quicktune-dp-0-dp-scan-problem-1443624856293_en_us",
        "id": "aE5Ou0000000Nr3KAE",
        "title": "DiscoveryQuant Quicktune DP 0 DP Scan Problem",
        "description": "Using DiscoveryQuant 2.1.3 Quick Tune will set the DP value to 0 and then Fine Tune will fail as it has an invalid DP value.",
        "relatedProducts": ["pharma-cro", "discoveryquant", "knowledge-base-articles", "english"]
      }
    ],
    "tags": [
      {
        "key": "market-vertical",
        "value": [
          { "key": "Pharma CRO", "value": ["aE5Ou0000000Nr3KAE"] }
        ]
      },
      {
        "key": "software",
        "value": [
          { "key": "Analyst software", "value": ["aE5Ou0000000P6TKAU"] },
          { "key": "DiscoveryQuant software", "value": ["aE5Ou0000000Nr3KAE"] }
        ]
      },
      {
        "key": "language",
        "value": [
          { "key": "English", "value": ["aE5Ou0000000P4rKAE", "aE5Ou0000000Nr3KAE"] }
        ]
      },
      {
        "key": "products",
        "value": [
          { "key": "Software", "value": ["aE5Ou0000000P4rKAE"] }
        ]
      },
      {
        "key": "assetType",
        "value": [
          {
            "key": "Knowledge base article",
            "value": [
              "aE5Ou0000000P6TKAU",
              "aE5Ou0000000P4rKAE",
              "aE5Ou0000000Nr3KAE"
            ]
          }
        ]
      }
    ]
  },
 
  {
    "assetType": "SCIEX How",
        "state":"idle",
    "pageData": [
      {
        "path": "/Hidden/sciexhow/Analysis-Method-for-51-Pesticides-in-Vegetables-and-Fruit1",
        "id": "aE5Ou0000000P4sKAE",
        "title": "Analysis Method for 51 Pesticides in Vegetables and Fruit",
        "description": "To ensure public health and safety, many government agencies establish routine monitoring systems for pesticide residues.",
        "relatedProducts": ["sciexhow", "triple-quad-3500", "food-bev", "english"]
      }
    ],
    "tags": [
      {
        "key": "application",
        "value": [
          { "key": "Food and beverage testing", "value": ["aE5Ou0000000P4sKAE"] }
        ]
      },
      {
        "key": "language",
        "value": [
          { "key": "English", "value": ["aE5Ou0000000P4sKAE"] }
        ]
      },
      {
        "key": "mass-spec",
        "value": [
          { "key": "Triple Quad 3500", "value": ["aE5Ou0000000P4sKAE"] }
        ]
      },
      {
        "key": "assetType",
        "value": [
          { "key": "SCIEX How", "value": ["aE5Ou0000000P4sKAE"] }
        ]
      }
    ]
  },
 
  {
    "assetType": "Webinar",
     "state":"idle",
    "pageData": [
      {
        "path": "/events/no-pressure-hplc",
        "id": "aE5Ou0000000PT3KAM",
        "title": "No Pressure HPLC",
        "description": "",
        "relatedProducts": ["webinar", "life-science-research", "english"]
      }
    ],
    "tags": [
      {
        "key": "application",
        "value": [
          { "key": "Biomedical and omics research", "value": ["aE5Ou0000000PT3KAM"] }
        ]
      },
      {
        "key": "language",
        "value": [
          { "key": "English", "value": ["aE5Ou0000000PT3KAM"] }
        ]
      },
      {
        "key": "events",
        "value": [
          { "key": "Webinar", "value": ["aE5Ou0000000PT3KAM"] }
        ]
      },
      {
        "key": "assetType",
        "value": [
          { "key": "Webinar", "value": ["aE5Ou0000000PT3KAM"] }
        ]
      }
    ]
  },
 
  {
    "assetType": "Technote",
    "state":"idle",
    "pageData": [
      {
        "path": "/tech-notes/pharma/discovery/confident-identification-of-phase-1-metabolites-using-electron-a",
        "id": "aE5Ou0000000PRRKA2",
        "title": "Confident identification of phase 1 metabolites using electron-activated dissociation (EAD)",
        "description": "",
        "relatedProducts": ["technotes", "pharma-cro", "zenotof7600", "exionlc", "english"]
      }
    ],
    "tags": [
      {
        "key": "market-vertical",
        "value": [
          { "key": "Pharma CRO", "value": ["aE5Ou0000000PRRKA2"] }
        ]
      },
      {
        "key": "mass-spec",
        "value": [
          { "key": "ZenoTOF 7600 system", "value": ["aE5Ou0000000PRRKA2"] }
        ]
      },
      {
        "key": "language",
        "value": [
          { "key": "English", "value": ["aE5Ou0000000PRRKA2"] }
        ]
      },
      {
        "key": "assetType",
        "value": [
          { "key": "Technote", "value": ["aE5Ou0000000PRRKA2"] }
        ]
      }
    ]
  }
]



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
