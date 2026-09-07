import { moveInstrumentation } from '../../scripts/scripts.js';
import { decorateIcons } from '../../scripts/aem.js';
import { span } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const rows = [...block.children];

  if (!rows.length) return;

  const container = document.createElement('div');
  container.className = 'product-container';

  moveInstrumentation(block, container);

  // First row = block title
  const headingRow = rows[0];
  const headingText = headingRow
    .querySelector('p')
    ?.textContent
    ?.trim();

  if (headingText) {
    const heading = document.createElement('h2');
    heading.className = 'product-title';
    heading.textContent = headingText;
    container.appendChild(heading);
  }

  // Product items
  const itemRows = rows.slice(1);

  const grid = document.createElement('div');
  grid.className = 'product-grid';

  itemRows.forEach((row) => {
    const columns = row.children;

    if (!columns.length) return;

    const card = document.createElement('div');
    card.className = 'product-card';

    /*
     * Image
     */
    const picture = columns[0]?.querySelector('picture');

    if (picture) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'product-card-image';

      imageWrapper.appendChild(picture);
      card.appendChild(imageWrapper);
    }

    /*
     * Content
     */
    const content = document.createElement('div');
    content.className = 'product-card-content';

    /*
     * Title
     */
    const titleText = columns[1]
      ?.querySelector('p')
      ?.textContent
      ?.trim();

    if (titleText) {
      const title = document.createElement('h3');
      title.className = 'product-card-title';
      title.textContent = titleText;

      content.appendChild(title);
    }

    /*
     * Description
     */
    const description = columns[2];

    if (description?.textContent?.trim()) {
      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.className =
        'product-card-description';

      descriptionWrapper.innerHTML = description.innerHTML;

      content.appendChild(descriptionWrapper);
    }

    /*
     * Link
     */
    const buttonText = columns[3]
      ?.querySelector('p')
      ?.textContent
      ?.trim();
    const buttonLink = columns[4]?.querySelector('a');
    
    if (buttonLink) {
      const link = document.createElement('a');

      link.className = 'product-card-link';
      link.href = buttonLink.href;
      const label = document.createElement('span');
      label.textContent = buttonText ;
      link.appendChild(label);
      link.appendChild(span({ class: 'icon icon-arrow' }));

      /*
       * Open in new tab
       */
      const openInNewTab =
        columns[5]
          ?.textContent
          ?.trim()
          ?.toLowerCase() === 'true';

      if (openInNewTab) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }

      content.appendChild(link);
      decorateIcons(link);
    }

    card.appendChild(content);

    moveInstrumentation(row, card);

    grid.appendChild(card);
  });

  container.appendChild(grid);

  block.innerHTML = '';
  block.appendChild(container);
}
