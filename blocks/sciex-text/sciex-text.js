import { } from '../../scripts/aem.js';

export default async function decorate(block) {
  let alignment = block.children[0].textContent;
  if (alignment && alignment.trim() !== '') {
    alignment = `text-${alignment.trim()}`;
  } else {
    alignment = 'text-left';
  }
  const content = block.children[1];
  content.className = alignment;

  block.textContent = '';
  block.append(content);
}
