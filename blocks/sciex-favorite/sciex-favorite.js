/* eslint-disable */
import { decorateIcons } from '../../scripts/aem.js';

const CATEGORY_MAP = [
  {
    key: 'knowledge',
    title: 'Knowledge base articles',
    icon: 'knowledge',
    match: (p) => p.includes('/support/knowledge-base-articles/'),
  },
  {
    key: 'self-paced',
    title: 'Self paced learning',
    icon: 'self-paced',
    match: (p) => p.includes('/sciexhow/') || p.includes('/Hidden/sciexhow/'),
  },
  {
    key: 'instructor',
    title: 'Instructor led training',
    icon: 'instructor',
    match: (p) => p.includes('/instructor'),
  },
  {
    key: 'tech-notes',
    title: 'Tech notes',
    icon: 'tech-notes',
    match: (p) => p.includes('/tech-notes/'),
  },
  {
    key: 'regulatory',
    title: 'Regulatory documents',
    icon: 'regulatory',
    match: (p) => p.includes('/regulatory'),
  },
  {
    key: 'user-guides',
    title: 'User guides',
    icon: 'user-guides',
    match: (p) => p.includes('/user-guide'),
  },
];

export default async function decorate(block) {
  const id = block.children[0]?.textContent?.trim() || 'my-favorites';
  const title = block.children[1]?.textContent?.trim() || 'My favorite resources';

  const logoutText =
    block.children[2]?.textContent?.trim() ||
    'Save your go-to articles and access them anytime. Sign in to keep your favorites in one place.';

  const loginUrl = block.children[3]?.textContent?.trim() || '/login';
  const createAccountUrl =
    block.children[4]?.textContent?.trim() || '/create-account';

  const USER_API = '/bin/sciex/currentuserdetails';
  const FAVORITES_API = '/bin/sciex/get-favorite-content';
    
  const viewAllUrlText = block.children[5]?.textContent?.trim() || "View all resources";

  const viewAllUrl = block.children[6]?.textContent?.trim() || '#';

  block.textContent = '';

  const section = document.createElement('section');
  section.id = id;
  section.className = 'favorites-accordion';

  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'sciex-favorite-wrapper';

  const header = document.createElement('sciex-header');
  header.className = 'accordion-header';
  header.innerHTML = `
  <h2>${title}</h2>
  <button class="accordion-toggle" aria-expanded="false">
    <span class="icon icon-resource_hub" aria-hidden="true"></span>
  </button>
`;
  decorateIcons(header);
  const content = document.createElement('div');
  content.className = 'accordion-content';

  headerWrapper.appendChild(header);
  section.append(headerWrapper, content);
  block.append(section);

  header.addEventListener('click', () => {
    const toggleBtn = header.querySelector('.accordion-toggle');
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
  
    toggleBtn.setAttribute('aria-expanded', String(!expanded));
    content.classList.toggle('open');
    header.classList.toggle('open');
  });
  
    
  if (!USER_API || !FAVORITES_API) {
    console.error('Favorites block: Missing API endpoints');
    return;
  }

  try {
    let isLoggedIn = false;

    try {
      const userResp = await fetch(USER_API, { credentials: 'include' });
    
      if (!userResp.ok) {
        throw new Error(`User API failed: ${userResp.status}`);
      }
    
      const user = await userResp.json();
      isLoggedIn = user?.loggedIn === true;
    } catch (e) {
      console.warn('Favorites block: treating user as logged out', e);
      isLoggedIn = false;
    }
    
    if (!isLoggedIn) {
      renderLoggedOut(content, logoutText, loginUrl, createAccountUrl);
      return;
    }
          
    const favResp = await fetch(FAVORITES_API, { credentials: 'include' });
    const favorites = await favResp.json();
    if (!Array.isArray(favorites)) {
      console.error('Favorites block: Invalid favorites response', favorites);
      return;
    }
    
    renderFavorites(content, favorites, viewAllUrl, viewAllUrlText);
  } catch (e) {
    console.error('Favorites block error', e);
  }
}

