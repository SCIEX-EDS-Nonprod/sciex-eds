import { fetchPlaceholders } from '../../scripts/aem.js';
import { createElement } from '../../scripts/scripts.js';

// Cache for page titles to avoid refetching the same URL multiple times
const pageTitleCache = new Map();
const placeholders = await fetchPlaceholders();

  const toCamelCase = (str) => {
    return (
      str
        .toLowerCase()
        .replace(/[^a-z0-9]+(.)/g, (_, char) => char.toUpperCase())
    );
  };

/**
 * Fetches and returns the <title> text from the given URL.
 * Uses an in-memory cache to avoid repeated network requests.
 *
 * @param {string} url - Absolute URL to fetch.
 * @returns {Promise<string>} - The page title or empty string if not found.
 */
const getPageTitle = async (url) => {
  if (pageTitleCache.has(url)) {
    return pageTitleCache.get(url);
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`Failed to fetch ${url}`);
      return '';
    }

    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const pageTitle = doc.title || '';

    pageTitleCache.set(url, pageTitle);

    return pageTitle;
  } catch (error) {
    console.warn(`Failed to fetch ${url}:`, error);
    return '';
  }
};

/**
 * Builds a breadcrumb list of all path segments except the current page.
 * For example, "/products/category/item" becomes:
 *   - "/products.html"
 *   - "/products/category.html"
 * Each segment is resolved to its page title via getPageTitle.
 *
 * @param {string} pathname - The current location pathname (e.g., window.location.pathname).
 * @returns {Promise<Array<{ path: string, name: string, url: string }>>}
 */
const getAllPathsExceptCurrent = async (pathname) => {
  const pathSegments = pathname.replace(/^\/|\/$/g, '').split('/');

  let accumulatedPath = '';

  const fetchTitlePromises = pathSegments
    .slice(0, -1)
    .map(async (segment, index) => {
      accumulatedPath = `${accumulatedPath}/${segment}`;

      const path = `${accumulatedPath}`;

      // Original page URL for title fetching
      const originalUrl = `${window.location.origin}${path}`;

      // Default breadcrumb clickable URL
      let breadcrumbUrl = originalUrl;

      // Current page title
      const titleName = await getPageTitle(originalUrl);

      // Rewrite only breadcrumb URL
      if (
        pathSegments[0] === 'resource-hub'
      && pathSegments.length === 5
      && index === 3
      ) {
        // Build level 3 path
        const level3Path = `/${pathSegments.slice(0, 4).join('/')}`;

        const level3Title = await getPageTitle(
          `${window.location.origin}${level3Path}`,
        );

        breadcrumbUrl = `${window.location.origin}/search-results`
        + `?contentType=Knowledge base articles&facetId=subcategories&value=${encodeURIComponent(level3Title)}`;
      }

      return {
        path,
        name: titleName,
        url: breadcrumbUrl,
      };
    });

  const results = await Promise.all(fetchTitlePromises);

  // Filter out entries with missing titles, logging a warning to aid debugging
  return results.filter((entry) => {
    if (!entry.name) console.warn(`Breadcrumb: No title found for ${entry.url}`);
    return entry.name;
  });
};

/**
 * Creates an anchor (<a>) element for a breadcrumb item.
 * Renders a home icon if the name is "Home"; otherwise uses the text label.
 *
 * @param {{ path: string, name: string, url: string }} breadcrumbItem
 * @returns {HTMLAnchorElement}
 */
const createLink = (breadcrumbItem) => {
  const linkEl = document.createElement('a');
  linkEl.href = breadcrumbItem.url;

  if (breadcrumbItem.name === 'Home') {
    // Inline SVG for Home icon
    linkEl.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33398 13V5.66667L8.00065 2L12.6673 5.66667V13H9.33398V8.66667H6.66732V13H3.33398Z" stroke="#707070"/>
      </svg>`;
  } else {
    const name=placeholders?.[toCamelCase(breadcrumbItem.name)] || breadcrumbItem.name;
    linkEl.innerText = name;
  }

  linkEl.classList.add('breadcrumb-link');
  return linkEl;
};

/**
 * Decorates the provided block with a breadcrumb navigation based on the current location.
 * Structure produced:
 *   Home / Parent / Current Page
 * Where separators are SVG arrows, and "Current Page" is marked with aria-current="page".
 *
 * @param {HTMLElement} block - The container element to decorate.
 */
export default async function decorate(block) {
  const breadcrumbNav = createElement('nav', '', {
    'aria-label': 'Breadcrumb',
  });

  block.innerHTML = '';

  const homeLink = createLink({
    path: '',
    name: 'Home',
    url: window.location.origin,
  });

  const breadcrumbHtmlParts = [homeLink.outerHTML];

  const currentPathname = window.location.pathname;
  console.log('Current Pathname:', currentPathname);
  const showFullBreadcrumb =
  /^\/(?:[a-z]{2}-[a-z]{2}\/)?resource-hub\/knowledge-base-articles\/.+/i.test(
    currentPathname,
  );
  const ancestorPaths = showFullBreadcrumb
    ? await getAllPathsExceptCurrent(currentPathname)
    : [];

  ancestorPaths.forEach((ancestorItem) => {
    breadcrumbHtmlParts.push(createLink(ancestorItem).outerHTML);
  });

  const currentPageTitle = document.querySelector('title')?.innerText || 'Current Page';

  const resourceHubTitles=['Knowledge base articles','Self-paced learning','Instructor led training','Technical notes','Regulatory documents','My favorite','SCIEX How','User guides'];
  if (resourceHubTitles.includes(currentPageTitle)) {
    const resourceHubEl = document.createElement('a');
    resourceHubEl.href = '/resource-hub';
    resourceHubEl.innerText = placeholders?.resourceHub || 'Resource hub';
    resourceHubEl.classList.add('breadcrumb-resource-link');
    breadcrumbHtmlParts.push(resourceHubEl.outerHTML);
  }

  const currentPageEl = document.createElement('span');
  const placeholderKey = toCamelCase(currentPageTitle);
  currentPageEl.innerText = placeholders?.[placeholderKey] || currentPageTitle;
  currentPageEl.style.fontWeight = 'bold';
  currentPageEl.style.color = 'black';
  currentPageEl.setAttribute('aria-current', 'page');
  breadcrumbHtmlParts.push(currentPageEl.outerHTML);

  const separatorHtml = `
    <span class="breadcrumb-separator">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.75 10.5L8.25 6L3.75 1.5" stroke="#707070"/>
      </svg>
    </span>`;

  breadcrumbNav.innerHTML = breadcrumbHtmlParts.join(separatorHtml);
  block.append(breadcrumbNav);
}
