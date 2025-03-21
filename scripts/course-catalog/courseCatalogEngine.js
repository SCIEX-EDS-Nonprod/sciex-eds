/* eslint-disable */
import { buildSearchEngine } from 'https://static.cloud.coveo.com/headless/v3/headless.esm.js';

export const courseCatalogSearchEngine = buildSearchEngine({
  configuration: {
    organizationId: 'danaherproductionrfl96bkr',
    accessToken: 'xx41750787-38bf-4ef5-b6ed-de7c116eae56',
    search: {
      searchHub: 'SCIEXCourseListing',
    },
  },
});

export default { courseCatalogSearchEngine };