import { decorateIcons } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Store original rows before any DOM manipulation
  const rows = [...block.children];
console.log('rowsss',rows)
  // Extract all data from rows upfront
  const title = rows[0]?.textContent.trim() || '';

  const workflowItems = rows.slice(1).map((row) => {
    const cells = [...row.children];
    return {
      row,
      categoryName: cells[0]?.textContent.trim() || '',
      imageCell: cells[1],
      linksCell: cells[2],
    };
  });

  // Now manipulate DOM
  const workflowsContainer = document.createElement('div');
  workflowsContainer.className = 'featured-key-workflows-wrapper';
  moveInstrumentation(block, workflowsContainer);

  // Add title if exists
  if (title) {
    const titleElement = document.createElement('h2');
    titleElement.className = 'featured-key-workflows-title';
    titleElement.textContent = title;
    workflowsContainer.append(titleElement);
  }

  // Create grid for workflow cards
  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';
  workflowsContainer.append(grid);

  // Render workflow items using extracted data
  workflowItems.forEach(({ row, categoryName, imageCell, linksCell }) => {
    const card = document.createElement('div');
    card.className = 'workflow-card';
    moveInstrumentation(row, card);

    // ICON/IMAGE - extract picture element from reference
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const iconBox = document.createElement('div');
        iconBox.className = 'workflow-card-icon';
        iconBox.appendChild(picture.cloneNode(true));
        card.append(iconBox);
      }
    }

    // TITLE
    if (categoryName) {
      const heading = document.createElement('h3');
      heading.textContent = categoryName;
      card.append(heading);
    }

    // LINKS - parse richtext links and build them
    if (linksCell) {
      const linksDiv = document.createElement('div');
      linksDiv.className = 'workflow-card-links';
      const links = linksCell.querySelectorAll('a');
      links.forEach((link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent.trim();
        linkElement.classList.add('workflow-card-link');
        linksDiv.append(linkElement);
        console.log('aa')
      });
      card.append(linksDiv);
    }

    grid.append(card);
  });

  decorateIcons(workflowsContainer);
  block.innerHTML = '';
  block.append(workflowsContainer);
}
