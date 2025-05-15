/* eslint-disable */
import { buildSearchEngine } from 'https://static.cloud.coveo.com/headless/v3/headless.esm.js';

let accessToken = 'xx41750787-38bf-4ef5-b6ed-de7c116eae56';
let organizationId = 'danahernonproduction1892f3fhz';

// let mainDiv = document.querySelector('main');
// const sections = mainDiv.querySelector('.customer-document').children;
// Array.from(sections).forEach((section, index) => {
//   const iteration = index + 1;
//   if(iteration === 5){
//     organizationId = section.querySelector('div').innerText;
//   } else if(iteration === 6){
//     accessToken = section.querySelector('div').innerText;
//   }
// });

export const eventSearchEngine = buildSearchEngine({
  configuration: {
    organizationId: organizationId,
    accessToken: accessToken,
    search: {
      searchHub: 'SCIEXEventListing',
    },
    analytics: {
      analyticsMode: 'next',
      trackingId: 'sciex_us'
    },
  },
});

export default { eventSearchEngine };