export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  /* ---------------- Heading ---------------- */
  const headingText = rows[0]?.querySelector('p')?.textContent?.trim();

  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

  /* ---------------- Cards ---------------- */
  rows.slice(1).forEach((row) => {
    const columns = row.children;
    if (columns.length < 3) return;

    const card = document.createElement('div');
    card.className = 'workflow-card';

    /* Icon */
    const picture = columns[1].querySelector('picture');
    if (picture) {
      const icon = document.createElement('div');
      icon.className = 'workflow-card-icon';
      icon.appendChild(picture.cloneNode(true)); // ✅ clone
      card.appendChild(icon);
    }

    /* Title */
    const titleText = columns[0].querySelector('p')?.textContent?.trim();
    if (titleText) {
      const h3 = document.createElement('h3');
      h3.textContent = titleText;
      card.appendChild(h3);
    }

    /* Links */
    const links = columns[2].querySelectorAll('a');
    if (links.length) {
      const linksWrapper = document.createElement('div');
      linksWrapper.className = 'workflow-card-links';

      links.forEach((a) => {
        const link = document.createElement('a');
        link.href = a.href;
        link.textContent = a.textContent;
        link.className = 'workflow-card-link';
        linksWrapper.appendChild(link);
      });

      card.appendChild(linksWrapper);
    }

    grid.appendChild(card);
  });

  /* ---------------- Rebuild block safely ---------------- */
  block.replaceChildren(); // ✅ safer than innerHTML = ''

  if (headingText) {
    const heading = document.createElement('h2');
    heading.className = 'featured-key-workflows-title';
    heading.textContent = headingText;
    block.appendChild(heading);
  }

  block.appendChild(grid);
}
