import { } from '../../scripts/aem.js';
import {} from '../../scripts/scripts.js';
import decorateSpeaker from '../speaker/speaker.js';

export default async function decorate(block) {
  let headingText = '';
  const parentDiv = document.createElement('div');
  parentDiv.className = 'speaker-container';

  // iterate top-level rows (do not mutate block yet)
  const rows = Array.from(block.children);

  // Process rows sequentially to preserve DOM order; could be parallel too.
  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];

    if (index === 0) {
      // keep original behavior
      block.id = `${row.textContent.trim()}-content`;
      if (block.parentElement) {
        block.parentElement.classList.add('tabs-container-wrapper');
      }
    } else if (index === 1) {
      headingText = row.textContent.trim();
    } else {
      decorateSpeaker(row);
    }
  }

  const headingEl = document.createElement('h2');
  headingEl.textContent = headingText;
  headingEl.className = 'heading';

  // Replace original block content (safe now — clones were prepared and images decoded)
  block.textContent = '';
  block.append(headingEl);
  block.append(parentDiv);
}
