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
    "pageData": [
      {
        "path": "/support/knowledge-base-articles/change-cad-gas-settings-from-simplified-low-medium-high-to-operator-0-12-in-analyst-software_en_us",
        "id": "aE5Ou0000000P6TKAU",
        "title": "Change CAD Gas Settings from Simplified (Low, Medium, High) to Operator (0-12) in Analyst® Software",
        "description": "The default setting of CAD gas in Analyst® software is “Simplified” and only allows to adjust CAD gas in three steps (low, medium, high). Switching to “Operator” allows to use values from 0 to 12 which enables a more efficient optimization of this parameter for MS/MS and LIT experiments.",
        "relatedProducts": [
          "Analyst software",
          "Knowledge base article"
        ]
      },
      {
        "path": "/support/knowledge-base-articles/an-if-statement-of-calculated-concentration-less-than-zero-does-not-work-for-concentrations-0-or-n-a-in-a-report-template_en_us",
        "id": "aE5Ou0000000P4rKAE",
        "title": "Reporter 3.2: How To Report Calculated Concentrations of \"\u003C0\" or \"N/A\"",
        "description": "If a MultiQuant™ or Analyst® software results table contains values of \"\u003C0\" and \"N/A\" for some calculated concentration values, these text values must be converted to a numerical zero value first using an Excel query.  These calculated concentration values cannot be filtered into a Reporter Template Suite 3.2 results template using an if statement that selects for calculated concentration values that are less than or equal to zero.",
        "relatedProducts": [
          "English",
          "Software",
          "Knowledge base article"
        ]
      },
      {
        "path": "/support/knowledge-base-articles/discoveryquant-quicktune-dp-0-dp-scan-problem-1443624856293_en_us",
        "id": "aE5Ou0000000Nr3KAE",
        "title": "DiscoveryQuant Quicktune DP  0 DP Scan Problem",
        "description": "Using DiscoveryQuant 2.1.3 Quick Tune will set the DP value to 0 and then Fine Tune will fail as it has an invalid DP value.  The temporary Q3 MI scan method for the quicktune will show the MH ion with 2 DP scans both at 200v though this voltage may vary.",
        "relatedProducts": [
          "Pharma CRO",
          "DiscoveryQuant software",
          "Knowledge base article",
          "English"
        ]
      }
    ],
    "tags": [
      {
        "key": "market-vertical",
        "value": [
          {
            "key": "Pharma CRO",
            "value": [
              "aE5Ou0000000Nr3KAE"
            ]
          }
        ]
      },
      {
        "key": "software",
        "value": [
          {
            "key": "Analyst software",
            "value": [
              "aE5Ou0000000P6TKAU"
            ]
          },
          {
            "key": "DiscoveryQuant software",
            "value": [
              "aE5Ou0000000Nr3KAE"
            ]
          }
        ]
      },
      {
        "key": "language",
        "value": [
          {
            "key": "English",
            "value": [
              "aE5Ou0000000P4rKAE",
              "aE5Ou0000000Nr3KAE"
            ]
          }
        ]
      },
      {
        "key": "products",
        "value": [
          {
            "key": "Software",
            "value": [
              "aE5Ou0000000P4rKAE"
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
    "pageData": [
      {
        "path": "/Hidden/sciexhow/Analysis-Method-for-51-Pesticides-in-Vegetables-and-Fruit1",
        "id": "aE5Ou0000000P4sKAE",
        "title": "Analysis Method for 51 Pesticides in Vegetables and Fruit",
        "description": "To ensure public health and safety, many government agencies establish routine monitoring systems for pesticide residues in agricultural products such as vegetables and fruits. Many of these residues are amenable to LC-MS/MS analysis. The method developed here can be used to simultaneously analyze 51 pesticide residues that are routinely monitored by many health agencies.",
        "relatedProducts": [
          "SCIEX How",
          "Triple Quad 3500",
          "Food and beverage testing",
          "English"
        ]
      },
      {
        "path": "/Hidden/sciexhow/analysis-of-pfas-in-drinking-water-with-epa-method-5371-and-the-sciex-qtrap-4500-system",
        "id": "aE5Ou0000000PJNKA2",
        "title": "Analysis of PFAS in Drinking Water with EPA Method 537.1 and the SCIEX QTRAP 4500 System",
        "description": "Using the SCIEX QTRAP 4500 System, EPA Method 537.1 was used for the analysis of a suite of 14 per- and polyfluorinated  substances (PFAS)  in drinking water.",
        "relatedProducts": [
          "SCIEX How",
          "English"
        ]
      },
      {
        "path": "/Hidden/sciexhow/Simultaneous-quantification-of-trimethylamine-oxide-and-its-precursors-from-gut-microbial-metabolic-pathway-Using-the-QTRAP-4500MD-system",
        "id": "aE5Ou0000000PHlKAM",
        "title": "Simultaneous quantification of trimethylamine oxide and its precursors from gut microbial metabolic pathway Using the QTRAP 4500MD system",
        "description": "A method for rapid quantification of TMAO, betaine, L-carnitine, acetyl-carnitine, and choline in plasma has been developed on the QTRAP 4500MD system. This method has the advantages of high specificity, linearity, and high accuracy. As shown, this method is suitable to support rapid monitoring of TMAO metabolites:\r\n• Rapid 5.5-minute run time provided good peak separation for detection in a shorter run time than several recently published methods for faster screening.\r\n• Consistent quantification results were obtained for all standards tested, with correlation coefficients ranging from 0.991 to 0.999\r\n• Inter- and intra-day reproducibility and accuracy meet standard bioanalytical requirements of %CV less than ≤ 15% in for all analytes analyzed in plasma\r\n• Method was evaluated in plasma matrix using a simple extraction protocol and good signal/noise was observed.",
        "relatedProducts": [
          "SCIEX How",
          "Triple Quad 4500",
          "Pharma",
          "English"
        ]
      },
      {
        "path": "/Hidden/sciexhow/Significant-sensitivity-increases-provides-30-more-polar-metabolites-quantified-in-plasma",
        "id": "aE5Ou0000000PG9KAM",
        "title": "Significant sensitivity increases provides 30% more polar metabolites quantified in plasma",
        "description": "A targeted LC-MS/MS assay with MRM transitions for over 450 metabolites was used to assess the impact of added sensitivity on the detection and quantification of metabolites in plasma. Using a generic reversed-phase chromatography method and operating the MS systems in both positive and negative polarity modes to obtain broad coverage, a similar method was run on three separate QTRAP 6500+ systems and as well as three separate SCIEX 7500 systems under independent lab settings.",
        "relatedProducts": [
          "SCIEX How",
          "Biopharma",
          "Triple Quad 7500",
          "English"
        ]
      },
      {
        "path": "/Hidden/sciexhow/LC-MS-MS-Rapid-Quantification-and-Screening-Method-for-30-Mycotoxins-in-Animal-Feed",
        "id": "aE5Ou0000000PEXKA2",
        "title": "LC-MS/MS Rapid Quantification and Screening Method for 30 Mycotoxins in Animal Feed",
        "description": "In recent years, animal mycotoxin poisoning incidents have occurred frequently in China and around the world, causing huge economic losses to the agriculture industry. This work focuses on the detection of mycotoxins in animal feed. On the SCIEX Triple Quad 3500 System, a rapid determination method of 30 mycotoxins was established. This method provides a simple and quick solution for the detection of mycotoxins in the feed.",
        "relatedProducts": [
          "SCIEX How",
          "Food and beverage testing",
          "Triple Quad 3500",
          "English"
        ]
      },
      {
        "path": "/Hidden/sciexhow/LC-MS-MS-Rapid-Quantitation-and-Screening-Method-for-222-Pesticide-Residues-in-Tea",
        "id": "aE5Ou0000000OvBKAU",
        "title": "LC-MS/MS Rapid Quantitation and Screening Method for 222 Pesticide Residues in Tea",
        "description": "China is the world’s home of tea and is the first country in the world to discover, cultivate, make and drink tea. However, driven by profit, the tea crisis is becoming increasingly important. This is mainly highlighted by the “poisoning” of tea quality. This application note focuses on the problem of pesticide residues in tea. On the SCIEX Triple Quad 3500 System, a rapid screening method of 222 pesticides has been established to provide a simple and quick solution to the problem of pesticide residues in tea.",
        "relatedProducts": [
          "SCIEX How",
          "Food and beverage testing",
          "Triple Quad 3500",
          "English"
        ]
      },
      {
        "path": "/Hidden/sciexhow/Ultra-sensitive-analytical-methodology-for-the-quantification-of-11-nor-9-carboxy-THC-THC-COOH-in-oral-fluid",
        "id": "aE5Ou0000000OtZKAU",
        "title": "Ultra-sensitive analytical methodology for the quantification of 11-nor-9-carboxy-THC (THC-COOH) in oral fluid",
        "description": "In recent years, oral fluid has gained considerable attention as a quicker and less invasive means of monitoring cannabis use. More specifically, the use of this matrix for drug testing benefits from ease of sampling, observed collection and difficulty of sample adulteration. Here we demonstrate the key advantages of the SCIEX Triple Quad 7500 System – QTRAP Ready for sensitive detection of THC-COOH in oral fluid.",
        "relatedProducts": [
          "SCIEX How",
          "Forensic testing",
          "Triple Quad 7500",
          "English"
        ]
      }
    ],
    "tags": [
      {
        "key": "application",
        "value": [
          {
            "key": "Forensic testing",
            "value": [
              "aE5Ou0000000OtZKAU"
            ]
          },
          {
            "key": "Pharma",
            "value": [
              "aE5Ou0000000PHlKAM"
            ]
          },
          {
            "key": "Food and beverage testing",
            "value": [
              "aE5Ou0000000P4sKAE",
              "aE5Ou0000000PEXKA2",
              "aE5Ou0000000OvBKAU"
            ]
          },
          {
            "key": "Biopharma",
            "value": [
              "aE5Ou0000000PG9KAM"
            ]
          }
        ]
      },
      {
        "key": "language",
        "value": [
          {
            "key": "English",
            "value": [
              "aE5Ou0000000P4sKAE",
              "aE5Ou0000000PJNKA2",
              "aE5Ou0000000PHlKAM",
              "aE5Ou0000000PG9KAM",
              "aE5Ou0000000PEXKA2",
              "aE5Ou0000000OvBKAU",
              "aE5Ou0000000OtZKAU"
            ]
          }
        ]
      },
      {
        "key": "mass-spec",
        "value": [
          {
            "key": "Triple Quad 7500",
            "value": [
              "aE5Ou0000000PG9KAM",
              "aE5Ou0000000OtZKAU"
            ]
          },
          {
            "key": "Triple Quad 3500",
            "value": [
              "aE5Ou0000000P4sKAE",
              "aE5Ou0000000PEXKA2",
              "aE5Ou0000000OvBKAU"
            ]
          },
          {
            "key": "Triple Quad 4500",
            "value": [
              "aE5Ou0000000PHlKAM"
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
              "aE5Ou0000000P4sKAE",
              "aE5Ou0000000PJNKA2",
              "aE5Ou0000000PHlKAM",
              "aE5Ou0000000PG9KAM",
              "aE5Ou0000000PEXKA2",
              "aE5Ou0000000OvBKAU",
              "aE5Ou0000000OtZKAU"
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
        "path": "/events/no-pressure-hplc",
        "id": "aE5Ou0000000PT3KAM",
        "title": "No Pressure HPLC",
        "description": "",
        "relatedProducts": [
          "Webinar",
          "Biomedical and omics research",
          "English"
        ]
      },
      {
        "path": "/events/determination-of-empty-full-ratio",
        "id": "aE5Ou0000000P86KAE",
        "title": "Determination of empty full ratio",
        "description": "",
        "relatedProducts": [
          "Webinar",
          "SWATH Acquisition",
          "Biomedical and omics research",
          "English"
        ]
      },
      {
        "path": "/events/virtual-2020-global-cesi-ms-symposium",
        "id": "aE5Ou0000000P1dKAE",
        "title": "Innovations in proteomics discovery and small molecule/quant",
        "description": "",
        "relatedProducts": [
          "Webinar",
          "Biomedical and omics research",
          "English"
        ]
      },
      {
        "path": "/events/scanning-swath-acquisition-proteomics-done-fast-and-what-to-do-with-it",
        "id": "aE5Ou0000000OwnKAE",
        "title": "Scanning SWATH® Acquisition: Proteomics done fast - and what to do with it",
        "description": "",
        "relatedProducts": [
          "Webinar",
          "SWATH Acquisition",
          "Biomedical and omics research",
          "English"
        ]
      }
    ],
    "tags": [
      {
        "key": "software",
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
        "key": "application",
        "value": [
          {
            "key": "Biomedical and omics research",
            "value": [
              "aE5Ou0000000PT3KAM",
              "aE5Ou0000000P86KAE",
              "aE5Ou0000000P1dKAE",
              "aE5Ou0000000OwnKAE"
            ]
          }
        ]
      },
      {
        "key": "language",
        "value": [
          {
            "key": "English",
            "value": [
              "aE5Ou0000000PT3KAM",
              "aE5Ou0000000P86KAE",
              "aE5Ou0000000P1dKAE",
              "aE5Ou0000000OwnKAE"
            ]
          }
        ]
      },
      {
        "key": "events",
        "value": [
          {
            "key": "Webinar",
            "value": [
              "aE5Ou0000000PT3KAM",
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
              "aE5Ou0000000PT3KAM",
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
        "path": "/tech-notes/pharma/discovery/confident-identification-of-phase-1-metabolites-using-electron-a",
        "id": "aE5Ou0000000PRRKA2",
        "title": "Confident identification of phase 1 metabolites using electron-activated dissociation (EAD)",
        "description": "",
        "relatedProducts": [
          "Technote",
          "Pharma CRO",
          "ZenoTOF 7600 system",
          "ExionLC",
          "English"
        ]
      },
      {
        "path": "/tech-notes/pharma/bioanalysis-pk/low-ng-ml-quantitation-of-glucagon-like-peptide-1--glp-1--analog",
        "id": "aE5Ou0000000PPpKAM",
        "title": "Low-ng/mL quantitation of glucagon-like peptide-1 (GLP-1) analog in rat plasma",
        "description": "",
        "relatedProducts": [
          "Technote",
          "English",
          "Triple Quad 7500",
          "ExionLC 2.0",
          "Pharma CRO"
        ]
      },
      {
        "path": "/tech-notes/biopharma/improved-lc-mrm-workflow-for-quantification-of-glucagonlike-pept",
        "id": "aE5Ou0000000PODKA2",
        "title": "Improved LC-MRM workflow for quantification of glucagonlike peptide-1 analogues",
        "description": "",
        "relatedProducts": [
          "ExionLC",
          "Biopharma",
          "Technote",
          "Triple Quad 7500",
          "English"
        ]
      },
      {
        "path": "/tech-notes/life-science-research/lipidomics/high-throughput-targeted-lipidomics-analysis-of-dihydroceramide-",
        "id": "aE5Ou0000000PMbKAM",
        "title": "High-throughput targeted lipidomics analysis of dihydroceramide desaturase-1 (DES1) knockout mice",
        "description": "Previously a targeted lipid profiling method was developed for quantifying a many lipid molecular species (~1500) in a single run. To determine the performance of the method in biological matrices, a short feasibility study was done here using LC-MSM on the QTRAP 6500+ system. Using well characterized DES1 knockout mouse model, the expected changes in ceramides and dihydroceramides were observed. Many lipid classes were not found to be changing (17 classes) relative to the control.",
        "relatedProducts": [
          "Technote",
          "Biomedical and omics research",
          "Triple Quad 7500",
          "Triple Quad 6500+",
          "QTRAP 6500+",
          "QTRAP systems",
          "English"
        ]
      },
      {
        "path": "/tech-notes/biopharma/streamlined-identification-and-quantitation-of-impurities-of-the",
        "id": "aE5Ou0000000PKzKAM",
        "title": "Streamlined identification and quantitation of impurities of the ionizable lipid ALC-0315 for rapid and confident vendor-to-vendor raw material assessment to ensure mRNA-LNP product quality",
        "description": "",
        "relatedProducts": [
          "Technote",
          "English",
          "ZenoTOF 7600",
          "Biopharma"
        ]
      },
      {
        "path": "/tech-notes/biopharma/structural-characterization-of-the-cationic-lipid-nanoparticle-c",
        "id": "aE5Ou0000000OQXKA2",
        "title": "Structural characterization of the cationic lipid nanoparticle component, ALC-0315, and its impurities using electronactivated dissociation (EAD)-based MS/MS fragmentation",
        "description": "",
        "relatedProducts": [
          "Technote",
          "Biopharma",
          "ZenoTOF 7600 system",
          "English"
        ]
      }
    ],
    "tags": [
      {
        "key": "market-vertical",
        "value": [
          {
            "key": "Pharma CRO",
            "value": [
              "aE5Ou0000000PRRKA2",
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
        "key": "application",
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
        "key": "instrument-family",
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
        "key": "language",
        "value": [
          {
            "key": "English",
            "value": [
              "aE5Ou0000000PRRKA2",
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
        "key": "mass-spec",
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
            "key": "QTRAP systems",
            "value": [
              "aE5Ou0000000PMbKAM"
            ]
          },
          {
            "key": "ZenoTOF 7600 system",
            "value": [
              "aE5Ou0000000PRRKA2",
              "aE5Ou0000000OQXKA2"
            ]
          },
          {
            "key": "QTRAP 6500+",
            "value": [
              "aE5Ou0000000PMbKAM"
            ]
          },
          {
            "key": "ZenoTOF 7600",
            "value": [
              "aE5Ou0000000PKzKAM"
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
        "key": "hplc",
        "value": [
          {
            "key": "ExionLC",
            "value": [
              "aE5Ou0000000PRRKA2",
              "aE5Ou0000000PODKA2"
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
              "aE5Ou0000000PRRKA2",
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
