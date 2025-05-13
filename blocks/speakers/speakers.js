import { } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  let headingText = '';
  const parentDiv = document.createElement('div');
  parentDiv.className = 'speaker-container';
  [...block.children].forEach((row, index) => {
    if (index === 0) {
      headingText = row.textContent.trim();
      return;
    }

    const speakerDiv = document.createElement('div');
    speakerDiv.className = 'speaker-card';
    moveInstrumentation(row, speakerDiv);

    while (row.firstElementChild) speakerDiv.append(row.firstElementChild);

    [...speakerDiv.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'speaker-image';
      } else {
        div.className = 'speaker-content';
      }
    });

    parentDiv.append(speakerDiv);
  });

  const headingEl = document.createElement('h2');
  headingEl.textContent = headingText;
  headingEl.className = 'heading';

  block.textContent = '';
  block.append(headingEl);
  block.append(parentDiv);
}
