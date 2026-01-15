import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Decorates the featured-key-workflows block
 * @param {HTMLElement} block - The block element
 */
export default function decorate(block) {
  block.classList.add('featured-key-workflows-wrapper');

  const container = document.createElement('div');

  // Get title from first row
  const titleRow = block.children[0];
  if (titleRow) {
    const titleElement = document.createElement('h2');
    titleElement.textContent = titleRow.textContent?.trim();
    titleElement.classList.add('featured-key-workflows-title');
    container.appendChild(titleElement);
  }

  // Create grid for workflow cards
  const grid = document.createElement('div');
  grid.classList.add('featured-key-workflows-grid');

  // Process each workflow item (skip first row which is title)
  const rows = Array.from(block.children).slice(1);
  rows.forEach((row) => {
    const cells = Array.from(row.children);

    if (cells.length === 0) return;

    // Extract data from cells based on order:
    // 0: category name, 1: image, 2: links
    const categoryName = cells[0]?.textContent?.trim();
    const imageCell = cells[1];
    const linksCell = cells[2];

    // Create card
    const card = document.createElement('div');
    card.classList.add('workflow-card');
    moveInstrumentation(row, card);

    // Add icon/image
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const iconDiv = document.createElement('div');
        iconDiv.classList.add('workflow-card-icon');
        // Clone the picture element
        iconDiv.appendChild(picture.cloneNode(true));
        card.appendChild(iconDiv);
      }
    }

    // Add category name as title
    if (categoryName) {
      const cardTitle = document.createElement('h3');
      cardTitle.textContent = categoryName;
      card.appendChild(cardTitle);
    }

    // Add links
    if (linksCell) {
      const linksDiv = document.createElement('div');
      linksDiv.classList.add('workflow-card-links');
      const links = linksCell.querySelectorAll('a');
      links.forEach((link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent?.trim();
        linkElement.classList.add('workflow-card-link');
        linksDiv.appendChild(linkElement);
      });
      card.appendChild(linksDiv);
    }

    grid.appendChild(card);
  });

  container.appendChild(grid);
  block.textContent = '';
  block.appendChild(container);
}
