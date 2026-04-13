export default function decorate(block) {
  console.log('Decorating course-catalog-detail block', block.children);
  const children = Array.from(block.children);
  if (children.length < 2) {
    return;
  }
  const contentEl = children[1];

  // Extract values
  const content = contentEl?.textContent?.trim();

  const container = document.createElement('div');
  container.innerHTML = content;
  block.textContent = '';
  block.append(container);

}