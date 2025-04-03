import {} from '../../scripts/aem.js';

export default async function decorate(block) {
  const blockDiv = document.createElement('div');
  blockDiv.classList.add('technotes-container');

  [...block.children].forEach((row, index) => {
    if (index === 0) {
      blockDiv.id = `${row.textContent.trim().replace(/\s+/g, ' ')}-content`;
    }
  });
  block.textContent = '';
  block.append(blockDiv);
}
