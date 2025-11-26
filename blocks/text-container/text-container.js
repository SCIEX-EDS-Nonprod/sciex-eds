import { decorateMain, moveInstrumentation } from '../../scripts/scripts.js';
import { loadSections } from '../../scripts/aem.js';

/* ------------------ FRAGMENT LOADER ------------------ */
export async function loadFragment(rawPath) {
  if (rawPath && rawPath.startsWith('/')) {
    const cleanPath = rawPath.replace(/(\.plain)?\.html/, '');
    const resp = await fetch(`${cleanPath}.plain.html`);

    if (resp.ok) {
      const main = document.createElement('main');
      main.innerHTML = await resp.text();

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

/* ------------------ MAIN DECORATE ------------------ */
export default async function decorate(block) {
  // ✅ CHECK: if 3rd child contains anchor, use FRAGMENT LOGIC
  const thirdChild = block.children[2];
  const hasAnchorInThird = thirdChild && thirdChild.querySelector('a');

  if (hasAnchorInThird && !(thirdChild.children.length > 1)) {
    const columnSetting = Number(block.children[1]?.textContent?.trim());
    const gridValueColumns = columnSetting > 0 ? columnSetting : 2;

    const links = [...block.querySelectorAll('a')];
    if (links.length === 0) return;

    const container = document.createElement('div');
    container.classList.add('fragment-multi-container', `container-grid-${gridValueColumns}`);

    const fragmentPromises = links.map((link) => loadFragment(link.getAttribute('href')));

    const fragments = await Promise.all(fragmentPromises);

    fragments.forEach((fragment) => {
      if (!fragment) return;

      const fragmentSection = fragment.querySelector(':scope .section');
      if (fragmentSection) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('fragment-item');
        wrapper.append(...fragmentSection.childNodes);
        container.appendChild(wrapper);
      }
    });

    moveInstrumentation(container);
    block.appendChild(container);
    return;
  }

  /* ------------------ ORIGINAL TEXT CONTAINER LOGIC ------------------ */

  const ul = document.createElement('ul');

  [...block.children].forEach((row, index) => {
    const li = document.createElement('li');

    if (index === 1 && row.textContent.includes('2')) {
      ul.classList.add('text-container-header', 'text-container-columns');
    } else if (index === 1 && row.textContent.includes('1')) {
      ul.classList.remove('text-container-header', 'text-container-columns');
    } else if (index > 1) {
      const children = [...row.children];
      const column = document.createElement('div');
      column.className = 'text-container-column';

      // Title
      const title = children[0]?.textContent?.trim();
      if (title) {
        const h2 = document.createElement('h2');
        h2.className = `text-container-heading ${children[2]?.textContent?.trim()}`;
        h2.textContent = title;
        column.appendChild(h2);
      }

      // Sub Heading
      const subheading = children[1]?.textContent?.trim();
      if (subheading) {
        const p = document.createElement('p');
        p.className = `text-container-description ${children[2]?.textContent?.trim()}`;
        p.textContent = subheading;
        column.appendChild(p);
      }

      // Description
      const desc = children[3]?.textContent?.trim();
      if (desc) {
        const p = document.createElement('p');
        p.className = `text-container-description ${children[4]?.textContent?.trim()}`;
        p.textContent = desc;
        column.appendChild(p);
      }

      // Buttons
      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'button-block';

      for (let i = 5; i + 3 < children.length; i += 4) {
        const label = children[i]?.textContent?.trim();
        const alt = children[i + 1]?.textContent?.trim();
        const link = children[i + 2]?.querySelector('a');
        const target = children[i + 3]?.textContent?.trim();

        if (link && label) {
          const a = document.createElement('a');
          a.href = link.getAttribute('href') || '#';
          a.textContent = label;
          a.title = alt || label;

          if (i === 5) a.className = 'button primary';
          else if (i === 9) a.className = 'button secondary';
          else if (i === 13) {
            a.className = 'link';
            const span = document.createElement('span');
            span.id = 'right-arrow';
            span.className = 'icon';
            a.appendChild(span);
          }

          if (target) a.setAttribute('target', target);

          const wrapper = document.createElement('div');
          wrapper.appendChild(a);
          buttonGroup.appendChild(wrapper);
        }
      }

      if (buttonGroup.children.length > 0) {
        column.appendChild(buttonGroup);
      }

      li.append(column);
      moveInstrumentation(row, li);
      ul.append(li);
    }
  });
  block.append(ul);
}
