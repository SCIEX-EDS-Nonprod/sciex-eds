import { } from '../../scripts/aem.js'; // Leave if needed for AEM-specific setup
import renderUpcoming from '../../scripts/events-page/components/upcoming-event.js';
import renderOnDemand from '../../scripts/events-page/components/on-demand-event.js';
import renderEventSearchBox from '../../scripts/events-page/components/renderEventSeachBox.js';
import { eventSearchEngine } from '../../scripts/events-page/event-engine.js';

export default async function decorate(block) {
  const eventsDiv = document.createElement('div');
  eventsDiv.id = 'events';

  const modal = document.createElement('div');
  modal.id = 'event-filter-modal';
  modal.className = 'event-modal hidden';
  document.body.appendChild(modal);

  // Create tab navigation
  const nav = document.createElement('nav');
  nav.className = 'tab-nav';

  const tabs = document.createElement('div');
  tabs.className = 'tabs';

  const tabUpcoming = document.createElement('button');
  tabUpcoming.className = 'tab active';
  tabUpcoming.dataset.tab = 'upcoming';
  tabUpcoming.textContent = 'Upcoming events';

  const tabOnDemand = document.createElement('button');
  tabOnDemand.className = 'tab';
  tabOnDemand.dataset.tab = 'on-demand';
  tabOnDemand.textContent = 'On-demand';

  tabs.appendChild(tabUpcoming);
  tabs.appendChild(tabOnDemand);

  const searchBox = renderEventSearchBox();

  nav.appendChild(tabs);
  nav.appendChild(searchBox);
  eventsDiv.appendChild(nav);

  // Render and store references to section containers
  let upcomingSection = renderUpcoming();
  let onDemandSection = renderOnDemand();

  eventsDiv.appendChild(upcomingSection);
  eventsDiv.appendChild(onDemandSection);

  // Tab switching logic
  eventsDiv.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      eventsDiv.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      eventsDiv.querySelectorAll('.event-details').forEach((section) => section.classList.remove('active'));

      tab.classList.add('active');
      const tabName = tab.dataset.tab;
      const target = eventsDiv.querySelector(`#${tabName}`);
      if (target) target.classList.add('active');
    });
  });

  localStorage.removeItem('searchTerm');

  block.textContent = '';
  block.append(eventsDiv);

  try {
    eventSearchEngine.executeFirstSearch();
    eventSearchEngine.subscribe(() => {
      const newUpcoming = renderUpcoming();
      const newOnDemand = renderOnDemand();
      // renderEventSearchBox();

      eventsDiv.replaceChild(newUpcoming, upcomingSection);
      eventsDiv.replaceChild(newOnDemand, onDemandSection);

      upcomingSection = newUpcoming;
      onDemandSection = newOnDemand;
    });
  } catch (error) {
    eventSearchEngine.executeFirstSearch();
  }
}
