import {
  table, thead, tbody, tr, th, td,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  // Convert block div structure to proper HTML table
  const rows = [...block.children];
  if (rows.length === 0) return;

  // Create table structure
  const tableEl = table({ class: 'eds-table' });
  const theadEl = thead();
  const tbodyEl = tbody();

  // First row becomes the header
  if (rows[0]) {
    const headerRow = tr({ class: 'table-header-row' });
    const headerCells = [...rows[0].children];

    headerCells.forEach((cell, index) => {
      const thEl = th({ class: `table-header-cell col-${index + 1}` });
      thEl.innerHTML = cell.innerHTML;
      headerRow.appendChild(thEl);
    });

    theadEl.appendChild(headerRow);
  }

  // Remaining rows become body rows
  rows.slice(1).forEach((row, rowIndex) => {
    const bodyRow = tr({ class: `table-body-row row-${rowIndex + 1}` });
    const cells = [...row.children];

    cells.forEach((cell, cellIndex) => {
      const tdEl = td({ class: `table-body-cell col-${cellIndex + 1}` });
      tdEl.innerHTML = cell.innerHTML;

      // Check if cell contains highlighted content (numbers, special formatting)
      const cellText = cell.textContent.trim();
    //  if (/^\d+$/.test(cellText) && parseInt(cellText) > 1000) {
        tdEl.classList.add('table-highlight-cell');
     // }

      bodyRow.appendChild(tdEl);
    });

    tbodyEl.appendChild(bodyRow);
  });

  tableEl.appendChild(theadEl);
  tableEl.appendChild(tbodyEl);

  // Replace block content with table
  block.innerHTML = '';
  block.appendChild(tableEl);

  // Add responsive classes
  const colCount = rows[0] ? rows[0].children.length : 0;
  block.classList.add(`table-${colCount}-cols`);
}
