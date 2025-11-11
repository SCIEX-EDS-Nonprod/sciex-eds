import {} from '../../scripts/aem.js';
import {} from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  block.classList.add('resources-grid-wrapper');

  // Initialize variables
  let id = '';
  let headingText = '';
  let textSize = 'text-delta';
  let description = '';

  // Create heading element
  [...block.children].forEach((row, index) => {
    if (index === 0) {
      id = row.textContent.trim();
      block.id = id;
      return;
    }
    if (index === 1) {
      headingText = row.textContent.trim();
      const heading = document.createElement('div');
      heading.id = 'headingDiv';
      heading.textContent = headingText;
      block.insertBefore(heading, block.firstChild);
      return;
    }
    if (index === 2) {
      textSize = row.textContent.trim() || 'text-delta';
      if (!['text-delta', 'text-charlie'].includes(textSize)) {
        console.warn(`Invalid text size "${textSize}" in resources grid. Using default.`);
        textSize = 'text-delta';
      }
      const heading = document.querySelector('#headingDiv');
      if (heading !== null) {
        heading.className = textSize;
      }

      return;
    }
    if (index === 3) {
      description = row.textContent.trim();
      const descriptionDiv = document.createElement('div');
      descriptionDiv.textContent = description;

      block.iappendChild(descriptionDiv);
      return;
    }

    if (index >= 4 && row.children.length > 0) {
      [...row.children].forEach((column) => {
        const li = document.createElement('li');
        li.className = 'resource-grid-item';
        li.innerHTML = column.innerHTML;
        ul.appendChild(li);
      });
    }
  });
}
