import { decorateMain } from '../../scripts/scripts.js';
import { loadSections } from '../../scripts/aem.js';

export async function loadFragment(rawPath) {
  if (rawPath && rawPath.startsWith('/')) {
    const cleanPath = rawPath.replace(/(\.plain)?\.html/, '');
    const resp = await fetch(`${cleanPath}.plain.html`);
    if (resp.ok) {
      const main = document.createElement('main');
      main.innerHTML = await resp.text();

      // Reset base for media URLs
      const resetAttributeBase = (tag, attr) => {
        main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
          const absolute = new URL(
            elem.getAttribute(attr),
            new URL(cleanPath, window.location),
          ).href;
          elem.setAttribute(attr, absolute);
        });
      };

      resetAttributeBase('img', 'src');
      resetAttributeBase('source', 'srcset');

      decorateMain(main);
      await loadSections(main);
      return main;
    }
  }
  return null;
}

export default async function decorate(block) {
  const columnSetting = Number(block.children[1]?.textContent?.trim());
  const gridValueColumns = columnSetting > 0 ? columnSetting : 2;

  const links = [...block.querySelectorAll('a')];
  if (links.length === 0) return;

  // 3) Prepare final wrapper container (this replaces the block content)
  const container = document.createElement('div');
  container.classList.add('fragment-multi-container', `container-grid-${gridValueColumns}`);

  // 4) Load fragments in parallel (Promise.all)
  const fragmentPromises = links.map((link) => loadFragment(link.getAttribute('href')));
  const fragments = await Promise.all(fragmentPromises);

  // 5) Convert each fragment into DOM blocks and append
  fragments.forEach((fragment) => {
    if (!fragment) return;

    const fragmentSection = fragment.querySelector(':scope .section');
    if (fragmentSection) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('fragment-item');

      // Same behavior as official block: take children of the fragment section
      wrapper.append(...fragmentSection.childNodes);

      // Add section-level classes to the item
      wrapper.classList.add(...fragmentSection.classList);

      container.appendChild(wrapper);
    }
  });

  // 6) Replace block children like the official fragment does
  block.classList.remove('section');
  block.replaceChildren(container);
}
