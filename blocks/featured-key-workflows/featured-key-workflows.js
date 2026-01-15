import { moveInstrumentation } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Initializes and decorates a featured key workflows block.
 * Expects the `block` DOM structure to contain:
 * - Row 0: Title
 * - Row 1+: Each workflow item with:
 *   - Col 0: Category Name
 *   - Col 1: Image
 *   - Col 2: Links (HTML content)
 */
export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'featured-key-workflows-wrapper';

  // Move instrumentation markers/metadata from the original block into the new container
  moveInstrumentation(block, wrapper);

  const rows = [...block.children];
  if (rows.length < 1) return; // Must have at least title

  // Hardcoded workflow ID
  const workflowId = 'featured-key-workflows';
  wrapper.id = workflowId;

  // Extract title from first row
  const titleText = rows[0]?.querySelector('p')?.textContent?.trim() || '';

  // Build title element
  if (titleText) {
    const titleEl = document.createElement('h2');
    titleEl.className = 'featured-key-workflows-title';
    titleEl.textContent = titleText;
    wrapper.appendChild(titleEl);
  }

  // Build grid container
  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

  // Process workflow item rows (skip the title row at index 0)
  const itemRows = rows.slice(1);

  itemRows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length < 3) return; // Require at least category, image, links

    // Extract columns
    const categoryName = cols[0]?.querySelector('p')?.textContent?.trim() || '';
    const imageCol = cols[1];
    const linksCol = cols[2];

    const card = document.createElement('div');
    card.className = 'workflow-card';
    moveInstrumentation(row, card);

    // Add category name as heading
    if (categoryName) {
      const heading = document.createElement('h3');
      heading.textContent = categoryName;
      card.appendChild(heading);
    }

    // Add image if present
    if (imageCol) {
      const picture = imageCol.querySelector('picture');
      if (picture) {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'workflow-card-icon';
        iconDiv.appendChild(picture);
        card.appendChild(iconDiv);
      }
    }

    // Add links container
    if (linksCol) {
      const linksDiv = document.createElement('div');
      linksDiv.className = 'workflow-card-links';

      // Process all links in the links column
      const links = linksCol.querySelectorAll('a');
      links.forEach((link) => {
        const linkEl = document.createElement('a');
        linkEl.className = 'workflow-card-link';
        linkEl.href = link.href;
        linkEl.textContent = link.textContent.trim();
        linkEl.target = link.target || '_self';
        linksDiv.appendChild(linkEl);
      });

      if (linksDiv.children.length > 0) {
        card.appendChild(linksDiv);
      }
    }

    grid.appendChild(card);
  });

  wrapper.appendChild(grid);

  // Replace original block with the new workflow structure
  block.textContent = '';
  block.id = `${workflowId}-content`;
  block.append(wrapper);
}
