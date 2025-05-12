import { createOptimizedPicture, decorateIcons } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { span } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  let headingText = '';
  let target = '_blank';

  [...block.children].forEach((row, index) => {
    if (index === 0) {
      headingText = row.textContent.trim();
      return;
    }

    if (
      index === 1
      && row.querySelector('div > div > p')
    ) {
      target = row.textContent.trim();
      return;
    }

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    while (row.firstElementChild) li.append(row.firstElementChild);

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });

    const anchor = li.querySelector('a');
    if (anchor) {
      anchor.setAttribute('target', target);
      anchor.appendChild(span({ class: 'icon icon-right-arrow' }));
    }

    ul.append(li);
    decorateIcons(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // 🎨 Create and style heading element
  const headingEl = document.createElement('h2');
  headingEl.textContent = headingText;
  headingEl.className = 'cards-heading'; // Add class for styling

  block.textContent = '';
  block.append(headingEl); // 🔼 Add heading before list
  block.append(ul);
}
