import { moveInstrumentation } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Initializes and decorates a featured key workflows block.
 * Expects the `block` DOM structure to contain:
 * - Row 0: Workflow ID
 * - Row 1: Title
 * - Row 2+: Each workflow item with:
 *   - Col 0: Category Name
 *   - Col 1: Image
 *   - Col 2: Links (HTML content)
 */
export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'featured-key-workflows-wrapper';

  moveInstrumentation(block, wrapper);

  const rows = [...block.children];
  if (rows.length < 2) return;

  // Extract ID and title from first two rows
  const workflowId = rows[0]?.querySelector('p')?.textContent?.trim() || '';
  const titleText = rows[1]?.querySelector('p')?.textContent?.trim() || '';

  wrapper.id = workflowId;

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

  // Process workflow item rows (skip the ID and title rows at index 0-1)
  const itemRows = rows.slice(2);

  itemRows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length < 3) return;

    // Extract columns
    const categoryName = cols[0]?.textContent?.trim() || '';
    const imageCol = cols[1];
    const linksCol = cols[2];

    // Create workflow card
    const card = document.createElement('div');
    card.className = 'workflow-card';

    // Add category name as heading
    if (categoryName) {
      const heading = document.createElement('h3');
      heading.textContent = categoryName;
      card.appendChild(heading);
    }

    // Add image if present
    if (imageCol) {
      const img = imageCol.querySelector('img');
      if (img) {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'workflow-card-icon';
        const picture = createOptimizedPicture(img.src, img.alt || categoryName, false, [{ width: '60' }]);
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
        const linkWrapper = document.createElement('a');
        linkWrapper.className = 'workflow-card-link';
        linkWrapper.href = link.href;
        linkWrapper.textContent = link.textContent.trim();
        linkWrapper.target = link.target || '_self';
        linksDiv.appendChild(linkWrapper);
      });

      // If no links found but has text content, create a text container
      if (links.length === 0 && linksCol.textContent.trim()) {
        const p = linksCol.querySelector('p');
        if (p) {
          linksDiv.innerHTML = p.innerHTML;
        }
      }

      if (linksDiv.children.length > 0) {
        card.appendChild(linksDiv);
      }
    }

    grid.appendChild(card);
  });

  wrapper.appendChild(grid);
  block.textContent = '';
  block.id = `${workflowId}-content`;
  block.append(wrapper);
}
