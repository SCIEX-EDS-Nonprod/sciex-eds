export default function decorate(block) {
  const rows = [...block.children];

  // 🔹 Create outer container
  const container = document.createElement('div');
  container.className = 'featured-workflow-container';

  /* ---------------- Heading ---------------- */
  const headingRow = rows[0];
  const headingText = headingRow.querySelector('p')?.textContent;

  if (headingText) {
    const heading = document.createElement('h2');
    heading.className = 'featured-key-workflows-title';
    heading.textContent = headingText;
    container.appendChild(heading);
  }

  /* ---------------- Grid ---------------- */
  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const columns = row.children;

    const card = document.createElement('div');
    card.className = 'workflow-card';

    // Icon
    const picture = columns[1].querySelector('picture');
    if (picture) {
      const icon = document.createElement('div');
      icon.className = 'workflow-card-icon';
      icon.appendChild(picture);
      card.appendChild(icon);
    }

    // Title
    const title = columns[0].querySelector('p');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent;
      card.appendChild(h3);
    }

    // Links
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
  }

  container.appendChild(grid);

  /* ---------------- Replace block ---------------- */
  block.innerHTML = '';
  block.appendChild(container);
}
