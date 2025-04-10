export default async function decorate(block) {
  // Create main container div
  const blockDiv = document.createElement('div');
  blockDiv.classList.add('related-resources');

  // Clone heading DOM node safely
  const headingNode = block.children[0]?.querySelector('p');
  if (headingNode) {
    const headingDiv = document.createElement('div');
    headingDiv.classList.add('heading');
    headingDiv.append(headingNode.cloneNode(true)); // preserve markup inside heading
    blockDiv.appendChild(headingDiv);
  }

  // Loop over resource rows
  [...block.children].forEach((row, index) => {
    if (index < 1 || index > 4) return;

    const columns = [...row.children];

    if (columns.length >= 3) {
      const title = columns[0]?.textContent.trim();
      const linkText = columns[1]?.textContent.trim();
      const linkUrl = columns[2]?.querySelector('a')?.href;

      if (title && linkText && linkUrl) {
        const resourceDiv = document.createElement('div');
        resourceDiv.classList.add('links-container');

        const titleElement = document.createElement('strong');
        titleElement.textContent = `${title} `;
        titleElement.classList.add('title-Element');

        const linkElement = document.createElement('a');
        linkElement.href = linkUrl;
        linkElement.textContent = linkText;
        linkElement.classList.add('link-Element');

        resourceDiv.appendChild(titleElement);
        resourceDiv.appendChild(linkElement);
        blockDiv.appendChild(resourceDiv);
      }
    }
  });

  // Safe cleanup of original block content
  while (block.firstChild) {
    block.removeChild(block.firstChild);
  }

  // Append the decorated content
  block.append(blockDiv);
}
