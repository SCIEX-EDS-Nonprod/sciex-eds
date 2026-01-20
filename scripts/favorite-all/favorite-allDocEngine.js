/* eslint-disable */
import { buildSearchEngine } from 'https://static.cloud.coveo.com/headless/v3/headless.esm.js';

let accessToken = '';
let organizationId = '';

let mainDiv = document.querySelector('main');
const sections = mainDiv.querySelector('.favorite-all').children;
Array.from(sections).forEach((section, index) => {
  const iteration = index + 1;
  if(iteration === 5){
    organizationId = section.querySelector('div').innerText;
  } else if(iteration === 6){
    accessToken = section.querySelector('div').innerText;
  }
});

// Coveo engine for facets
export const coveoSearchEngine = buildSearchEngine({
  configuration: {
    organizationId: organizationId,
    accessToken: accessToken,
    search: {
      searchHub: 'SCIEXResourceLibraryListing',
    },
    analytics: {
      analyticsMode: 'next',
      trackingId: 'sciex_us'
    },
  },
});

// Custom results fetcher from new endpoint
class ResultsFetcher {
  constructor() {
    this.listeners = [];
    this.results = [];
    this.query = '';
  }

  async executeFirstSearch() {
    await this.search('');
  }

  async search(query) {
    this.query = query;
    try {
      const endpoint = 'https://devcs.sciex.com/bin/sciex/get-favorite-content';
      const response = await fetch(endpoint);
      const data = await response.json();
      
      console.log('Favorite content fetched:', data);
      
      this.results = data;
      this.notifyListeners();
    } catch (error) {
      console.error('Error fetching favorite content:', error);
      this.results = [];
      this.notifyListeners();
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  getResults() {
    return this.results;
  }
}

export const resultsFetcher = new ResultsFetcher();

// Keep resourceLibrarySearchEngine for backward compatibility but use resultsFetcher for results
export const resourceLibrarySearchEngine = {
  ...coveoSearchEngine,
  executeFirstSearch: () => resultsFetcher.executeFirstSearch(),
  subscribe: (callback) => resultsFetcher.subscribe(callback),
  getResults: () => resultsFetcher.getResults(),
};

export default { resourceLibrarySearchEngine, coveoSearchEngine, resultsFetcher };