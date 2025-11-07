import { decorateIcons } from '../../scripts/aem.js';

const resourceTypeIcons = {
  techDoc: '<svg width="24" height="24"><rect width="24" height="24" fill="#0072C6"/></svg>',
  webpage: '<svg width="24" height="24"><circle cx="12" cy="12" r="10" fill="#1E88E5"/></svg>',
  customerDoc: '<svg width="24" height="24"><path d="M4 4h16v16H4z" fill="#43A047"/></svg>',
  play: '<svg width="24" height="24"><polygon points="6,4 20,12 6,20" fill="#E53935"/></svg>',
  courseCatalog: '<svg width="24" height="24"><rect width="24" height="12" y="6" fill="#FB8C00"/></svg>',
  resourceLibrary: '<svg width="24" height="24"><path d="M3 3h18v18H3z" fill="#8E24AA"/></svg>',

};

function createGridItem(itemData) {
  const {
    style, resourceType, heading, textArea, textLinkDestination, textLinkTarget,
  } = itemData;

  const li = document.createElement('li');
  li.className = `resource-card ${style || 'grey'}`;

  // icon + heading
  const iconWrapper = document.createElement('div');
  iconWrapper.className = 'resource-card-icon';
  iconWrapper.innerHTML = resourceTypeIcons[resourceType] || '';

  const headingEl = document.createElement('h3');
  headingEl.className = 'resource-card-heading';
  headingEl.textContent = heading;

  // text
  const textEl = document.createElement('div');
  textEl.className = 'resource-card-text';
  textEl.innerHTML = textArea;

  // link
  const linkEl = document.createElement('a');
  linkEl.className = 'resource-card-link';
  linkEl.href = textLinkDestination || '#';
  linkEl.target = textLinkTarget || '_self';
  linkEl.innerHTML = `
    Learn more 
    <span class="icon icon-arrow-right">
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path fill="currentColor" d="M10 17l5-5-5-5v10z"/>
      </svg>
    </span>
  `;

  li.append(iconWrapper, headingEl, textEl, linkEl);
  return li;
}

export default function decorate(block) {
  const gridData = window.resourcesGridData || {
    heading: 'Resources',
    headingSize: 'text-delta',
    textArea: 'Browse our collection of technical resources.',
    items: [
      {
        style: 'grey',
        resourceType: 'techDoc',
        heading: 'Technical Note',
        textArea: 'A detailed technical overview of our latest release.',
        textLinkDestination: '/content/resources/tech-note.html',
        textLinkTarget: '_blank',
      },
      {
        style: 'white',
        resourceType: 'webpage',
        heading: 'Upcoming Webinar',
        textArea: 'Join our experts for an in-depth session.',
        textLinkDestination: '/content/resources/webinar.html',
        textLinkTarget: '_self',
      },
    ],
  };

  // heading
  const headingEl = document.createElement('h2');
  headingEl.className = gridData.headingSize || 'text-delta';
  headingEl.textContent = gridData.heading;

  // text area
  const introEl = document.createElement('div');
  introEl.className = 'resources-grid-intro';
  introEl.innerHTML = gridData.textArea;

  // grid list
  const ul = document.createElement('ul');
  ul.className = 'resources-grid-list';

  gridData.items.forEach((item) => {
    ul.appendChild(createGridItem(item));
  });

  // build block
  block.innerHTML = '';
  block.append(headingEl, introEl, ul);

  decorateIcons(block);
}
