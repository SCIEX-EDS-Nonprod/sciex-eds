import { getMetadata } from '../../scripts/aem.js';

export default function decorate(block) {
  const titleId = block.children[0]?.textContent?.trim();
  const headingText = block.children[1]?.textContent?.trim();
  const pageTitle = getMetadata('og:title');

  // Assign block ID if provided
  if (titleId) {
    block.id = titleId;
  }

  // Create container
  const blockDiv = document.createElement('div');
  blockDiv.classList.add('hero-title');

  // Create heading
  const headingDiv = document.createElement('div');
  headingDiv.classList.add('hero-heading');
  headingDiv.textContent = headingText || pageTitle;

  // Replace original content
  block.innerHTML = '';
  blockDiv.appendChild(headingDiv);
  block.appendChild(blockDiv);
}
