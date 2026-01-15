export default function decorate(block) {
  const rows = [...block.children];

  /* -------- Heading -------- */
  const headingHTML = rows[0]?.querySelector('p')?.innerHTML;

  if (headingHTML) {
    const heading = document.createElement('h2');
    heading.className = 'featured-key-workflows-title';
    heading.innerHTML = headingHTML; // ✅ innerHTML
    block.before(heading);
  }

  /* -------- Grid -------- */
  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

  for (let i = 1; i < rows.length; i += 1) {
    const columns = rows[i].children;

    const card = document.createElement('div');
    card.className = 'workflow-card';

    /* Icon */
    const icon = document.createElement('div');
    icon.className = 'workflow-card-icon';
    icon.innerHTML = columns[1].querySelector('picture')?.outerHTML || '';
    card.appendChild(icon);

    /* Title */
    const h3 = document.createElement('h3');
    h3.innerHTML = columns[0].querySelector('p')?.innerHTML || '';
    card.appendChild(h3);

    /* Links */
    const linksWrapper = document.createElement('div');
    linksWrapper.className = 'workflow-card-links';

    const links = columns[2].querySelectorAll('a');
    links.forEach((a) => {
      const link = document.createElement('a');
      link.href = a.href;
      link.className = 'workflow-card-link';
      link.innerHTML = a.innerHTML; // ✅ innerHTML
      linksWrapper.appendChild(link);
    });

    card.appendChild(linksWrapper);
    grid.appendChild(card);
  }

  /* -------- Replace block -------- */
  block.innerHTML = '';
  block.appendChild(grid);
}
