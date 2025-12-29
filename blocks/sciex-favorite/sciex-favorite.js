/* eslint-disable */
import { getMetadata } from '../../scripts/aem.js';

const USER_API = '/bin/sciex/currentuserdetails';
const FAVORITES_API = '/bin/sciex/get-favorite-content';

const CATEGORY_MAP = [
  {
    key: 'knowledge',
    title: 'Knowledge base articles',
    match: (p) => p.includes('/support/knowledge-base-articles/'),
  },
  {
    key: 'self-paced',
    title: 'Self paced learning',
    match: (p) => p.includes('/sciexhow/') || p.includes('/Hidden/sciexhow/'),
  },
  {
    key: 'tech-notes',
    title: 'Tech notes',
    match: (p) => p.includes('/tech-notes/'),
  },
  {
    key: 'user-guides',
    title: 'User guides',
    match: (p) => p.includes('/user-guide'),
  },
  {
    key: 'regulatory',
    title: 'Regulatory documents',
    match: (p) => p.includes('/regulatory'),
  },
  {
    key: 'instructor',
    title: 'Instructor led training',
    match: (p) => p.includes('/instructor'),
  },
];

export default async function decorate(block) {
  const id = block.children[0]?.textContent?.trim() || 'my-favorites';
  const title = block.children[1]?.textContent?.trim() || 'My favorite resources';

  block.textContent = '';

  const section = document.createElement('section');
  section.id = id;
  section.className = 'favorites-accordion';

  const header = document.createElement('header');
  header.className = 'accordion-header';
  header.innerHTML = `<h2>${title}</h2><button class="accordion-toggle"></button>`;

  const content = document.createElement('div');
  content.className = 'accordion-content';

  section.append(header, content);
  block.append(section);

  header.addEventListener('click', () => {
    content.classList.toggle('open');
    header.classList.toggle('open');
  });

  try {
    const userResp = await fetch(USER_API, { credentials: 'include' });
    const user = await userResp.json();

    if (!user.loggedIn) {
      renderLoggedOut(content);
      return;
    }

    const favResp = await fetch(FAVORITES_API, { credentials: 'include' });
    const favorites = await favResp.json();

    renderFavorites(content, favorites);
  } catch (e) {
    console.error('Favorites block error', e);
  }
}

function renderLoggedOut(container) {
  container.innerHTML = `
    <div class="favorites-logged-out">
      <p>
        Save your go-to articles and access them anytime.
        Sign in to keep your favorites in one place.
      </p>
      <div class="cta-row">
        <a class="btn secondary" href="/login">Login</a>
        <a class="btn primary" href="/create-account">Create an account</a>
      </div>
    </div>
  `;
}

function renderFavorites(container, items) {
  const buckets = {};

  CATEGORY_MAP.forEach((c) => (buckets[c.key] = []));

  items.forEach(({ path }) => {
    const category = CATEGORY_MAP.find((c) => c.match(path));
    if (category) {
      buckets[category.key].push(path);
    }
  });

  const grid = document.createElement('div');
  grid.className = 'favorites-grid';

  CATEGORY_MAP.forEach(({ key, title }) => {
    if (!buckets[key].length) return;

    const section = document.createElement('section');
    section.className = 'favorites-category';

    const h3 = document.createElement('h3');
    h3.textContent = title;

    const ul = document.createElement('ul');
    buckets[key].slice(0, 5).forEach((path) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = path;
      a.textContent = decodeTitleFromPath(path);
      li.appendChild(a);
      ul.appendChild(li);
    });

    section.append(h3, ul);
    grid.append(section);
  });

  container.append(grid);
}

function decodeTitleFromPath(path) {
  const last = path.split('/').pop();
  return decodeURIComponent(
    last.replace(/[_-]/g, ' ').replace(/\.(html)?$/, '')
  );
}
