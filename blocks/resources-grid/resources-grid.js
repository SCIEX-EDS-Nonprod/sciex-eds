import {
  div, h3,
} from '../../scripts/dom-builder.js';

/*

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
} */

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
  /* rows.slice(1).forEach((row) => {
    const card = buildResourceCard(row);
    if (card) grid.append(card);
  }); */

  wrapper.append(grid);

  // Clear original block and replace with structured HTML
  block.innerHTML = '';
  block.append(wrapper);
}
