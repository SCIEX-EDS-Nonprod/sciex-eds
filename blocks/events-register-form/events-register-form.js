import { } from '../../scripts/aem.js';

export default async function decorate(block) {
  const eventsDiv = document.createElement('div');
  eventsDiv.id = 'events-register-form';
  block.append(eventsDiv);
}
