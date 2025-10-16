import {} from '../../scripts/aem.js';
import {} from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  block.forEach((row, index) => {
    console.log(index+">"+row.outerHTML);
  });
  block.append(ul);
}
