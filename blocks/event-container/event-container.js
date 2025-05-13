import {} from '../../scripts/aem.js';

export default async function decorate(block) {
  const blockDiv = document.createElement('div');
  blockDiv.classList.add('event-container');
  block.textContent = '';
  block.append(blockDiv);
}
