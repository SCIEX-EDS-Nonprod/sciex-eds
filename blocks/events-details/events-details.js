import { } from '../../scripts/aem.js';
import { span } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const div = document.createElement('div');
  const rows = [...block.children];
  rows.forEach((row, index) => {
    if (index === 0) {
      div.id = row.children[0].textContent;
    } else if (index === 1) {
      const title = document.createElement('div');
      title.classList.add('event-details-heading');
      title.textContent = row.children[0].textContent;
      div.appendChild(title);
    } else if (index === 2) {
      const fullDateTime = row.children[0].textContent.trim();

      // Check if it contains a 'T' to split
      if (fullDateTime.includes('T')) {
        const [date, time] = fullDateTime.split('T');

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('events-details-text', 'events-icontext');
        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
        dateDiv.textContent = formattedDate;

        const calendarIcon = document.createElement('img');
        calendarIcon.appendChild(span({ class: 'icon icon-clock' }));
        calendarIcon.alt = 'Calendar Icon';

        dateDiv.insertBefore(calendarIcon, dateDiv.firstChild);
        const timeDiv = document.createElement('div');
        timeDiv.id = 'event-time';
        timeDiv.classList.add('events-details-text', 'events-icontext');
        timeDiv.textContent = time;
        const clockIcon = document.createElement('img');
        clockIcon.id = 'blueClock';
        clockIcon.alt = 'Clock Icon';

        timeDiv.insertBefore(clockIcon, timeDiv.firstChild);
        div.appendChild(dateDiv);
        div.appendChild(timeDiv);
      } else {
        // Fallback if no 'T' in string
        const title = document.createElement('div');
        title.classList.add('events-details-text', 'events-icontext');
        title.textContent = fullDateTime;
        div.appendChild(title);
      }
    } else if (index === 3) {
      const title = document.createElement('div');
      title.classList.add('events-details-text', 'events-icontext');
      title.textContent = row.children[0].textContent;

      const locationIcon = document.createElement('img');
      locationIcon.id = 'location';
      locationIcon.alt = 'Location Icon';

      title.insertBefore(locationIcon, title.firstChild);
      div.appendChild(title);
      const eventtime = div.querySelector('#event-time');
      if (eventtime) {
        div.appendChild(eventtime);
      }
    } else if (index === 4) {
      const buttonrow = document.createElement('div');
      buttonrow.classList.add('button-row');

      const button = document.createElement('button');
      button.classList.add('primary-button');
      button.appendChild(document.createTextNode(row.children[0].textContent));

      const anchor = document.createElement('a');
      // anchor.href = href;
      // anchor.title = title;
      // anchor.target = target;
      anchor.rel = 'noopener noreferrer';
      // anchor.classList.add('button-link');
      anchor.appendChild(button);
      buttonrow.appendChild(anchor);
      div.appendChild(buttonrow);
    } else if (index === 7) {
      const buttonrow = div.querySelector('.button-row');
      if (buttonrow) {
        const button = document.createElement('button');
        button.classList.add('secondary-button');
        button.appendChild(document.createTextNode(row.children[0].textContent));
        // button.appendChild(span({ class: `icon icon-${icon}` }));

        const anchor = document.createElement('a');
        // anchor.href = href;
        // anchor.title = title;
        // anchor.target = target;
        anchor.rel = 'noopener noreferrer';
        // anchor.classList.add('button-link');
        anchor.appendChild(button);
        buttonrow.appendChild(anchor);
      }
    }
  });
  block.classList.add('events-details');
  block.textContent = '';
  block.append(div);
}
