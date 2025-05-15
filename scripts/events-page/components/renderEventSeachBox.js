import { eventSearchBoxController } from '../controller/event-page-controllers.js';

export default function renderEventSearchBox() {
  const searchBox = document.createElement('div');
  searchBox.className = 'event-search-box';
  searchBox.innerHTML = '<input type="text" placeholder="Search" />';
  searchBox.id = 'eventSearch';

  searchBox.addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
      eventSearchBoxController.updateText(query);
      eventSearchBoxController.showSuggestions();
    } else {
      eventSearchBoxController.updateText('');
    }
  });

  searchBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      eventSearchBoxController.submit();
    }
  });

  searchBox.addEventListener('input', () => {
    if (eventSearchBoxController.state.value === '') {
      eventSearchBoxController.clear();
      eventSearchBoxController.submit();
    }
  });

  return searchBox;
}
