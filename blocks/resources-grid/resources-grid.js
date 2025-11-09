import {
  div, p, h3, a, img, span,
} from '../../scripts/dom-builder.js';

/**
 * Icon mapping for resource types
 */
const resourceIcons = {
  techDoc: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#0072C6">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
  </svg>`,
  play: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 19 21" fill="#0072C6">
    <path d="M3.5 1.3C1.7 0.28 0.24 1.13 0.24 3.21v15.33c0 2.08 1.46 2.93 3.27 1.9l13.4-7.68c1.8-1.04 1.8-2.72 0-3.75L3.5 1.3Z"/>
  </svg>`,
  webpage: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#0072C6">
    <rect x="3" y="4" width="18" height="16" rx="2"/>
    <path d="M3 8h18" stroke="#fff" stroke-width="1.5"/>
  </svg>`,
};

/**
 * Builds a single resource card
 */
function buildResourceCard(item) {
  const fields = [...item.children];
  if (fields.length < 6) return null;

  const resourceType = fields[1]?.textContent.trim();
  const headingText = fields[2]?.textContent.trim();
  const descText = fields[3]?.textContent.trim();
  const picture = fields[4]?.querySelector('picture');
  const target = fields[5]?.textContent.trim() || '_self';

  const card = div({ class: 'resource-card' });

  // Image
  if (picture) {
    const imgEl = picture.querySelector('img');
    if (imgEl) {
      const imgClone = img({
        src: imgEl.src,
        alt: imgEl.alt || headingText || '',
        loading: 'lazy',
        class: 'resource-card-image',
      });
      card.append(imgClone);
    }
  }

  // Header section with icon and resource type
  const header = div(
    { class: 'resource-card-header' },
    span({ class: 'resource-card-icon', html: resourceIcons[resourceType] || '' }),
    p({ class: 'resource-type' }, resourceType),
  );

  // Heading
  const heading = h3({ class: 'resource-card-heading' }, headingText);

  // Description
  const desc = p({ class: 'resource-card-desc' }, descText);

  // Link
  const link = a(
    {
      class: 'resource-card-link',
      href: '#',
      target,
      title: 'Learn more',
    },
    'Learn more →',
  );

  card.append(header, heading, desc, link);
  return card;
}

/**
 * Decorate the resources-grid block
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const wrapper = div({ class: 'resources-grid-wrapper' });

  // Heading (first row)
  const headingRow = rows[0];
  if (headingRow) {
    const headingText = headingRow.querySelector('p')?.textContent || '';
    if (headingText) {
      const heading = h3({ class: 'resources-grid-heading' }, headingText);
      wrapper.append(heading);
    }
  }

  // Build grid container
  const grid = div({ class: 'resources-grid' });

  // Each subsequent row = one card
  rows.slice(1).forEach((row) => {
    const card = buildResourceCard(row);
    if (card) grid.append(card);
  });

  wrapper.append(grid);

  // Clear original block and replace with structured HTML
  block.innerHTML = '';
  block.append(wrapper);
}
