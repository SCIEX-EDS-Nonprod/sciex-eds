import { eventResultsListController } from '../controller/event-page-controllers.js';
import renderEventFacets from './renderEventFacets.js';
import renderEventList from './renderEventList.js';

export default function renderUpcoming() {
  const section = document.createElement('section');
  section.className = 'event-details';
  section.id = 'on-demand';

  const eventHeader = document.createElement('div');
  eventHeader.className = 'event-header';

  const title = document.createElement('div');
  title.className = 'event-title';
  title.textContent = 'On-demand events';

  const { filterSection, mobileButton } = renderEventFacets();

  eventHeader.appendChild(title);
  eventHeader.appendChild(filterSection);
  eventHeader.appendChild(mobileButton);

  section.append(eventHeader, renderEventList(eventResultsListController, 'on-demand'));

  return section;
}
