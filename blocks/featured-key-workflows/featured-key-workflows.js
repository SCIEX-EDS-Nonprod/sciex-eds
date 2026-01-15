import { decorateIcons } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const workflowsContainer = document.createElement('div');
  workflowsContainer.className = 'featured-key-workflows-container';
  moveInstrumentation(block, workflowsContainer);

  const rows = [...block.children];

  // Create grid for workflow cards
  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';
  workflowsContainer.append(grid);

  // Parse workflow items
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    // Extract data from cells:
    // 0: category name, 1: image, 2: links
    const categoryName = cells[0]?.textContent.trim();
    const imageHTML = cells[1]?.innerHTML.trim();
    const linksHTML = cells[2]?.innerHTML.trim();

    const card = document.createElement('div');
    card.className = 'workflow-card';
    moveInstrumentation(row, card);

    // ICON/IMAGE
    if (imageHTML) {
      const iconBox = document.createElement('div');
      iconBox.className = 'workflow-card-icon';
      iconBox.innerHTML = imageHTML;
      card.append(iconBox);
    }

    // CONTENT WRAPPER
    const content = document.createElement('div');
    content.className = 'workflow-card-content';

    // TITLE
    if (categoryName) {
      const heading = document.createElement('h3');
      heading.className = 'workflow-card-title';
      heading.textContent = categoryName;
      content.append(heading);
    }

    // LINKS
    if (linksHTML) {
      const linksDiv = document.createElement('div');
      linksDiv.className = 'workflow-card-links';
      linksDiv.innerHTML = linksHTML;
      content.append(linksDiv);
    }

    card.append(content);
    grid.append(card);
  });

  decorateIcons(workflowsContainer);
  block.innerHTML = '';
  block.append(workflowsContainer);
}
