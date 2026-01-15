export default function decorate(block) {
  const rows = [...block.children];

  /* -----------------------------
   * 1. Heading
   * ----------------------------- */
  const headingText = rows[0]
    ?.querySelector('p')
    ?.textContent
    ?.trim();

  const wrapper = document.createElement('div');
  wrapper.className = 'featured-key-workflows-wrapper';

  if (headingText) {
    const heading = document.createElement('h2');
    heading.className = 'featured-key-workflows-title';
    heading.textContent = headingText;
    wrapper.appendChild(heading);
  }

  /* -----------------------------
   * 2. Grid
   * ----------------------------- */
  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

  /* -----------------------------
   * 3. Cards
   * ----------------------------- */
  rows.slice(1).forEach((row) => {
    const cols = [...row.children];
    if (cols.length < 3) return;

    const titleText = cols[0].querySelector('p')?.textContent?.trim();
    const picture = cols[1].querySelector('picture');
    const links = [...cols[2].querySelectorAll('a')];

    const card = document.createElement('div');
    card.className = 'workflow-card';

    /* Card title */
    if (titleText) {
      const h3 = document.createElement('h3');
      h3.textContent = titleText;
      card.appendChild(h3);
    }

    /* Icon */
    if (picture) {
      const icon = document.createElement('div');
      icon.className = 'workflow-card-icon';
      icon.appendChild(picture);
      card.appendChild(icon);
    }

    /* Links */
    if (links.length) {
      const linksWrap = document.createElement('div');
      linksWrap.className = 'workflow-card-links';

      links.forEach((link) => {
        link.classList.remove('button');
        link.classList.add('workflow-card-link');
        linksWrap.appendChild(link);
      });

      card.appendChild(linksWrap);
    }

    grid.appendChild(card);
  });

  wrapper.appendChild(grid);

  /* -----------------------------
   * 4. Replace block content
   * ----------------------------- */
  block.innerHTML = '';
  block.appendChild(wrapper);
}
