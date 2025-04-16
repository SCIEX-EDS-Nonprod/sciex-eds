import { } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Create main container div
  const blockDiv = document.createElement('div');
  blockDiv.classList.add('sciex-text');
  const text = block.children[0].textContent;
  const textDiv = document.createElement('div');
  textDiv.append(text);
  blockDiv.append(textDiv);

  block.textContent = '';
  block.append(blockDiv);
}
