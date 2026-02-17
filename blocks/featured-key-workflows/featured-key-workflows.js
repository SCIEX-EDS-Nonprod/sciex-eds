import { moveInstrumentation } from '../../scripts/scripts.js';
import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  // Prevent double decoration
  if (block.classList.contains('workflow-decorated')) return;
  block.classList.add('workflow-decorated');

  const isAuthoring = window.location.search.includes('edit') ||
                      window.location.search.includes('wcmmode');

  const rows = [...block.children];
  if (!rows.length) return;

  const workflowContainer = document.createElement('div');
  workflowContainer.className = 'workflow-container-block';

  moveInstrumentation(block, workflowContainer);

  // ---- Heading ----
  const headingText = rows[0]?.querySelector('p')?.textContent?.trim() || '';

  if (headingText) {
    const headingEl = document.createElement('h2');
    headingEl.className = 'featured-key-workflows-title';
    headingEl.textContent = headingText;
    workflowContainer.appendChild(headingEl);
  }

  // ---- Grid ----
  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

  const itemRows = rows.slice(1);

  itemRows.forEach((row) => {
    const columns = [...row.children];
    if (columns.length < 3) return;

    const card = document.createElement('div');
    card.className = 'workflow-card';

    moveInstrumentation(row, card);

    // Title
    const titleText =
      columns[0]?.querySelector('p')?.textContent?.trim() || '';

    if (titleText) {
      const titleEl = document.createElement('h3');
      titleEl.textContent = titleText;
      card.appendChild(titleEl);
    }

    // Image
    const picture = columns[1]?.querySelector('picture');
    if (picture) {
      const iconWrapper = document.createElement('div');
      iconWrapper.className = 'workflow-card-icon';
      iconWrapper.appendChild(picture);
      card.appendChild(iconWrapper);
    }

    // Links
    const linksWrapper = document.createElement('div');
    linksWrapper.className = 'workflow-card-links';

    const links = columns[2]?.querySelectorAll('a') || [];
    links.forEach((a) => {
      const linkEl = document.createElement('a');
      linkEl.href = a.href;
      linkEl.textContent = a.textContent;
      linkEl.className = 'workflow-card-link';
      if (a.target) linkEl.target = a.target;
      linksWrapper.appendChild(linkEl);
    });

    if (linksWrapper.childElementCount) {
      card.appendChild(linksWrapper);
    }

    grid.appendChild(card);
  });

  workflowContainer.appendChild(grid);

  decorateIcons(workflowContainer);

  // 🔥 KEY FIX:
  // During authoring → do not destroy original structure
  if (!isAuthoring) {
    block.textContent = '';
    block.append(workflowContainer);
  }
}
