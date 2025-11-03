import { span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const iconCardContainer = document.createElement('div');
  iconCardContainer.className = 'icon-card-container-text';
  moveInstrumentation(block, iconCardContainer);

  const rows = [...block.children];
  let id = '';
  let heading = '';
  let description = '';
  let columns = 2;

  rows.forEach((row, index) => {
    const text = row.textContent.trim();
    if (index === 0) id = text;
    else if (index === 1) heading = text;
    else if (index === 2) description = text;
    else if (index === 3) columns = parseInt(text, 10) || 2;
  });

  if (id) iconCardContainer.classList.add(id);

  if (heading) {
    const h2 = document.createElement('h2');
    h2.className = 'icon-card-heading';
    h2.textContent = heading;
    iconCardContainer.append(h2);
  }

  if (description) {
    const desc = document.createElement('p');
    desc.className = 'icon-card-description';
    desc.textContent = description;
    iconCardContainer.append(desc);
  }

  const gridContainer = document.createElement('div');
  gridContainer.className = `icon-card-grid columns-${columns}`;
  iconCardContainer.append(gridContainer);

  rows.slice(4).forEach((row) => {
    const cells = [...row.children];
    if (!cells.length) return;

    const iconHTML = cells[0]?.innerHTML?.trim() || '';
    const headingHTML = cells[1]?.innerHTML?.trim() || '';
    const descriptionHTML = cells[2]?.innerHTML?.trim() || '';
    const linkLabel = cells[3]?.textContent?.trim() || '';
    const linkHref = cells[4]?.textContent?.trim() || '';
    const linkTarget = cells[5]?.textContent?.trim() || '_self';

    const card = document.createElement('div');
    card.className = 'icon-card-sub-container';
    moveInstrumentation(row, card);

    if (iconHTML) {
      const iconWrap = document.createElement('div');
      iconWrap.className = 'icon-card-image';
      iconWrap.innerHTML = iconHTML;
      card.append(iconWrap);
    }

    const contentWrap = document.createElement('div');
    contentWrap.className = 'icon-card-content';

    if (headingHTML) {
      const h3 = document.createElement('h3');
      h3.className = 'icon-card-title';
      h3.innerHTML = headingHTML;
      contentWrap.append(h3);
    }

    if (descriptionHTML) {
      const p = document.createElement('p');
      p.className = 'icon-card-text';
      p.innerHTML = descriptionHTML;
      contentWrap.append(p);
    }

    // 3) Link (only if href present)
    if (linkHref && linkLabel) {
      const link = document.createElement('a');
      link.className = 'icon-card-link';
      link.href = linkHref;
      link.target = linkTarget;
      link.textContent = linkLabel;

      // Append arrow icon span
      const iconSpan = span({ class: 'icon icon-arrow-blue' });
      link.append(iconSpan);

      contentWrap.append(link);
    }

    // Append content only if it has children (prevents empty wrapper)
    if (contentWrap.childElementCount) {
      card.append(contentWrap);
    }

    gridContainer.append(card);
  });

  decorateIcons(iconCardContainer);

  // Replace block content
  block.innerHTML = '';
  block.append(iconCardContainer);
}
