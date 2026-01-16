import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const headingRow = rows[0];
  const headingText = headingRow.querySelector('p')?.textContent;

  // Create container
  const container = document.createElement('div');
  container.className = 'featured-key-workflows-container';
  moveInstrumentation(block, container);

  // Heading
  if (headingText) {
    const heading = document.createElement('h2');
    heading.className = 'featured-key-workflows-title';
    heading.textContent = headingText;
    container.appendChild(heading);
  }

  // Grid
  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

  // Start from index 1 → workflow-item rows
  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const columns = row.children;

    const card = document.createElement('div');
    card.className = 'workflow-card';

    // 🔑 Preserve item instrumentation
    moveInstrumentation(row, card);

    // Category Name
    const title = columns[0]?.querySelector('p');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent;
      card.appendChild(h3);
    }

    // Image
    const picture = columns[1]?.querySelector('picture');
    if (picture) {
      const icon = document.createElement('div');
      icon.className = 'workflow-card-icon';
      icon.appendChild(picture);
      card.appendChild(icon);
    }

    // Links (richtext)
    const linksWrapper = document.createElement('div');
    linksWrapper.className = 'workflow-card-links';

    const links = columns[2]?.querySelectorAll('a') || [];
    links.forEach((a) => {
      a.classList.add('workflow-card-link');
      linksWrapper.appendChild(a);
    });

    card.appendChild(linksWrapper);
    grid.appendChild(card);
  }

  container.appendChild(grid);

  // Replace block safely
  block.replaceWith(container);
}
