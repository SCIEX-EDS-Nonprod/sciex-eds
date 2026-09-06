import { moveInstrumentation } from '../../scripts/scripts.js';

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

  // Remaining rows = instrument items
  const itemRows = rows.slice(1);

  /*
   * Automatically determine variation.
   *
   * Image exists  -> with-image
   * No image       -> text-only
   */
  const hasImage = itemRows.some((row) => (
    row.children[0]?.querySelector('picture, img')
  ));

  const variation = hasImage ? 'with-image' : 'text-only';

  // container.classList.add(variation);

  const grid = document.createElement('div');
  grid.className = 'product-grid';

  itemRows.forEach((row) => {
    const columns = row.children;

    if (!columns.length) return;

    const card = document.createElement('article');
    card.className = 'product-card';

    /*
     * Image
     */
    const picture = columns[0]?.querySelector('picture');

    if (picture && variation === 'with-image') {
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
    const titleText = columns[2]
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
    const description = columns[3];

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
    const sourceLink = columns[4]?.querySelector('a');
    const linkText = columns[5]
      ?.querySelector('p')
      ?.textContent
      ?.trim();

    if (sourceLink) {
      const link = document.createElement('a');

      link.className = 'product-card-link';
      link.href = sourceLink.href;
      link.textContent = linkText || sourceLink.textContent.trim();

      /*
       * Open in new tab
       */
      const openInNewTab =
        columns[6]
          ?.textContent
          ?.trim()
          ?.toLowerCase() === 'true';

      if (openInNewTab) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }

      content.appendChild(link);
    }

    card.appendChild(content);

    moveInstrumentation(row, card);

    grid.appendChild(card);
  });

  container.appendChild(grid);

  block.innerHTML = '';
  block.appendChild(container);
}
