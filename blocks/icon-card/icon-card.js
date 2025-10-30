import { span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  const iconCardContainer = document.createElement('div');
  iconCardContainer.className = 'icon-card-container-text';

  const rows = [...block.children];
  let id = '';
  let heading = '';
  let description = '';
  let columns = 2; // default value

  // Extract basic info
  rows.forEach((row, index) => {
    const text = row.textContent.trim();
    if (index === 0) id = text;
    if (index === 1) heading = text;
    if (index === 2) description = text;
    if (index === 3) columns = parseInt(text, 10) || 2;
  });

  if (id) iconCardContainer.classList.add(id);

  // Create heading
  if (heading) {
    const iconCardHeading = document.createElement('h2');
    iconCardHeading.className = 'icon-card-heading';
    iconCardHeading.textContent = heading;
    iconCardContainer.append(iconCardHeading);
  }

  // Create description
  if (description) {
    const iconCardDescription = document.createElement('p');
    iconCardDescription.className = 'icon-card-description';
    iconCardDescription.textContent = description;
    iconCardContainer.append(iconCardDescription);
  }

  // Create grid container based on column value
  const gridContainer = document.createElement('div');
  gridContainer.className = `icon-card-grid columns-${columns}`;
  iconCardContainer.append(gridContainer);

  // Build each card
  rows.slice(4).forEach((row) => {
    const cells = [...row.children];
    if (!cells.length) return;

    const icon = cells[0]?.innerHTML.trim() || '';
    const cardHeading = cells[1]?.textContent.trim() || '';
    const cardDescription = cells[2]?.textContent.trim() || '';
    const linkLabel = cells[3]?.textContent.trim() || '';
    const cardLink = cells[4]?.textContent.trim() || '#';
    const cardLinkTarget = cells[5]?.textContent.trim() || '_self';

    const card = document.createElement('div');
    card.className = 'icon-card-sub-container';

    card.innerHTML = `
      <div class="icon-card-image">${icon}</div>
      <div class="icon-card-content">
        <h3 class="icon-card-title">${cardHeading}</h3>
        <p class="icon-card-text">${cardDescription}</p>
      </div>
    `;

    // Create link
    const link = document.createElement('a');
    link.className = 'icon-card-link';
    link.href = cardLink;
    link.target = cardLinkTarget;
    link.textContent = linkLabel;

    // ✅ Append span icon to the link label
    const iconSpan = span({ class: 'icon icon-arrow-blue' }); // example icon name
    link.append(iconSpan);

    // Append link to the content
    card.querySelector('.icon-card-content').append(link);

    gridContainer.append(card);
  });
  decorateIcons(iconCardContainer);
  block.innerHTML = '';
  block.append(iconCardContainer);
}
