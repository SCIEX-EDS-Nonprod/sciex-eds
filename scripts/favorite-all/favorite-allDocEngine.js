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

export const resourceLibrarySearchEngine = buildSearchEngine({
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
export const favoriteSearchEngine = async () => {
  try {
    const response = await fetch(
      "https://author-p93412-e854706.adobeaemcloud.com/bin/sciex/get-favorite-content"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('datasss',data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
export const removeFavoriteSearchEngine = async (url) => {
  console.log('called',url)
  try {
    const url='https://devcs.sciex.com/content/dam/SCIEX/pdf/customer-docs/user-guide/pa-800-plus-system-administration-guide-es.pdf'
    const response = await fetch(
      `https://author-p93412-e854706.adobeaemcloud.com/bin/sciex/favoritecontent?url=${url}&operation=add`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('datasss',data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
export default { resourceLibrarySearchEngine, favoriteSearchEngine ,removeFavoriteSearchEngine};