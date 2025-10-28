import {} from '../../scripts/aem.js';
import {} from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row, index) => {
    
  });
  console.log('11');
  block.innerHTML = '';
  block.append(ul);
  console.log('12');
}
