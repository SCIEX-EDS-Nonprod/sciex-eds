import { } from '../../scripts/aem.js';

export default async function decorate(block) {
  const eventsDiv = document.createElement('div');
  eventsDiv.id = 'hero-banner';
  block.append(eventsDiv);
}
