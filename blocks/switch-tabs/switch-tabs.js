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
  moveInstrumentation(rows[1], headingEl);

  const descEl = document.createElement('p');
  descEl.className = 'switch-tabs-description';
  descEl.textContent = descriptionText;
  moveInstrumentation(rows[2], descEl);

  switchTabContainer.append(headingEl, descEl);

  const tabHeader = document.createElement('div');
  tabHeader.className = 'tab-header';
  moveInstrumentation(block, tabHeader);

  const tabContent = document.createElement('div');
  tabContent.className = 'tab-content';
  moveInstrumentation(block, tabContent);

  // Build tabs
  for (let i = 3; i < rows.length; i += 1) {
    const tabRows = [...rows[i].children];
    if (tabRows.length === 0) {
    // Skip empty rows without using 'continue'
    } else {
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
      if (i === 3) tabButton.classList.add('active');
      moveInstrumentation(tabRows[0], tabButton);
      tabHeader.append(tabButton);

      // --- Content Panel ---
      const tabPanel = document.createElement('div');
      tabPanel.className = 'tab-panel';
      if (i === 3) tabPanel.classList.add('active');
      moveInstrumentation(rows[i], tabPanel);

      // Add text content
      const tabBody = document.createElement('div');
      tabBody.className = 'tab-body';
      moveInstrumentation(rows[i], tabBody);

      if (tabHeading) {
        const h2 = document.createElement('h2');
        h2.textContent = tabHeading;
        moveInstrumentation(tabRows[3], h2);
        tabBody.append(h2);
      }

      if (tabDescription) {
        const descWrap = document.createElement('div');
        descWrap.className = 'tab-description';
        descWrap.innerHTML = tabDescription;
        moveInstrumentation(tabRows[4], descWrap);
        tabBody.append(descWrap);
      }

      if (tabLinkAnchor) {
        const a = document.createElement('a');
        a.href = tabLinkAnchor.href;
        a.target = tabTarget;
        a.textContent = tabLinkLabel || 'Learn more >';
        a.className = 'tab-link';
        moveInstrumentation(tabLinkAnchor, a);
        tabBody.append(a);
      }

      tabPanel.append(tabBody);

      // Add picture
      if (tabPicture) {
        const img = tabPicture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, altText || img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          tabPanel.append(optimizedPic);
        }
      }

      tabContent.append(tabPanel);
    }
  }
  // --- Switching logic ---
  const tabButtons = tabHeader.querySelectorAll('.tab-title');
  const tabPanels = tabContent.querySelectorAll('.tab-panel');

  tabButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      // Remove active state from all tabs
      tabButtons.forEach((b) => b.classList.remove('active'));
      tabPanels.forEach((p) => p.classList.remove('active'));

      // Activate clicked tab + panel
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
