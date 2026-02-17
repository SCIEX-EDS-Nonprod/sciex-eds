import { moveInstrumentation } from '../../scripts/scripts.js';
import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  const workflowContainer = document.createElement('div');
  workflowContainer.className = 'workflow-container-block';

  // Move instrumentation metadata
  moveInstrumentation(block, workflowContainer);

  const rows = [...block.children];
  if (!rows.length) return;

  // ---- Heading (Row 0) ----
    const workflowId = rows[0]?.querySelector('p')?.textContent?.trim() || '';

  const headingText = rows[1]?.querySelector('p')?.textContent?.trim() || '';
  workflowContainer.id = workflowId;


  if (headingText) {
    const headingEl = document.createElement('h2');
    headingEl.className = 'featured-key-workflows-title';
    headingEl.textContent = headingText;
    workflowContainer.appendChild(headingEl);
  }

  // ---- Grid Wrapper ----
  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

  const itemRows = rows.slice(1);

  itemRows.forEach((row) => {
    const columns = [...row.children];
    if (columns.length < 3) return; // Require category, image, links

    const card = document.createElement('div');
    card.className = 'workflow-card';

    moveInstrumentation(row, card);

    // ---- Title ----
    const titleText =
      columns[0]?.querySelector('p')?.textContent?.trim() || '';

    if (titleText) {
      const titleEl = document.createElement('h3');
      titleEl.className = 'workflow-card-title';
      titleEl.textContent = titleText;
      card.appendChild(titleEl);
    }

    // ---- Image/Icon ----
    const picture = columns[1]?.querySelector('picture');
    if (picture) {
      const iconWrapper = document.createElement('div');
      iconWrapper.className = 'workflow-card-icon';
      iconWrapper.appendChild(picture);
      card.appendChild(iconWrapper);
    }

    // ---- Links ----
    const linksWrapper = document.createElement('div');
    linksWrapper.className = 'workflow-card-links';

    const links = columns[2]?.querySelectorAll('a') || [];
    links.forEach((a) => {
      const linkEl = document.createElement('a');
      linkEl.href = a.href;
      linkEl.textContent = a.textContent;
      linkEl.className = 'workflow-card-link';

      // Preserve target if exists
      if (a.target) {
        linkEl.target = a.target;
      }

      linksWrapper.appendChild(linkEl);
    });

    if (linksWrapper.childElementCount) {
      card.appendChild(linksWrapper);
    }

    grid.appendChild(card);
  });

  workflowContainer.appendChild(grid);

  decorateIcons(workflowContainer);

  // Replace original block content
  block.textContent = '';
  block.append(workflowContainer);
}
