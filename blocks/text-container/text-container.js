import {} from '../../scripts/aem.js';
import {moveInstrumentation} from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row, index) => {
    const li = document.createElement('li');
    if (index === 1 && row.textContent.includes('2')) {
      console.log('1');
      ul.classList.add('text-container-header', 'text-container-columns');
    } else if (index === 1 && row.textContent.includes('1')) {
      console.log('2');
      ul.classList.remove('text-container-header', 'text-container-columns');
    } else if (index > 1) {
      console.log('3');
      const children = [...row.children];

      const column = document.createElement('div');
      column.className = 'text-container-column';
      console.log('4');
      // Title
      const title = children[0]?.textContent?.trim();
      if (title) {
        const h2 = document.createElement('h2');
        h2.className = `text-container-heading ${children[2]?.textContent?.trim()}`;
        h2.textContent = title;
        column.appendChild(h2);
      }
      console.log('5');
      // Sub Heading
      const subheading = children[1]?.textContent?.trim();
      if (subheading) {
        const p = document.createElement('p');
        p.className = `text-container-description ${children[2]?.textContent?.trim()}`;
        p.textContent = subheading;
        column.appendChild(p);
      }
      console.log('6');
      // Description
      const desc = children[3]?.textContent?.trim();
      if (desc) {
        const p = document.createElement('p');
        p.className = `text-container-description ${children[4]?.textContent?.trim()}`;
        p.textContent = desc;
        column.appendChild(p);
      }
      console.log('7');
      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'button-block';
      for (let i = 5; i + 3 < children.length; i += 4) {
        const label = children[i]?.textContent?.trim();
        const alt = children[i + 1]?.textContent?.trim();
        const link = children[i + 2]?.querySelector('a');
        const target = children[i + 3]?.textContent?.trim();
        console.log('8');
        if (link && label) {
          const a = document.createElement('a');
          a.href = link.getAttribute('href') || '#';
          a.textContent = label;
          a.title = alt || label;
          a.className = 'button-block';
          if (i === 5) {
            a.className = 'button primary';
          } else if (i === 9) {
            a.className = ' button secondary';
          } else if (i === 13) {
            a.className = ' link';
            const span = document.createElement('span');
            span.id = 'right-arrow';
            span.className = 'icon';
            a.appendChild(span);
          }
          console.log('9');
          if (target) a.setAttribute('target', target);

          const wrapper = document.createElement('div');
          // wrapper.className = 'text-container-button-wrapper';
          wrapper.appendChild(a);

          buttonGroup.appendChild(wrapper);
        }
      }
      console.log('10');
      if (buttonGroup.children.length > 0) {
        column.appendChild(buttonGroup);
      }
      li.append(column);
       moveInstrumentation(row, li);
      ul.append(li);
    }
  });
  console.log('11');
  block.textContent = '';
  block.append(ul);
  console.log('12');
}
