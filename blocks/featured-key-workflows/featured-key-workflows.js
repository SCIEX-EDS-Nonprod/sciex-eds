import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  // 🔑 Create container & move block instrumentation
  const container = document.createElement('div');
  container.className = 'featured-key-workflows-container';
  moveInstrumentation(block, container);

  // Heading (row 0)
  const headingText = rows[0]?.querySelector('p')?.textContent?.trim();
  if (headingText) {
    const heading = document.createElement('h2');
    heading.className = 'featured-key-workflows-title';
    heading.textContent = headingText;
    container.appendChild(heading);
  }

  // Grid
  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

  // workflow-item rows start from index 1
  rows.slice(1).forEach((row) => {
    const columns = [...row.children];
    if (columns.length < 3) return;

    const card = document.createElement('div');
    card.className = 'workflow-card';

    // 🔑 Move ITEM instrumentation (this is what you were missing)
    moveInstrumentation(row, card);

    // Category name
    const title = columns[0]?.querySelector('p')?.textContent?.trim();
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title;
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

    const links = columns[2].querySelectorAll('a');
    links.forEach((a) => {
      const link = document.createElement('a');
      link.href = a.href;
      link.textContent = a.textContent;
      link.className = 'workflow-card-link';
      linksWrapper.appendChild(link);
    });

    card.appendChild(linksWrapper);
    grid.appendChild(card);
  });

  container.appendChild(grid);

  // ✅ SAME AS ACCORDION
  block.textContent = '';
  block.append(container);
}
