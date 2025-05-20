import { } from '../../scripts/aem.js';

export default async function decorate(block) {
  let blockId = block.children[0].textContent;
  if (blockId && blockId.trim() !== '') {
    blockId = blockId.trim();
  } else {
    blockId = 'sciex-text';
  }
  let alignment = block.children[1].textContent;
  if (alignment && alignment.trim() !== '') {
    alignment = alignment.trim();
  } else {
    alignment = 'text-left';
  }
  const content = block.children[2];
  block.id = `${blockId}-content`;
  block.parentElement.classList.add('tabs-container-wrapper');
  content.className = alignment;

  block.textContent = '';
  block.append(content);
}
