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
  const datass=[
    {
        "path": "/tech-notes/biopharma/improved-lc-mrm-workflow-for-quantification-of-glucagonlike-pept",
        "id": "aE5Ou0000000On7KAE",
        "title": "Improved LC-MRM workflow for quantification of glucagonlike peptide-1 analogues"
    },
    {
        "path": "/Hidden/sciexhow/Ultra-sensitive-analytical-methodology-for-the-quantification-of-11-nor-9-carboxy-THC-THC-COOH-in-oral-fluid",
        "id": "aE5Ou0000000OWzKAM",
        "title": "Ultra-sensitive analytical methodology for the quantification of 11-nor-9-carboxy-THC (THC-COOH) in oral fluid"
    },
    {
        "path": "/Hidden/sciexhow/5-4-azidomethyl-1-1-biphenyl-2yl-1H-tetrazole-AZBT-quantification",
        "id": "aE5Ou0000000OVNKA2",
        "title": "5-(4?-(azidomethyl)-[1,1?-biphenyl]-2yl)-1H-tetrazole (AZBT) quantification"
    },
    {
        "path": "/tech-notes/life-science-research/lipidomics/high-throughput-targeted-lipidomics-analysis-of-dihydroceramide-",
        "id": "aE5Ou0000000OTlKAM",
        "title": "High-throughput targeted lipidomics analysis of dihydroceramide desaturase-1 (DES1) knockout mice"
    },
    {
        "path": "/tech-notes/biopharma/streamlined-identification-and-quantitation-of-impurities-of-the",
        "id": "aE5Ou0000000OS9KAM",
        "title": "Streamlined identification and quantitation of impurities of the ionizable lipid ALC-0315 for rapid and confident vendor-to-vendor raw material assessment to ensure mRNA-LNP product quality"
    },
    {
        "path": "/tech-notes/biopharma/structural-characterization-of-the-cationic-lipid-nanoparticle-c",
        "id": "aE5Ou0000000OQXKA2",
        "title": "Structural characterization of the cationic lipid nanoparticle component, ALC-0315, and its impurities using electronactivated dissociation (EAD)-based MS/MS fragmentation"
    },
    {
        "path": "/support/knowledge-base-articles/why-do-i-get-no-hit-with-precursor-mass-tolerance-set-to-0-01-da-when-searching-sciex-libraries-in-sciex-os-software_en_us",
        "id": "aE5Ou0000000OOvKAM",
        "title": "Why Don't I get Hits when the Precursor Mass Tolerance Is Set to 0.01 Da when Searching SCIEX Libraries?"
    },
    {
        "path": "/support/knowledge-base-articles/why-do-i-get-no-hit-with-precursor-mass-tolerance-set-to-0-01-da-when-searching-sciex-libraries-in-sciex-os-software_ja",
        "id": "aE5Ou0000000ONJKA2",
        "title": "SCIEX???????????Precursor Mass Tolerance?0.01 Da?????????????????????"
    },
    {
        "path": "/support/knowledge-base-articles/change-cad-gas-settings-from-simplified-low-medium-high-to-operator-0-12-in-analyst-software_en_us",
        "id": "aE5Ou0000000OLhKAM",
        "title": "Change CAD Gas Settings from Simplified (Low, Medium, High) to Operator (0-12) in Analyst  Software"
    },
    {
        "path": "/support/knowledge-base-articles/an-if-statement-of-calculated-concentration-less-than-zero-does-not-work-for-concentrations-0-or-n-a-in-a-report-template_en_us",
        "id": "aE5Ou0000000OK5KAM",
        "title": "Reporter 3.2: How To Report Calculated Concentrations of \"<0\" or \"N/A\""
    },
    {
        "path": "/support/knowledge-base-articles/discoveryquant-quicktune-dp-0-dp-scan-problem-1443624856293_en_us",
        "id": "aE5Ou0000000Nr3KAE",
        "title": "DiscoveryQuant Quicktune DP  0 DP Scan Problem"
    }
]
  // Initialize course catalog components
  try {
    await readBlockProperties(block);
    await initializeSerachInterface(block, 'favorite-all');
    renderCommonSearchBox(resourceLibrarySearchBoxController);
    renderCommonSorting(resourceLibrarySortController);
    resourceLibrarySearchEngine.executeFirstSearch();
    resourceLibrarySearchEngine.subscribe(() => {
      renderfavoriteSearchResultList(resourceLibraryResultClick,favoriteResultsList);
      renderCommonQuerySummary(resourceLibraryQuerySummary);
      renderCommonPagination(resourceLibraryPaginationController);
      renderCommonFacet(allFacetController, facetsId, desiredOrder);
      renderCommonFacetBreadcurm(resourceLibraryFacetBreadcrumb);
    });
  } catch (error) {
    resourceLibrarySearchEngine.executeFirstSearch();
  }
}
