import decorateSessionTimeline from '../session-timeline/session-timeline.js';
import decorateEventDetails from '../events-details/events-details.js';
import decorateRegisterForm from '../events-register-form/events-register-form.js';

export default function decorate(block) {
  const rows = [...block.children];
  const leftCol = document.createElement('div');
  const rightCol = document.createElement('div');

  leftCol.classList.add('column-left');
  rightCol.classList.add('column-right');
  block.classList.add('two-column-layout');

  rows.forEach((row) => {
    const type = row.querySelector('p')?.textContent?.toLowerCase()?.trim();
    switch (type) {
      case 'eventcontainer':
        block.id = row.textContent;
        break;
      case 'vertical':
        block.classList.add('vertical-layout');
        break;
      case 'horizontal':
        block.classList.add('horizontal-layout');
        break;
      case 'sessiontimeline':
        decorateSessionTimeline(row);
        leftCol.appendChild(row);
        break;
      case 'details':
        decorateEventDetails(row);
        rightCol.appendChild(row);
        break;
      case 'registerform':
        decorateRegisterForm(row);
        rightCol.appendChild(row);
        break;
      default:
        leftCol.appendChild(row);
        break;
    }
  });

  block.innerHTML = '';
  block.append(leftCol, rightCol);
}
