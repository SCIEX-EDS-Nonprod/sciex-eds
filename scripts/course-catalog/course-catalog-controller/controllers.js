/* eslint-disable */
import {
  buildSearchBox,
  buildFacet,
  buildResultList,
  buildPager,
  buildQuerySummary,
  buildSort,
  buildInteractiveResult,
  buildBreadcrumbManager
} from 'https://static.cloud.coveo.com/headless/v3/headless.esm.js';
import { courseCatalogSearchEngine }  from '../courseCatalogEngine.js';

export const courseCatalogSearchBoxController = buildSearchBox(courseCatalogSearchEngine, {
  options: {
    numberOfSuggestions: 5,
    highlightOptions: {
      notMatchDelimiters: {
        open: '<strong>',
        close: '</strong>',
      },
      correctionDelimiters: {
        open: '<i>',
        close: '</i>',
      },
    },
  },
});

export const courseCatalogResultsList = buildResultList(courseCatalogSearchEngine, {
  options: {
    fieldsToInclude: ['ogimage', 'description', 'duration', 'level', 'type'],
  },
});

export  function courseCatalogResultClick(results) {
  const interactiveResult = buildInteractiveResult(courseCatalogSearchEngine, {
    options: {result : results}
  })
  interactiveResult.select();
}

// sorting controller
export const courseCatalogSortController = buildSort(courseCatalogSearchEngine, {
  initialState: {
    criterion: { by: 'relevancy' },
  },
});

// query summary controller
export const courseCatalogQuerySummary = buildQuerySummary(courseCatalogSearchEngine);

// pagination controller
export const courseCatlogPaginationController = buildPager(courseCatalogSearchEngine);

export const courseCatalogFacetBreadcrumb = buildBreadcrumbManager(courseCatalogSearchEngine)

export const allFacetController = createFacetController();

function createFacetController() {
  const facetsId = [
    'isnewcourse',
    'coursetypecategories',
    'trainingtopiccategories',
    'techniquescategories',
    'trainingtypecategories',
    'levelcategories',
    'certificatetypecategories',
    'language',
    'massspectrometerscategories',
    'hplcandceproductscategories',
    'integratedsolutionscategories',
    'softwarecategories',
    'location',
    'capillaryelectrophoresiscategories'
  ];
  const controllerMap = new Map();
  facetsId.forEach((item) => {
   const controller = buildFacet(courseCatalogSearchEngine, {
    options: { 
      numberOfValues: 5,
      field: item,
      facetId: item,
      basePath: [],
      delimitingCharacter: '|'
    },
  });
  controllerMap.set(item,controller);
});
  return controllerMap;
}