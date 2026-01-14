export default function decorate(block) {
  const rows = [...block.children];

  // Heading
  const headingText = rows[0]?.children[0]?.children[0]?.textContent.trim();
  if (headingText) {
    const heading = document.createElement('h2');
    heading.className = 'featured-key-workflows-title';
    heading.textContent = headingText;
    block.before(heading);
  }

  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

  // Loop over rows (skip heading row)
  for (let i = 1; i < rows.length; i += 1) {
    const columns = rows[i].children;
    const card = document.createElement('div');
    card.className = 'workflow-card';

    // Icon
    const picture = columns[1]?.children[0];
    if (picture) {
      const icon = document.createElement('div');
      icon.className = 'workflow-card-icon';
      icon.appendChild(picture);
      card.appendChild(icon);
    }

    // Title
    const titleText = columns[0]?.children[0]?.textContent.trim();
    if (titleText) {
      const h3 = document.createElement('h3');
      h3.textContent = titleText;
      card.appendChild(h3);
    }

    // Links or text
    const linksWrapper = document.createElement('div');
    linksWrapper.className = 'workflow-card-links';
    const linkColumn = columns[2];

    if (linkColumn) {
      const paragraphs = [...linkColumn.children];
      paragraphs.forEach((p) => {
        const anchor = p.children[0];

        // Link inside <p>
        if (anchor && anchor.tagName === 'A') {
          const link = document.createElement('a');
          link.href = anchor.href;
          link.textContent = anchor.textContent.trim();
          link.className = 'workflow-card-link';
          linksWrapper.appendChild(link);
        } 
        // Plain text
        else {
          const text = p.textContent.trim();
          if (text) {
            const span = document.createElement('span');
            span.className = 'workflow-card-text';
            span.textContent = text;
            linksWrapper.appendChild(span);
          }
        }
      });
    }

    card.appendChild(linksWrapper);
    grid.appendChild(card);
  }

  // Replace block content with grid
  block.innerHTML = '';
  block.appendChild(grid);
}
