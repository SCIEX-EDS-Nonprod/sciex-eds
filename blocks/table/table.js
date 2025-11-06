import {
  table, thead, tbody, tr, th, td,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;
  const tableEl = table({ class: 'eds-table' });
  const theadEl = thead();
  const tbodyEl = tbody();

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

  rows.slice(1).forEach((row, rowIndex) => {
    const bodyRow = tr({ class: `table-body-row row-${rowIndex + 1}` });
    const cells = [...row.children];

    cells.forEach((cell, cellIndex) => {
      const tdEl = td({ class: `table-body-cell col-${cellIndex + 1}` });
      tdEl.innerHTML = cell.innerHTML;
      tdEl.classList.add('table-highlight-cell');

      bodyRow.appendChild(tdEl);
    });

    tbodyEl.appendChild(bodyRow);
  });

  tableEl.appendChild(theadEl);
  tableEl.appendChild(tbodyEl);

  block.innerHTML = '';
  block.appendChild(tableEl);

  const colCount = rows[0] ? rows[0].children.length : 0;
  block.classList.add(`table-${colCount}-cols`);
}
