export default function decorate(block) {
  const rows = [...block.children];
  const headingRow = rows[0];
  const headingText = headingRow.querySelector('p')?.textContent;
   console.log('block',block)

  if (headingText) {
    const heading = document.createElement('h2');
    heading.className = 'featured-key-workflows-title';
    heading.textContent = headingText;
    block.before(heading);
  }

  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

 

  block.innerHTML = '';
  block.appendChild(grid);
}