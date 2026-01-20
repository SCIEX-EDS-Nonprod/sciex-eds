/* eslint-disable */
import {
    buildSearchBox,
    buildFacet,
    buildResultList,
    buildPager,
    buildQuerySummary,
    buildSort,
    buildInteractiveResult,
    buildBreadcrumbManager,
    buildContext
  } from 'https://static.cloud.coveo.com/headless/v3/headless.esm.js';
  import { resourceLibrarySearchEngine, coveoSearchEngine, resultsFetcher }  from '../favorite-allDocEngine.js';
  
  export const resourceLibrarySearchBoxController = buildSearchBox(coveoSearchEngine, {
    options: {
      numberOfSuggestions: 5,
      highlightOptions: {
        notMatchDelimiters: {
          open: '<strong>',
          close: '</strong>&nbsp;',
        },
        correctionDelimiters: {
          open: '<i>',
          close: '</i>&nbsp;',
        },
      },
    },
  });
  
  export const resourceLibraryResultsList = {
    results: () => resultsFetcher.getResults(),
    isLoading: () => false,
  };
  
  export function resourceLibraryResultClick(result) {
    console.log('Result clicked:', result);
    if (result.path) {
      window.location.href = result.path;
    }
  }
  
  // sorting controller
  export const resourceLibrarySortController = buildSort(coveoSearchEngine, {
    initialState: {
      criterion: { by: 'relevancy' },
    },
  });
  
  // query summary controller
  export const resourceLibraryQuerySummary = buildQuerySummary(coveoSearchEngine);
  
  // pagination controller
  export const resourceLibraryPaginationController = buildPager(coveoSearchEngine);
  
  export const resourceLibraryFacetBreadcrumb = buildBreadcrumbManager(coveoSearchEngine)
  
  // Context variable controller
  const context = buildContext(coveoSearchEngine)
  context.add('host', window.location.origin);
  let lang = document.documentElement.lang
  context.add('locale', lang || 'en-US');
  
  export const allFacetController = createFacetController();
  
  function createFacetController() {
    const facetsId = [
      'assettypes',
      'applications',
      'massspectrometerscategories',
      'capillaryelectrophoresiscategories',
      'hplcandceproductscategories',
      'integratedsolutionscategories',
      'softwarecategories',
      'standardsandreagentscategories',
      'language'
    ];
    const controllerMap = new Map();
    facetsId.forEach((item) => {
     const controller = buildFacet(coveoSearchEngine, {
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