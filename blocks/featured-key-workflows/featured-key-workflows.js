export default function decorate(block) {
  console.log('featured-key-workflows block:', block);

  const children = [...block.children];

  /* ----------------------------
   * Wrapper
   * ---------------------------- */
  const wrapper = document.createElement('div');
  wrapper.className = 'featured-key-workflows-wrapper';

  /* ----------------------------
   * Title (first child only)
   * ---------------------------- */
  const titleText = children[0]
    ?.querySelector('p')
    ?.textContent
    ?.trim();

  if (titleText) {
    const h2 = document.createElement('h2');
    h2.className = 'featured-key-workflows-title';
    h2.textContent = titleText;
    wrapper.appendChild(h2);
  }

  /* ----------------------------
   * Grid
   * ---------------------------- */
  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

  /* ----------------------------
   * Cards (remaining children)
   * ---------------------------- */
  children.slice(1).forEach((item, index) => {
    console.log(`item ${index}`, item);

    const cols = [...item.children];
    if (cols.length < 3) return;

    const card = document.createElement('div');
    card.className = 'workflow-card';

    /* Category name */
    const title = cols[0].querySelector('p')?.textContent?.trim();
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title;
      card.appendChild(h3);
    }

    /* Image */
    const picture = cols[1].querySelector('picture');
    if (picture) {
      const icon = document.createElement('div');
      icon.className = 'workflow-card-icon';
      icon.appendChild(picture);
      card.appendChild(icon);
    }

    /* Links */
    const linksWrap = document.createElement('div');
    linksWrap.className = 'workflow-card-links';

    cols[2].querySelectorAll('a').forEach((a) => {
      a.classList.remove('button');
      a.classList.add('workflow-card-link');
      linksWrap.appendChild(a);
    });

    card.appendChild(linksWrap);
    grid.appendChild(card);
  });

  wrapper.appendChild(grid);

  /* ----------------------------
   * Replace block
   * ---------------------------- */
  block.innerHTML = '';
  block.appendChild(wrapper);
}
