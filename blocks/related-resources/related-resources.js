import {} from '../../scripts/aem.js';

export default async function decorate(block) {
  // Create main container div
  const blockDiv = document.createElement('div');
  blockDiv.classList.add('tw', 'realated-resources', 'tw-bg-white');
  block.append(blockDiv);
}
