import {} from '../../scripts/aem.js';
import {} from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const wrapper = document.createElement('div');
  wrapper.classList.add('resources-grid-wrapper');
  const headingRow = rows[0];
  if (headingRow) {
    const headingText = headingRow.querySelector('p')?.textContent || '';
    if (headingText) {
      const heading = document.createElement('h3');
      heading.classList.add('resources-grid-heading');
      heading.textContent = headingText;
      wrapper.append(heading);
    }
  }
  const grid = document.createElement('div');
  grid.classList.add('resources-grid');
  wrapper.append(grid);
  // block.textContent = '';
  block.append(wrapper);
}
