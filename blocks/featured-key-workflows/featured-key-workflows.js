/**
 * Decorates the featured-key-workflows block
 * @param {HTMLElement} block - The block element
 */
export default function decorate(block) {
  // Add wrapper class
  block.classList.add('featured-key-workflows-wrapper');

  // Get title from first row
  const titleRow = block.children[0];
  const title = titleRow?.textContent?.trim();

  // Create container
  const container = document.createElement('div');

  // Add title if exists
  if (title) {
    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
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
    
    // Extract data from cells
    const iconCell = cells[0];
    const titleCell = cells[1];
    const descCell = cells[2];
    const linksCell = cells[3];

    // Create card
    const card = document.createElement('div');
    card.classList.add('workflow-card');

    // Add icon
    if (iconCell) {
      const iconDiv = document.createElement('div');
      iconDiv.classList.add('workflow-card-icon');
      iconDiv.innerHTML = iconCell.innerHTML;
      card.appendChild(iconDiv);
    }

    // Add title
    if (titleCell) {
      const cardTitle = document.createElement('h3');
      cardTitle.textContent = titleCell.textContent?.trim();
      card.appendChild(cardTitle);
    }

    // Add description
    if (descCell) {
      const descPara = document.createElement('p');
      descPara.textContent = descCell.textContent?.trim();
      card.appendChild(descPara);
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
