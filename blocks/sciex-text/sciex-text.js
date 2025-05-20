import { } from '../../scripts/aem.js';

export default async function decorate(block) {
  let blockId = block.children[0].textContent;
  if (blockId && blockId.trim() !== '') {
    blockId = blockId.trim();
  } else {
    blockId = 'abstract';
  }
  let alignment = block.children[1].textContent;
  if (alignment && alignment.trim() !== '') {
    alignment = alignment.trim();
  } else {
    alignment = 'text-left';
  }
  const content = block.children[2];
  content.id = blockId;
  content.className = alignment;

  block.textContent = '';
  block.append(content);
}
