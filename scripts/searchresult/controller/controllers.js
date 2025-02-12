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
} from 'https://static.cloud.coveo.com/headless/v3/headless.esm.js';
import { searchEngine, analyticsEngine }  from '../engine.js';

export const searchBoxController = buildSearchBox(searchEngine, {
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

export const headlessResultsList = buildResultList(searchEngine, {
  options: {
    fieldsToInclude: ['ogimage'],
  },
});

// category facets controller
export const tagsFacetController = buildFacet(searchEngine, {
  options: { 
    numberOfValues: 5,
    field: 'coursecatalog'
  },
});

export const sourceFacetController = buildFacet(searchEngine, {
  options: { 
    numberOfValues: 5,
    field: 'massspectrometerscategories' 
  },
});
export const softwareFacetController = buildFacet(searchEngine, {
  options: { 
    numberOfValues: 5,
    field: 'softwarecategories' 
  },
});
export const techniquesFacetController = buildFacet(searchEngine, {
  options: { 
    numberOfValues: 5,
    field: 'techniquescategories' 
  },
});
export const diagnosticsFacetController = buildFacet(searchEngine, {
  options: { 
    numberOfValues: 5,
    field: 'diagnosticsinstrumentscategories' 
  },
});
export const trainingFacetController = buildFacet(searchEngine, {
  options: { 
    numberOfValues: 5,
    field: 'trainingtopiccategories' 
  },
});
export const hplcFacetController = buildFacet(searchEngine, {
  options: { 
    numberOfValues: 5,
    field: 'hplcandceproductscategories' 
  },
});


export const filetypeFacetController = buildFacet(searchEngine, {
  options: { 
    numberOfValues: 5,
    field: 'filetype' 
  },
});

// pagination controller
export const paginationController = buildPager(searchEngine);

// query summary controller
export const querySummary = buildQuerySummary(searchEngine);

// sorting controller
export const sortController = buildSort(searchEngine, {
  initialState: {
    criterion: { by: 'relevancy' },
  },
});

export const facetBreadcrumb = buildBreadcrumbManager(searchEngine)

export  function handleResultClick(results) {
  const interactiveResult = buildInteractiveResult(analyticsEngine, {
    options: {result : results}
  })
  interactiveResult.select();
}
