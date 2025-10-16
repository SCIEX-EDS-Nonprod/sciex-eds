import {} from '../../scripts/aem.js';
import {} from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.remove('loading');
  block.dataset.blockStatus = 'loaded';

  const rows = [...block.children];
  const columnData = rows.slice(2); // Skip the first two metadata rows

  // Clear original block content
  block.innerHTML = '';

  // Create column container
  const columnsWrapper = document.createElement('div');
  columnsWrapper.className = 'text-container-columns';

  columnData.forEach((col) => {
    const children = [...col.children];

    const column = document.createElement('div');
    column.className = 'text-container-column';

    // Title
    const title = children[0]?.textContent?.trim();
    if (title) {
      const h2 = document.createElement('h2');
      h2.className = 'text-container-heading';
      h2.textContent = title;
      column.appendChild(h2);
    }

    // Description
    const desc = children[1]?.textContent?.trim();
    if (desc) {
      const p = document.createElement('p');
      p.className = 'text-container-description';
      p.textContent = desc;
      column.appendChild(p);
    }

    // Buttons (from index 2 onward, every 4 items)
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-block';

    for (let i = 2; i + 3 < children.length; i += 4) {
      const label = children[i]?.textContent?.trim();
      const alt = children[i + 1]?.textContent?.trim();
      const link = children[i + 2]?.querySelector('a');
      const target = children[i + 3]?.textContent?.trim();

      if (link && label) {
        const a = document.createElement('a');
        a.href = link.getAttribute('href') || '#';
        a.textContent = label;
        a.title = alt || label;
        a.className = 'button-block';
        if (i === 2) {
          a.className = 'button primary';
        } else if (i === 6) {
          a.className = ' button secondary';
        } else if (i === 10) {
          a.className = ' button link';
        }
        if (target) a.setAttribute('target', target);

        const wrapper = document.createElement('div');
        wrapper.className = 'text-container-button-wrapper';
        wrapper.appendChild(a);

        buttonGroup.appendChild(wrapper);
      }
    }

    if (buttonGroup.children.length > 0) {
      column.appendChild(buttonGroup);
    }

    columnsWrapper.appendChild(column);
  });

  block.appendChild(columnsWrapper);
}
