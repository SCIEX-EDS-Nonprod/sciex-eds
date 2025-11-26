import {} from '../../scripts/aem.js';
import { } from '../../scripts/scripts.js';
import { } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  let id = '';
  console.log('atomic media block', block.outerHTML);
  [...block.children].forEach((row, index) => {
    if (index === 0) {
      id = row.textContent.trim();
      block.id = id;
      block.parentElement?.classList.add('tabs-container-wrapper');
    }
  });

  // block.textContent = '';
  block.append(ul);
}
