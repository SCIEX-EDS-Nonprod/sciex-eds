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
  if (!resp.ok) return;

  const html = await resp.text();
  const main = document.createElement('main');
  main.innerHTML = html;
  const sections = Array.from(main.querySelector('.favorite-all')?.children || []);
  block.textContent = '';

  let title, description;
  sections.forEach((section, index) => {
    switch (index + 1) {
      case 1: {
        // Banner title
        title = section.querySelector('div');
        if (title) {
          title.className = 'banner-title';
          lifeSciencesDiv.appendChild(title);
          block.appendChild(lifeSciencesDiv);
        }
        break;
      }
      case 2: {
        // Banner description
        description = section.querySelector('div');
        if (description) {
          description.className = 'favorite-banner-description';
          lifeSciencesDiv.appendChild(description);
          // block already has lifeSciencesDiv
        }
        break;
      }
      case 3: {
        // Picture for no results
        const picture = main.querySelector('picture');
        if (picture) {
          coveoNoResultsDiv.appendChild(picture);
        }
        break;
      }
      case 4: {
        // No results text1
        const noResultsText1 = section.querySelector('div');
        if (noResultsText1) {
          noResultsText1.id = 'noresults-text1';
          noResultsText1.dataset.text1 = noResultsText1.textContent;
          coveoNoResultsDiv.appendChild(noResultsText1);
        }
        break;
      }
      case 5: {
        // No results text2
        const noResultsText2 = section.querySelector('div');
        if (noResultsText2) {
          noResultsText2.classList.add('noresults-text2');
          coveoNoResultsDiv.appendChild(noResultsText2);
        }
        break;
      }
      default:
        break;
    }
  });
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

 const favoriteResultsList =[
  {
    "assetType": "SCIEX How",
    "pageData": [
      {
        "path": "/Hidden/sciexhow/LC-MS-MS-Rapid-Quantitation-and-Screening-Method-for-222-Pesticide-Residues-in-Tea",
        "id": "aE5Ou0000000OvBKAU",
        "title": "LC-MS/MS Rapid Quantitation and Screening Method for 222 Pesticide Residues in Tea",
        "created": "2021-07-12",
        "description": "China is the world’s home of tea and is the first country in the world to discover, cultivate, make and drink tea. However, driven by profit, the tea crisis is becoming increasingly important. This is mainly highlighted by the “poisoning” of tea quality. This application note focuses on the problem of pesticide residues in tea. On the SCIEX Triple Quad 3500 System, a rapid screening method of 222 pesticides has been established to provide a simple and quick solution to the problem of pesticide residues in tea.",
        "relatedProducts": [
          {
            "title": "Triple Quad 3500",
            "href": "/content/SCIEX/na/us/en/products/mass-spectrometers/triple-quad-systems/triple-quad-3500-system"
          }
        ]
      }
    ],
    "tags": [
      {
        "key": "Triple Quad systems",
        "value": [
          {
            "key": "Triple Quad 3500",
            "value": [
              "aE5Ou0000000OvBKAU"
            ]
          }
        ]
      },
      {
        "key": "Language",
        "value": [
          {
            "key": "English",
            "value": [
              "aE5Ou0000000OvBKAU"
            ]
          }
        ]
      },
      {
        "key": "Application",
        "value": [
          {
            "key": "Food and beverage testing",
            "value": [
              "aE5Ou0000000OvBKAU"
            ]
          }
        ]
      },
      {
        "key": "assetType",
        "value": [
          {
            "key": "SCIEX How",
            "value": [
              "aE5Ou0000000OvBKAU"
            ]
          }
        ]
      }
    ]
  },
  {
    "assetType": "Webinar",
    "pageData": [
      {
        "path": "/events/determination-of-empty-full-ratio",
        "id": "aE5Ou0000000P86KAE",
        "title": "Determination of empty full ratio",
        "created": "2020-12-09",
        "description": "",
        "relatedProducts": []
      },
      {
        "path": "/events/virtual-2020-global-cesi-ms-symposium",
        "id": "aE5Ou0000000P1dKAE",
        "title": "Innovations in proteomics discovery and small molecule/quant",
        "created": "2020-12-09",
        "description": "",
        "relatedProducts": []
      },
      {
        "path": "/events/scanning-swath-acquisition-proteomics-done-fast-and-what-to-do-with-it",
        "id": "aE5Ou0000000OwnKAE",
        "title": "Scanning SWATH® Acquisition: Proteomics done fast - and what to do with it",
        "created": "2020-12-09",
        "description": "",
        "relatedProducts": []
      }
    ],
    "tags": [
      {
        "key": "Type",
        "value": [
          {
            "key": "Webinar",
            "value": [
              "aE5Ou0000000P86KAE",
              "aE5Ou0000000P1dKAE",
              "aE5Ou0000000OwnKAE"
            ]
          }
        ]
      },
      {
        "key": "Language",
        "value": [
          {
            "key": "English",
            "value": [
              "aE5Ou0000000P86KAE",
              "aE5Ou0000000P1dKAE",
              "aE5Ou0000000OwnKAE"
            ]
          }
        ]
      },
      {
        "key": "Software",
        "value": [
          {
            "key": "SWATH Acquisition",
            "value": [
              "aE5Ou0000000P86KAE",
              "aE5Ou0000000OwnKAE"
            ]
          }
        ]
      },
      {
        "key": "Application",
        "value": [
          {
            "key": "Biomedical and omics research",
            "value": [
              "aE5Ou0000000P86KAE",
              "aE5Ou0000000P1dKAE",
              "aE5Ou0000000OwnKAE"
            ]
          }
        ]
      },
      {
        "key": "assetType",
        "value": [
          {
            "key": "Webinar",
            "value": [
              "aE5Ou0000000P86KAE",
              "aE5Ou0000000P1dKAE",
              "aE5Ou0000000OwnKAE"
            ]
          }
        ]
      }
    ]
  },
  {
    "assetType": "Technote",
    "pageData": [
      {
        "path": "/tech-notes/pharma/bioanalysis-pk/low-ng-ml-quantitation-of-glucagon-like-peptide-1--glp-1--analog",
        "id": "aE5Ou0000000PPpKAM",
        "title": "Low-ng/mL quantitation of glucagon-like peptide-1 (GLP-1) analog in rat plasma",
        "created": "2023-11-30",
        "description": "",
        "relatedProducts": [
          {
            "title": "Triple Quad 7500",
            "href": "/content/SCIEX/na/us/en/products/mass-spectrometers/triple-quad-systems/triple-quad-7500-system"
          }
        ]
      },
      {
        "path": "/tech-notes/biopharma/improved-lc-mrm-workflow-for-quantification-of-glucagonlike-pept",
        "id": "aE5Ou0000000PODKA2",
        "title": "Improved LC-MRM workflow for quantification of glucagonlike peptide-1 analogues",
        "created": "2021-11-17",
        "description": "",
        "relatedProducts": [
          {
            "title": "Triple Quad 7500",
            "href": "/content/SCIEX/na/us/en/products/mass-spectrometers/triple-quad-systems/triple-quad-7500-system"
          }
        ]
      },
      {
        "path": "/tech-notes/life-science-research/lipidomics/high-throughput-targeted-lipidomics-analysis-of-dihydroceramide-",
        "id": "aE5Ou0000000PMbKAM",
        "title": "High-throughput targeted lipidomics analysis of dihydroceramide desaturase-1 (DES1) knockout mice",
        "created": "2021-01-05",
        "description": "Previously a targeted lipid profiling method was developed for quantifying a many lipid molecular species (~1500) in a single run. To determine the performance of the method in biological matrices, a short feasibility study was done here using LC-MSM on the QTRAP 6500+ system. Using well characterized DES1 knockout mouse model, the expected changes in ceramides and dihydroceramides were observed. Many lipid classes were not found to be changing (17 classes) relative to the control.",
        "relatedProducts": [
          {
            "title": "Triple Quad 7500",
            "href": "/content/SCIEX/na/us/en/products/mass-spectrometers/triple-quad-systems/triple-quad-7500-system"
          },
          {
            "title": "Triple Quad 6500+",
            "href": "/content/SCIEX/na/us/en/products/mass-spectrometers/triple-quad-systems/triple-quad-6500plus-system"
          },
          {
            "title": "QTRAP 6500+",
            "href": "/content/SCIEX/na/us/en/products/mass-spectrometers/qtrap-systems/qtrap-6500plus-system"
          },
          {
            "title": "QTRAP systems",
            "href": "/content/SCIEX/na/us/en/products/mass-spectrometers/qtrap-systems"
          }
        ]
      },
      {
        "path": "/tech-notes/biopharma/streamlined-identification-and-quantitation-of-impurities-of-the",
        "id": "aE5Ou0000000PKzKAM",
        "title": "Streamlined identification and quantitation of impurities of the ionizable lipid ALC-0315 for rapid and confident vendor-to-vendor raw material assessment to ensure mRNA-LNP product quality",
        "created": "2023-11-30",
        "description": "",
        "relatedProducts": [
          {
            "title": "ZenoTOF 7600",
            "href": "/content/SCIEX/na/us/en/products/mass-spectrometers/qtof-systems/zenotof-7600-system"
          }
        ]
      },
      {
        "path": "/tech-notes/biopharma/structural-characterization-of-the-cationic-lipid-nanoparticle-c",
        "id": "aE5Ou0000000OQXKA2",
        "title": "Structural characterization of the cationic lipid nanoparticle component, ALC-0315, and its impurities using electronactivated dissociation (EAD)-based MS/MS fragmentation",
        "created": "2023-11-30",
        "description": "",
        "relatedProducts": [
          {
            "title": "ZenoTOF 7600 system",
            "href": "/content/SCIEX/na/us/en/products/mass-spectrometers/qtof-systems/zenotof-7600-system"
          }
        ]
      }
    ],
    "tags": [
      {
        "key": "QTRAP systems",
        "value": [
          {
            "key": "QTRAP 6500+",
            "value": [
              "aE5Ou0000000PMbKAM"
            ]
          }
        ]
      },
      {
        "key": "Triple Quad systems",
        "value": [
          {
            "key": "Triple Quad 7500",
            "value": [
              "aE5Ou0000000PPpKAM",
              "aE5Ou0000000PODKA2",
              "aE5Ou0000000PMbKAM"
            ]
          },
          {
            "key": "Triple Quad 6500+",
            "value": [
              "aE5Ou0000000PMbKAM"
            ]
          }
        ]
      },
      {
        "key": "Language",
        "value": [
          {
            "key": "English",
            "value": [
              "aE5Ou0000000PPpKAM",
              "aE5Ou0000000PODKA2",
              "aE5Ou0000000PMbKAM",
              "aE5Ou0000000PKzKAM",
              "aE5Ou0000000OQXKA2"
            ]
          }
        ]
      },
      {
        "key": "QTOF systems",
        "value": [
          {
            "key": "ZenoTOF 7600",
            "value": [
              "aE5Ou0000000PKzKAM"
            ]
          }
        ]
      },
      {
        "key": "Liquid chromatography",
        "value": [
          {
            "key": "ExionLC",
            "value": [
              "aE5Ou0000000PODKA2"
            ]
          }
        ]
      },
      {
        "key": "Mass spectrometry",
        "value": [
          {
            "key": "QTRAP systems",
            "value": [
              "aE5Ou0000000PMbKAM"
            ]
          },
          {
            "key": "ZenoTOF 7600 system",
            "value": [
              "aE5Ou0000000OQXKA2"
            ]
          }
        ]
      },
      {
        "key": "Application",
        "value": [
          {
            "key": "Biomedical and omics research",
            "value": [
              "aE5Ou0000000PMbKAM"
            ]
          },
          {
            "key": "Biopharma",
            "value": [
              "aE5Ou0000000PODKA2"
            ]
          }
        ]
      },
      {
        "key": "Market Vertical",
        "value": [
          {
            "key": "Pharma CRO",
            "value": [
              "aE5Ou0000000PPpKAM"
            ]
          },
          {
            "key": "Biopharma",
            "value": [
              "aE5Ou0000000PKzKAM",
              "aE5Ou0000000OQXKA2"
            ]
          }
        ]
      },
      {
        "key": "Instrument family",
        "value": [
          {
            "key": "ExionLC 2.0",
            "value": [
              "aE5Ou0000000PPpKAM"
            ]
          }
        ]
      },
      {
        "key": "assetType",
        "value": [
          {
            "key": "Technote",
            "value": [
              "aE5Ou0000000PPpKAM",
              "aE5Ou0000000PODKA2",
              "aE5Ou0000000PMbKAM",
              "aE5Ou0000000PKzKAM",
              "aE5Ou0000000OQXKA2"
            ]
          }
        ]
      }
    ]
  }
]
function toggleTag(asset, tagKey, tagItem) {
  // initialize state safely
  if (!tagItem.state) {
    tagItem.state = 'idle';
  }

  tagItem.state =
    tagItem.state === 'selected' ? 'idle' : 'selected';

  renderfavoriteSearchResultList(
    resourceLibraryResultClick,
    favoriteResultsList
  );

  renderFavoriteQuerySummary(favoriteResultsList);

  renderCommonFacet(
    favoriteResultsList,
    toggleAssetType,
    toggleTag
  );

  renderFavoriteFacetBreadcrumb(
    favoriteResultsList,
    toggleAssetType,
    toggleTag
  );
}


