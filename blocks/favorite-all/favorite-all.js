/* eslint-disable */

import renderCommonSorting from '../../scripts/common-components/commonSorting.js';

import {
  resourceLibrarySortController,
  resourceLibraryResultClick,
} from '../../scripts/favorite-all/favorite-all-controller/favorite-allDocController.js';

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
  bannerWrapper.id = 'coveo-life-sciences';

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
        div.className = 'banner-title';
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
 const favoriteResultsList =[
  {
    "assetType": "Knowledge base article",
    "pageData": [
      {
        "path": "/support/knowledge-base-articles/why-do-i-get-no-hit-with-precursor-mass-tolerance-set-to-0-01-da-when-searching-sciex-libraries-in-sciex-os-software_en_us",
        "id": "aE5Ou0000000QAbKAM",
        "title": "Why Don't I get Hits when the Precursor Mass Tolerance Is Set to 0.01 Da when Searching SCIEX Libraries?",
        "created": "2020-12-15",
        "description": "Searches of SCIEX libraries with the precursor mass tolerance set to 0.01 Da may not yield any hits. This is due to the fact that some of SCIEX libraries contain spectra that were acquired with inaccurate precursor m/z.",
        "relatedProducts": [
          {
            "title": "SCIEX OS software",
            "href": "/content/SCIEX/na/us/en/products/software/sciex-os-software"
          }
        ]
      },
      {
        "path": "/support/knowledge-base-articles/discoveryquant-quicktune-dp-0-dp-scan-problem-1443624856293_en_us",
        "id": "aE5Ou0000000Q0vKAE",
        "title": "DiscoveryQuant Quicktune DP  0 DP Scan Problem",
        "created": "2020-12-15",
        "description": "Using DiscoveryQuant 2.1.3 Quick Tune will set the DP value to 0 and then Fine Tune will fail as it has an invalid DP value.  The temporary Q3 MI scan method for the quicktune will show the MH ion with 2 DP scans both at 200v though this voltage may vary.",
        "relatedProducts": [
          {
            "title": "DiscoveryQuant software",
            "href": "/content/SCIEX/na/us/en/products/software/discoveryquant-software"
          }
        ]
      }
    ],
    "tags": [
      {
        "key": "Language",
        "value": [
          {
            "key": "English",
            "value": [
              "aE5Ou0000000Q0vKAE"
            ]
          }
        ]
      },
      {
        "key": "Software",
        "value": [
          {
            "key": "SCIEX OS software",
            "value": [
              "aE5Ou0000000QAbKAM"
            ]
          },
          {
            "key": "DiscoveryQuant software",
            "value": [
              "aE5Ou0000000Q0vKAE"
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
              "aE5Ou0000000Q0vKAE"
            ]
          }
        ]
      },
      {
        "key": "assetType",
        "value": [
          {
            "key": "Knowledge base article",
            "value": [
              "aE5Ou0000000QAbKAM",
              "aE5Ou0000000Q0vKAE"
            ]
          }
        ]
      }
    ]
  },
  {
    "assetType": "SCIEX How",
    "pageData": [
      {
        "path": "/Hidden/sciexhow/analysis-of-pfas-in-drinking-water-with-epa-method-5371-and-the-sciex-qtrap-4500-system",
        "id": "aE5Ou0000000PJNKA2",
        "title": "Analysis of PFAS in Drinking Water with EPA Method 537.1 and the SCIEX QTRAP 4500 System",
        "created": "2021-01-19",
        "description": "Using the SCIEX QTRAP 4500 System, EPA Method 537.1 was used for the analysis of a suite of 14 per- and polyfluorinated  substances (PFAS)  in drinking water.",
        "relatedProducts": []
      },
      {
        "path": "/Hidden/sciexhow/LC-MS-MS-Rapid-Quantification-and-Screening-Method-for-30-Mycotoxins-in-Animal-Feed",
        "id": "aE5Ou0000000PEXKA2",
        "title": "LC-MS/MS Rapid Quantification and Screening Method for 30 Mycotoxins in Animal Feed",
        "created": "2021-07-12",
        "description": "In recent years, animal mycotoxin poisoning incidents have occurred frequently in China and around the world, causing huge economic losses to the agriculture industry. This work focuses on the detection of mycotoxins in animal feed. On the SCIEX Triple Quad 3500 System, a rapid determination method of 30 mycotoxins was established. This method provides a simple and quick solution for the detection of mycotoxins in the feed.",
        "relatedProducts": [
          {
            "title": "Triple Quad 3500",
            "href": "/content/SCIEX/na/us/en/products/mass-spectrometers/triple-quad-systems/triple-quad-3500-system"
          }
        ]
      },
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
              "aE5Ou0000000PEXKA2",
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
              "aE5Ou0000000PJNKA2",
              "aE5Ou0000000PEXKA2",
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
              "aE5Ou0000000PEXKA2",
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
              "aE5Ou0000000PJNKA2",
              "aE5Ou0000000PEXKA2",
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
    { "key": "Webinar_1", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_2", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_3", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_4", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_5", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_6", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_7", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_8", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_9", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_10", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },

    { "key": "Webinar_11", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_12", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_13", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_14", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_15", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_16", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_17", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_18", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_19", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] },
    { "key": "Webinar_20", "value": ["aE5Ou0000000P86KAE", "aE5Ou0000000P1dKAE", "aE5Ou0000000OwnKAE"] }
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

/* ======================================================
   RENDER HELPERS
====================================================== */
async function renderUi() {
  renderfavoriteSearchResultList(
    resourceLibraryResultClick,
    favoriteResultsList
  );
  renderFavoriteQuerySummary(favoriteResultsList);
  renderCommonFacet(favoriteResultsList, toggleAssetType, toggleTag);
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

/* ======================================================
   DECORATE
====================================================== */
export default async function decorate(block) { 

  try {
    await readBlockProperties(block);
    await initializefavoriteSearchInterface(block, 'favorite-all');
    renderCommonSorting(resourceLibrarySortController);
    renderUi();
  } catch (err) {
    // fail silently (current behavior preserved)
    console.error(err);
  }
}
