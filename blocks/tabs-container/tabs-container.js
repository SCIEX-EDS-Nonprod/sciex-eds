import {} from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
export default async function decorate(block) {
  const blockDiv = document.createElement('div');
  blockDiv.classList.add('technotes-main');

  [...block.children].forEach((row, rowIndex) => {
    console.log(`Processing row index: ${rowIndex}`);
    if (rowIndex === 0) {
      block.id = `${row.textContent.trim().replace(/\s+/g, '-')}-content`;
    } else {
      const pic = row.querySelector('picture');
      const div = document.createElement('div');
      div.classList.add('tech-note');
      if (pic) {
        [...row.children].forEach((col, colIndex) => {
          const inputDiv = document.createElement('div');
          console.log(`Processing column index: ${colIndex}>>>>${col.innerHTML}`);
          if (colIndex === 0 || colIndex === 1) {
            const ele = col;
            inputDiv.innerHTML = ele ? ele.innerHTML : '';
            div.append(inputDiv);
          } else if (colIndex === 2) {
            div.style.backgroundColor = col.textContent.trim().replace(/\s+/g, ' ');
          } else {
            const imagePos = col.textContent.trim().replace(/\s+/g, '-');
            div.classList.add(imagePos);
          }
          moveInstrumentation(row,div);
          blockDiv.append(div);
        });
      } else {
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('other-content');
        contentDiv.innerHTML = row.innerHTML;
        moveInstrumentation(row,contentDiv);
        blockDiv.append(contentDiv);
      }
    }
  });
  block.textContent = '';
  block.append(blockDiv);
}
