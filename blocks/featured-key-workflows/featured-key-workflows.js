import { decorateIcons } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  /* -------- Heading -------- */
  const headingHTML = rows[0]?.querySelector('p')?.innerHTML.trim();

  if (headingHTML) {
    const heading = document.createElement('h2');
    heading.className = 'featured-key-workflows-title';
    heading.innerHTML = headingHTML;
    block.before(heading);
  }

  /* -------- Container -------- */
  const workflowsContainer = document.createElement('div');
  workflowsContainer.className = 'featured-key-workflows-container';
  moveInstrumentation(block, workflowsContainer);

  /* -------- Grid -------- */
  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';
  workflowsContainer.append(grid);

  /* -------- Cards -------- */
  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const cells = [...row.children];
    if (cells.length < 3) continue;

    const card = document.createElement('div');
    card.className = 'workflow-card';
    moveInstrumentation(row, card);

    /* Icon */
    const icon = document.createElement('div');
    icon.className = 'workflow-card-icon';
    icon.innerHTML = cells[1]?.innerHTML.trim() || '';
    card.append(icon);

    /* Title */
    const h3 = document.createElement('h3');
    h3.innerHTML = cells[0]?.innerHTML.trim() || '';
    card.append(h3);

    /* Links */
    const linksWrapper = document.createElement('div');
    linksWrapper.className = 'workflow-card-links';
    linksWrapper.innerHTML = cells[2]?.innerHTML.trim() || '';
    card.append(linksWrapper);

    grid.append(card);
  }

  decorateIcons(workflowsContainer);

  block.innerHTML = '';
  block.append(workflowsContainer);
}