/* ================= Logged out ================= */

function renderLoggedOut(container, text, loginUrl, createUrl) {
  container.innerHTML = `
    <div class="favorites-logged-out">
      <p>${text}</p>
      <div class="cta-row">
        <a class="btn secondary" href="${loginUrl}">Login</a>
        <a class="btn primary" href="${createUrl}">Create an account</a>
      </div>
    </div>
  `;
}

/* ================= Favorites ================= */

function renderFavorites(container, items, viewAllUrl, viewAllUrlText) {
    const allowedTypes = getAllowedTypesFromURL();
    const buckets = {};
  
    // Initialize known categories
    CATEGORY_MAP.forEach((c) => {
      buckets[c.key] = [];
    });
  
    // Bucket favorites by CATEGORY_MAP
    items.forEach(({ path }) => {
      const category = CATEGORY_MAP.find((c) => c.match(path));
      if (category) {
        buckets[category.key].push(path);
      }
    });
  
    const grid = document.createElement('div');
    grid.className = 'favorites-grid';
  
    // Types to render: from URL OR all categories
    const typesToRender = allowedTypes || CATEGORY_MAP.map((c) => c.key);
  
    typesToRender.forEach((typeKey) => {
      const categoryConfig = CATEGORY_MAP.find((c) => c.key === typeKey);
  
      let title;
      let icon;
      let paths = [];
  
      if (categoryConfig) {
        // Known category
        title = categoryConfig.title;
        icon = categoryConfig.icon;
        paths = buckets[typeKey] || [];
      } else {
        // Unknown category → infer from favorites JSON
        title = humanizeType(typeKey);
        icon = 'empty'; // fallback icon
  
        paths = items
          .map(({ path }) => path)
          .filter((p) => p.includes(`/${typeKey}/`));
      }
  
      // Always render the card
      const section = document.createElement('section');
      section.className = 'favorites-category';
  
      const h3 = document.createElement('h3');
      h3.className = 'favorites-category-title';
  
      const iconSpan = document.createElement('span');
      iconSpan.className = `icon icon-${icon}`;
      iconSpan.setAttribute('aria-hidden', 'true');
  
      const textSpan = document.createElement('span');
      textSpan.textContent = title;
  
      h3.append(iconSpan, textSpan);
      section.appendChild(h3);
  
      if (paths.length) {
        const ul = document.createElement('ul');
  
        paths.slice(0, 5).forEach((path) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = path;
          a.textContent = decodeTitleFromPath(path);
          li.appendChild(a);
          ul.appendChild(li);
        });
  
        section.appendChild(ul);
      } else {
        // Empty card
        const empty = document.createElement('div');
        empty.className = 'favorites-empty';
  
        const emptyIcon = document.createElement('span');
        emptyIcon.className = 'icon icon-empty';
        emptyIcon.setAttribute('aria-hidden', 'true');
  
        const emptyText = document.createElement('p');
        emptyText.textContent = `No ${title.toLowerCase()} saved`;
  
        empty.append(emptyIcon, emptyText);
        section.appendChild(empty);
      }
  
      grid.appendChild(section);
    });
  
    container.appendChild(grid);
  
    if (viewAllUrl) {
      const viewAllWrapper = document.createElement('div');
      viewAllWrapper.className = 'favorites-view-all';
      viewAllWrapper.innerHTML = `
        <a class="btn secondary" href="${viewAllUrl}">
          ${viewAllUrlText}
        </a>
      `;
      container.appendChild(viewAllWrapper);
    }
  
    decorateIcons(container);
  }
  
/* ================= Utils ================= */

function decodeTitleFromPath(path) {
  const last = path.split('/').pop();
  return decodeURIComponent(
    last.replace(/[_-]/g, ' ').replace(/\.(html)?$/, '')
  );
}

function getAllowedTypesFromURL() {
  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get('type');

  if (!typeParam) return null;

  return typeParam
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

function humanizeType(type) {
    return type
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  
