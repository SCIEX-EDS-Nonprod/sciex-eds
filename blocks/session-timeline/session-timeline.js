import { decorateIcons } from '../../scripts/aem.js';
import { span } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const div = document.createElement('div');
  div.classList.add('session-timeline');

  const rows = [...block.children];
  rows.forEach((row, index) => {
    if (index === 0) {
      div.id = row.children[0].textContent;
    } else if (index === 1) {
      const title = document.createElement('div');
      title.classList.add('session-timeline-text');
      title.textContent = row.children[0].textContent;
      div.appendChild(title);
    } else {
      const ul = row.querySelector('div > ul');

      if (ul) {
        [...ul.children].forEach((li) => {
          const clock = document.createElement('div');
          clock.appendChild(span({ class: `icon icon-clock` }));
         

          const strong = li.querySelector('strong');
          if (strong) {
            const timeRow = document.createElement('div');
            timeRow.className = 'time-row';

            // Move text node after <strong> into span
            let nextNode = strong.nextSibling;
            let sessionText = '';
            while (nextNode && nextNode.nodeType === Node.TEXT_NODE) {
              sessionText += nextNode.textContent;
              const toRemove = nextNode;
              nextNode = nextNode.nextSibling;
              li.removeChild(toRemove);
            }

            const sessionInfo = document.createElement('span');
            sessionInfo.className = 'event-organizer';
            sessionInfo.textContent = sessionText.trim();

            // Assemble time-row
            timeRow.appendChild(clock);
            timeRow.appendChild(strong);
            timeRow.appendChild(sessionInfo);

            li.insertBefore(timeRow, li.firstChild);
            const title = li.querySelector('ul > li');
            title.classList.add('session-title');
            console.log('li >', li.outerHTML);
          }
        });
      }
      decorateIcons(ul);
      div.append(ul);
    }
  });
  block.classList.add('session-timeline');
  block.textContent = '';
  block.append(div);
}
