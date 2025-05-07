import { } from '../../scripts/aem.js';

export function decorate(block) {
  const title = block.querySelector('p'); // e.g. "Session Timeline"
  const list = block.querySelector('ul');
console.log('123');
  if (title) title.classList.add('sessiontimeline-title');
  if (list) list.classList.add('sessiontimeline-list');

  block.classList.add('sessiontimeline');
}