function toggleAssetType(value) {
  const wasSelected = value.state === 'selected';

  value.state = wasSelected ? 'idle' : 'selected';

  // 🔥 KEY FIX:
  // when selecting a new assetType,
  // apply already selected tags to it
  if (!wasSelected) {
    favoriteResultsList.forEach(asset => {
      if (asset !== value) {
        asset.tags?.forEach(group => {
          group.value?.forEach(tag => {
            if (tag.state === 'selected') {
              // copy this selection to new asset
              const targetGroup = value.tags?.find(g => g.key === group.key);
              const targetTag = targetGroup?.value?.find(v => v.key === tag.key);

              if (targetTag) {
                targetTag.state = 'selected';
              }
            }
          });
        });
      }
    });
  }

  // when unselecting assetType → clear its tags
  if (wasSelected) {
    value.tags?.forEach(group => {
      group.value?.forEach(tag => {
        tag.state = 'idle';
      });
    });
  }

  renderfavoriteSearchResultList(resourceLibraryResultClick, favoriteResultsList);
  renderFavoriteQuerySummary(favoriteResultsList);
  renderFavoriteFacetBreadcrumb(favoriteResultsList, toggleAssetType, toggleTag);
  renderCommonFacet(favoriteResultsList, toggleAssetType, toggleTag);
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
      renderCommonFacet(favoriteResultsList, toggleAssetType,toggleTag);
      renderFavoriteFacetBreadcrumb(favoriteResultsList, toggleAssetType,toggleTag);
    });
  } catch (error) {
    resourceLibrarySearchEngine.executeFirstSearch();
  }
}
