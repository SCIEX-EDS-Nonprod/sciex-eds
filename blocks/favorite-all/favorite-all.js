import initializeSerachInterface from '../../scripts/common-components/renderUI.js';
import { resourceLibrarySearchEngine } from '../../scripts/favorite-all/favorite-allDocEngine.js';
import renderCommonSearchBox from '../../scripts/common-components/commonRenderSearchBox.js';
import {
  resourceLibrarySearchBoxController,
  resourceLibrarySortController,
  resourceLibraryResultClick,
  resourceLibraryQuerySummary,
  resourceLibraryPaginationController,
  allFacetController,
  resourceLibraryFacetBreadcrumb,
  favoriteResultsList,
} from '../../scripts/favorite-all/favorite-all-controller/favorite-allDocController.js';
import renderCommonSorting from '../../scripts/common-components/commonSorting.js';
import renderCommonQuerySummary from '../../scripts/common-components/commonQuerySummary.js';
import renderCommonPagination from '../../scripts/common-components/commonPagination.js';
import { renderCommonFacet } from '../../scripts/common-components/favorite-all-facets.js';
import renderCommonFacetBreadcurm from '../../scripts/common-components/commonFacetBreadcurm.js';
import renderfavoriteSearchResultList from '../../scripts/common-components/favoriteSearchResultList.js';

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
    let title;
    sections.forEach((section, index) => {
      switch (index + 1) {
        case 1: {
          title = section.querySelector('div');
          title.className = 'banner-title';
          lifeSciencesDiv.appendChild(title);
          block.appendChild(lifeSciencesDiv);
          break;
        }
        case 2: {
          description = section.querySelector('div');
          description.className = 'banner-description';
          lifeSciencesDiv.appendChild(description);
          block.appendChild(lifeSciencesDiv);
          break;
        }
        case 3: {
          const picture = main.querySelector('picture');
          if (picture) {
            coveoNoResultsDiv.appendChild(picture);
          }
          break;
        }
        case 4: {
          const noResultsText1 = section.querySelector('div');
          noResultsText1.id = 'noresults-text1';
          noResultsText1.setAttribute('data-text1', noResultsText1.textContent);
          coveoNoResultsDiv.appendChild(noResultsText1);
          break;
        }
        case 5: {
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

  // Extract unique assetTypes from data array
  const data=[
  {
    "assetType": "Knowledge base article",
    "pageData": [
      {
        "path": "/support/knowledge-base-articles/discoveryquant-quicktune-dp-0-dp-scan-problem-1443624856293_en_us",
        "id": "aE5Ou0000000Nr3KAE",
        "title": "DiscoveryQuant Quicktune DP  0 DP Scan Problem",
        "description": "Using DiscoveryQuant 2.1.3 Quick Tune will set the DP value to 0 and then Fine Tune will fail as it has an invalid DP value.  The temporary Q3 MI scan method for the quicktune will show the MH ion with 2 DP scans both at 200v though this voltage may vary."
      }
    ],
    "tags": {
      "market-vertical": [
        "Pharma CRO"
      ],
      "software": [
        "DiscoveryQuant software"
      ],
      "language": [
        "English"
      ],
      "assetType": [
        "Knowledge base article"
      ]
    }
  },
  {
    "assetType": "SCIEX How",
    "pageData": [
      {
        "path": "/Hidden/sciexhow/LC-MS-MS-Rapid-Quantitation-and-Screening-Method-for-222-Pesticide-Residues-in-Tea",
        "id": "aE5Ou0000000OvBKAU",
        "title": "LC-MS/MS Rapid Quantitation and Screening Method for 222 Pesticide Residues in Tea",
        "description": "China is the world’s home of tea and is the first country in the world to discover, cultivate, make and drink tea. However, driven by profit, the tea crisis is becoming increasingly important. This is mainly highlighted by the “poisoning” of tea quality. This application note focuses on the problem of pesticide residues in tea. On the SCIEX Triple Quad 3500 System, a rapid screening method of 222 pesticides has been established to provide a simple and quick solution to the problem of pesticide residues in tea."
      },
      {
        "path": "/Hidden/sciexhow/Ultra-sensitive-analytical-methodology-for-the-quantification-of-11-nor-9-carboxy-THC-THC-COOH-in-oral-fluid",
        "id": "aE5Ou0000000OtZKAU",
        "title": "Ultra-sensitive analytical methodology for the quantification of 11-nor-9-carboxy-THC (THC-COOH) in oral fluid",
        "description": "In recent years, oral fluid has gained considerable attention as a quicker and less invasive means of monitoring cannabis use. More specifically, the use of this matrix for drug testing benefits from ease of sampling, observed collection and difficulty of sample adulteration. Here we demonstrate the key advantages of the SCIEX Triple Quad 7500 System – QTRAP Ready for sensitive detection of THC-COOH in oral fluid."
      },
      {
        "path": "/Hidden/sciexhow/5-4-azidomethyl-1-1-biphenyl-2yl-1H-tetrazole-AZBT-quantification",
        "id": "aE5Ou0000000OrxKAE",
        "title": "5-(4’-(azidomethyl)-[1,1’-biphenyl]-2yl)-1H-tetrazole (AZBT) quantification",
        "description": "5-(4’-(azidomethyl)-[1,1’-biphenyl]-2yl)-1H-tetrazole (AZBT) is a known impurity found in sartan medications and there is some concern that AZBT could act as a mutagen. Here, an assay has been developed for the sensitive detection of the AZBT impurity in an irbesartan drug substance and a candesartan drug product using the QTRAP 4500 system. Excellent sensitivity was achieved with lower limits of quantification of 0.5 ng/mL which is well below the threshold of toxicological concern (TTC) for these drugs. With a total run time of 8 minutes, this robust method provides require sensitivity, linearity and recovery for assessing levels in APIs and drug products."
      }
    ],
    "tags": {
      "application": [
        "Food and beverage testing",
        "Forensic testing",
        "Pharma"
      ],
      "language": [
        "English",
        "English",
        "English"
      ],
      "mass-spec": [
        "Triple Quad 3500",
        "Triple Quad 7500",
        "Triple Quad 4500"
      ],
      "assetType": [
        "SCIEX How",
        "SCIEX How",
        "SCIEX How"
      ]
    }
  },
  {
    "assetType": "Webinar",
    "pageData": [
      {
        "path": "/events/virtual-2020-global-cesi-ms-symposium",
        "id": "aE5Ou0000000P1dKAE",
        "title": "Innovations in proteomics discovery and small molecule/quant",
        "description": ""
      },
      {
        "path": "/events/determination-of-empty-full-ratio",
        "id": "aE5Ou0000000P01KAE",
        "title": "Determination of empty full ratio",
        "description": ""
      },
      {
        "path": "/events/scanning-swath-acquisition-proteomics-done-fast-and-what-to-do-with-it",
        "id": "aE5Ou0000000OwnKAE",
        "title": "Scanning SWATH® Acquisition: Proteomics done fast - and what to do with it",
        "description": ""
      },
      {
        "path": "/events/asmsreboot",
        "id": "aE5Ou0000000OyPKAU",
        "title": "ASMSreboot",
        "description": ""
      }
    ],
    "tags": {
      "software": [
        "SWATH Acquisition",
        "SWATH Acquisition"
      ],
      "application": [
        "Biomedical and omics research",
        "Biomedical and omics research",
        "Biomedical and omics research",
        "Biomedical and omics research"
      ],
      "year": [
        "2020"
      ],
      "language": [
        "English",
        "English",
        "English",
        "English"
      ],
      "events": [
        "Webinar",
        "Webinar",
        "Webinar",
        "Webinar",
        "Online"
      ],
      "assetType": [
        "Webinar",
        "Webinar",
        "Webinar",
        "Webinar"
      ]
    }
  },
  {
    "assetType": "Technote",
    "pageData": [
      {
        "path": "/tech-notes/biopharma/structural-characterization-of-the-cationic-lipid-nanoparticle-c",
        "id": "aE5Ou0000000OQXKA2",
        "title": "Structural characterization of the cationic lipid nanoparticle component, ALC-0315, and its impurities using electronactivated dissociation (EAD)-based MS/MS fragmentation",
        "description": ""
      }
    ],
    "tags": {
      "market-vertical": [
        "Biopharma"
      ],
      "language": [
        "English"
      ],
      "mass-spec": [
        "ZenoTOF 7600 system"
      ],
      "assetType": [
        "Technote"
      ]
    }
  }
]
  // Get unique assetTypes from data array
  const assetTypes = [...new Set(favoriteResultsList.map(item => item.assetType))];
  let selectedAssetTypes = [];

  // Initialize course catalog components
  try {
    await readBlockProperties(block);
    await initializeSerachInterface(block, 'favorite-all');
    renderCommonSearchBox(resourceLibrarySearchBoxController);
    renderCommonSorting(resourceLibrarySortController);
    resourceLibrarySearchEngine.executeFirstSearch();
    resourceLibrarySearchEngine.subscribe(() => {
      // Filter data based on selected assetTypes (multiple)
      const filteredData = selectedAssetTypes.length > 0
        ? favoriteResultsList.filter(item => selectedAssetTypes.includes(item.assetType))
        : favoriteResultsList;
      
      // Flatten the filtered data for display
      const flattenedData = filteredData.flatMap((group) =>
        Array.isArray(group.pageData)
          ? group.pageData.map((item) => ({
              ...item,
              assetType: group.assetType,
            }))
          : []
      );
      
      renderfavoriteSearchResultList(resourceLibraryResultClick, filteredData);
      renderCommonQuerySummary(flattenedData);
      renderCommonPagination(flattenedData);
      renderCommonFacet(assetTypes, favoriteResultsList, (selected) => {
        selectedAssetTypes = selected;
        const newFilteredData = selected.length > 0 
          ? favoriteResultsList.filter(item => selected.includes(item.assetType)) 
          : favoriteResultsList;
        
        // Flatten the new filtered data
        const newFlattenedData = newFilteredData.flatMap((group) =>
          Array.isArray(group.pageData)
            ? group.pageData.map((item) => ({
                ...item,
                assetType: group.assetType,
              }))
            : []
        );
        
        renderfavoriteSearchResultList(resourceLibraryResultClick, newFilteredData);
        renderCommonQuerySummary(newFlattenedData);
        renderCommonPagination(newFlattenedData);
      });
      renderCommonFacetBreadcurm(resourceLibraryFacetBreadcrumb);
    });
  } catch (error) {
    resourceLibrarySearchEngine.executeFirstSearch();
  }
}
