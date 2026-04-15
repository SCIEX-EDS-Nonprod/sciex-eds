import '../../scripts/aem.js';

export default function decorate(block) {
  const children = Array.from(block.children);
  const versionId = children[0];
  const body = children[5];
  const title = children[8];
  const createdDate = children[10];
  const tagNames = children[13];

  const blockId = versionId?.textContent?.trim() || 'knowledge-base-article';

  // Main container
  const container = document.createElement('div');
  container.className = 'kba-container';

  // Parse rich HTML body safely
  const bodyWrapper = document.createElement('div');
  bodyWrapper.innerHTML = body?.innerHTML || '';
  const bodyText = bodyWrapper.querySelector('p')?.textContent || '';
  // =========================
  // Header
  // =========================
  const header = document.createElement('div');
  header.className = 'kba-header';

  const heading = document.createElement('h2');
  heading.textContent = title?.textContent || '';

  const statusWrapper = document.createElement('div');

  const published = document.createElement('span');
  published.className = 'status';
  published.textContent = `Published Date : ${
    createdDate?.textContent || ''
  }`;

  const rating = document.createElement('span');
  rating.className = 'status';
  rating.textContent = ' | Rating: ';

  statusWrapper.append(published, rating);
  header.append(heading, statusWrapper);

  // =========================
  // Body
  // =========================
  const bodyContent = document.createElement('div');
  bodyContent.className = 'kba-body-content';

  const bodyDiv = document.createElement('div');
  bodyDiv.className = 'kba-body';
  bodyDiv.innerHTML = bodyWrapper.innerHTML;

  bodyContent.append(bodyDiv);

  // =========================
  // Details section
  // =========================
  const details = document.createElement('div');
  details.className = 'kba-section';

  const detailsHeading = document.createElement('h3');
  detailsHeading.className = 'kba-details';
  detailsHeading.textContent = 'Details';
  const detailsRelatedText = document.createElement('p');
  detailsRelatedText.textContent = `Related to : ${tagNames?.textContent || ''}`;

  const detailsText = document.createElement('p');
  detailsText.textContent = `Note : ${bodyText || ''}`;

  details.append(detailsHeading, detailsRelatedText, detailsText);

  container.append(header, bodyContent, details);

  block.textContent = '';
  block.append(container);

  block.id = `${blockId}-content`;
  block.className = 'knowledge-base-article';
}
