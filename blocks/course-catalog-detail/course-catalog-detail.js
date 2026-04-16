export default function decorate(block) {
  const children = Array.from(block.children);
  if (children.length < 5) return;
console.log('Decorating course catalog detail block');
  const contentEl = children[4];
  const content = contentEl?.textContent?.trim();

  const container = document.createElement('div');
  container.classList.add('course-catalog-detail-container');
  container.innerHTML = content;

  // Find "Follow on courses" section
  const items = container.querySelectorAll('li');

  items.forEach(li => {
    const strong = li.querySelector('strong');

    if (strong && strong.textContent.includes('Follow on courses')) {
      const ul = li.querySelector('ul');

      if (ul) {
        const table = document.createElement('table');
        table.classList.add('course-table');

        Array.from(ul.children).forEach(childLi => {
          const tr = document.createElement('tr');

          const temp = document.createElement('div');
          temp.innerHTML = childLi.innerHTML;

          let fullText = temp.textContent;
          fullText = fullText.replace(/\u00A0/g, ' ');
          fullText = fullText.replace(/\s+/g, ' ').trim();

          const firstSpaceIndex = fullText.indexOf(' ');
          const code = fullText.slice(0, firstSpaceIndex).trim();

          let descHTML = temp.innerHTML.slice(firstSpaceIndex);
          descHTML = descHTML.replace(/&nbsp;/g, ' ');
          descHTML = descHTML.replace(/\s+/g, ' ').trim();

          const td1 = document.createElement('td');
          td1.textContent = code;

          const td2 = document.createElement('td');
          td2.innerHTML = descHTML; // keep formatting

          tr.append(td1, td2);
          table.appendChild(tr);
        });

        // Replace UL with TABLE
        li.replaceChild(table, ul);
      }
    }
  });

  block.textContent = '';
  block.append(container);
}