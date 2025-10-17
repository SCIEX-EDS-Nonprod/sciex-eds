import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const switchTabContainer = document.createElement('div');
  switchTabContainer.className = 'switch-tabs-container';
  moveInstrumentation(block, switchTabContainer);

  const rows = [...block.children];
  let id = '';
  let headingText = '';
  let descriptionText = '';

  // Extract meta info
  rows.forEach((row, index) => {
    const text = row.textContent.trim();
    if (index === 0) id = text;
    else if (index === 1) headingText = text;
    else if (index === 2) descriptionText = text;
  });

  // Heading and description
  const headingEl = document.createElement('h2');
  headingEl.className = 'switch-tabs-heading';
  headingEl.textContent = headingText;

  const descEl = document.createElement('p');
  descEl.className = 'switch-tabs-description';
  descEl.textContent = descriptionText;

  switchTabContainer.append(headingEl, descEl);

  const tabHeader = document.createElement('div');
  tabHeader.className = 'tab-header';

  const tabContent = document.createElement('div');
  tabContent.className = 'tab-content';

  // Build tabs
  // Build tabs
rows.slice(3).forEach((row, index) => {
  const tabRows = [...row.children];
  if (!tabRows.length) return;

  const tabName = tabRows[0]?.textContent.trim() || '';
  const tabPicture = tabRows[1]?.querySelector('picture');
  const altText = tabRows[2]?.textContent.trim() || '';
  const tabHeading = tabRows[3]?.textContent.trim() || '';
  const tabDescription = tabRows[4]?.innerHTML || '';
  const tabLinkLabel = tabRows[5]?.textContent.trim() || '';
  const tabLinkAnchor = tabRows[6]?.querySelector('a');
  const tabTarget = tabRows[7]?.textContent.trim() || '_self';

  // --- Header Button ---
  const tabButton = document.createElement('button');
  tabButton.className = 'tab-title';
  tabButton.textContent = tabName;
  if (index === 0) tabButton.classList.add('active');
  tabHeader.append(tabButton);

  // --- Content Panel ---
  const tabPanel = document.createElement('div');
  tabPanel.className = 'tab-panel';
  if (index === 0) tabPanel.classList.add('active');
  moveInstrumentation(row, tabPanel);

  const tabBody = document.createElement('div');
  tabBody.className = 'tab-body';

  if (tabHeading) {
    const h2 = document.createElement('h2');
    h2.textContent = tabHeading;
    tabBody.append(h2);
  }

  if (tabDescription) {
    const descWrap = document.createElement('div');
    descWrap.className = 'tab-description';
    descWrap.innerHTML = tabDescription;
    tabBody.append(descWrap);
  }

  if (tabLinkAnchor) {
    const a = document.createElement('a');
    a.href = tabLinkAnchor.href;
    a.target = tabTarget;
    a.textContent = tabLinkLabel || 'Learn more >';
    a.className = 'tab-link';
    tabBody.append(a);
  }

  tabPanel.append(tabBody);

  if (tabPicture) {
    const img = tabPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(
        img.src,
        altText || img.alt,
        false,
        [{ width: '750' }],
      );
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      tabPanel.append(optimizedPic);
    }
  }

  tabContent.append(tabPanel);
});


  // --- Switching logic ---
  const tabButtons = tabHeader.querySelectorAll('.tab-title');
  const tabPanels = tabContent.querySelectorAll('.tab-panel');

  tabButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      tabPanels.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      tabPanels[idx].classList.add('active');
    });
  });

  switchTabContainer.append(tabHeader, tabContent);

  // Replace original block content
  block.textContent = '';
  block.id = `${id}-content`;
  block.parentElement.classList.add('tabs-container-wrapper');
  block.append(switchTabContainer);
}
