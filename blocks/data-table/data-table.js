import {} from '../../scripts/aem.js';
import {} from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  block.textContent = '';
  block.append(ul);
}
