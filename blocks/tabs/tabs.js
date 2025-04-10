import { } from '../../scripts/aem.js';
import { } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */

  const blockDiv = document.createElement('div');
  blockDiv.classList.add('tabs-nav', 'tab-buttons');
  [...block.children].forEach((row) => {
    console.log(`lenght>${row.children.length}`);
    const tabDIv = document.createElement('div');
    if (row.children.length === 2) {
      tabDIv.id = row.children[1].textContent;
      tabDIv.classList.add('tab-section');
      tabDIv.textContent = row.children[0].textContent;
    }
    blockDiv.append(tabDIv);
  });
  block.textContent = '';
  block.append(blockDiv);
}
