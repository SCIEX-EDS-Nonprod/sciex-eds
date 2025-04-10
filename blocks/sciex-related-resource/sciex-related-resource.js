export default function decorate(block) {
  const resourceDiv = document.createElement('div');
  resourceDiv.className = 'sciex-related-resource';

  const rows = [...block.children];

  // Extract heading from the first row (assuming it's in a <p>)
  const firstRow = rows[0];
  let headingDiv;
  if (firstRow) {
    const heading = firstRow.querySelector('p');
    if (heading) {
      headingDiv = document.createElement('div');
      headingDiv.classList.add('heading');
      headingDiv.append(heading);
    }
  }

  rows.forEach((row, index) => {
    if (index < 1 || index > 4) return;

    const columns = [...row.children];

    if (columns.length >= 3) {
      const title = columns[0]?.textContent?.trim();
      const linkText = columns[1]?.textContent?.trim();
      const linkUrl = columns[2]?.querySelector('a')?.href;

      if (title && linkText && linkUrl) {
        const linksContainer = document.createElement('div');
        linksContainer.classList.add('links-container');

        const titleElement = document.createElement('strong');
        titleElement.textContent = title;
        titleElement.classList.add('title-element');

        const linkElement = document.createElement('a');
        linkElement.href = linkUrl;
        linkElement.textContent = linkText;
        linkElement.classList.add('link-element');

        linksContainer.appendChild(titleElement);
        linksContainer.appendChild(linkElement);
        resourceDiv.appendChild(linksContainer);
      }
    }
  });

  block.textContent = '';
  if (headingDiv) block.append(headingDiv);
  block.append(resourceDiv);
}
