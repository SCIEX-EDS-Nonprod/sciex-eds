import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
 
  const blockDiv = document.createElement('div');
  [...block.children].forEach((row) => {
    const tabDIv = document.createElement('div');
    tabDIv.id = row.children[1].textContent;
    tabDIv.classList.add('tab-section');
    tabDIv.textContent = row.children[0].textContent;
    blockDiv.append(tabDIv);
    
  });
 
  block.textContent = '';
  block.append(blockDiv);
}
