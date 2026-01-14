export default function decorate(block) {
  // Defensive: copy children to array and bail out if none
  const rows = Array.from(block.children || []);
  if (rows.length === 0) return;

  const headingRow = rows[0];
  const headingText = headingRow?.querySelector('p')?.textContent?.trim();

  if (headingText) {
    const heading = document.createElement('h2');
    heading.className = 'featured-key-workflows-title';
    heading.textContent = headingText;
    // insert before if possible, otherwise prepend
    if (block.parentNode) block.parentNode.insertBefore(heading, block);
    else block.prepend(heading);
  }

  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    if (!row) continue;
    const columns = row.children || [];
    if (columns.length < 3) continue;

    const card = document.createElement('div');
    card.className = 'workflow-card';

    // Icon (clone so we don't move original DOM nodes)
    const pictureEl = columns[1]?.querySelector('picture');
    const icon = document.createElement('div');
    icon.className = 'workflow-card-icon';
    if (pictureEl) icon.appendChild(pictureEl.cloneNode(true));
    card.appendChild(icon);

    // Title
    const titleEl = columns[0]?.querySelector('p');
    const h3 = document.createElement('h3');
    h3.textContent = titleEl?.textContent?.trim() || '';
    card.appendChild(h3);

    // Links
    const linksWrapper = document.createElement('div');
    linksWrapper.className = 'workflow-card-links';

    const links = columns[2]?.querySelectorAll('a') || [];
    Array.from(links).forEach((a) => {
      if (!a) return;
      const link = document.createElement('a');
      link.href = a.href || '#';
      link.textContent = a.textContent || '';
      link.className = 'workflow-card-link';
      linksWrapper.appendChild(link);
    });

    card.appendChild(linksWrapper);
    grid.appendChild(card);
  }

  block.innerHTML = '';
  block.appendChild(grid);
}
