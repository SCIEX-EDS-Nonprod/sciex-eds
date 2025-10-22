import { createOptimizedPicture, decorateIcons } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { span } from '../../scripts/dom-builder.js';

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
  let descEl = '';
  if (descriptionText && descriptionText.trim() !== '') {
    descEl = document.createElement('h4');
    descEl.className = 'switch-tabs-description';
    descEl.textContent = descriptionText.trim();
  }

  switchTabContainer.append(headingEl, descEl);

  const tabHeader = document.createElement('div');
  tabHeader.className = 'tab-header';

  const dropdown = document.createElement('select');
  dropdown.className = 'tab-dropdown';

  const tabContent = document.createElement('div');
  tabContent.className = 'tab-content';

  // --- Build tabs ---
  rows.slice(3).forEach((row, index) => {
    const tabRows = [...row.children];
    if (!tabRows.length) return;

    const tabName = tabRows[0]?.textContent.trim() || '';
    const tabPicture = tabRows[1]?.querySelector('picture');
    const pictureDescription = tabRows[2]?.textContent.trim() || '';
    const altText = tabRows[3]?.textContent.trim() || '';
    const tabHeading = tabRows[4]?.textContent.trim() || '';
    const tabDescription = tabRows[5]?.innerHTML || '';
    const tabLinkLabel = tabRows[6]?.textContent.trim() || '';
    const tabLinkAnchor = tabRows[7]?.querySelector('a');
    const tabTarget = tabRows[8]?.textContent.trim() || '_self';

    // --- Header Button (Desktop) ---
    const tabButton = document.createElement('button');
    tabButton.className = 'tab-title';
    tabButton.textContent = tabName;
    if (index === 0) tabButton.classList.add('active');
    tabHeader.append(tabButton);

    // --- Dropdown Option (Mobile) ---
    const option = document.createElement('option');
    option.value = index;
    option.textContent = tabName;
    dropdown.append(option);

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

    const chevronRight = span({
      class:
        'icon icon-chevron-right tw-ml-8 tw-duration-500 group-hover:tw-pl-2',
    });

    if (tabLinkAnchor) {
      const a = document.createElement('a');
      a.href = tabLinkAnchor.href;
      a.target = tabTarget;
      a.textContent = tabLinkLabel || 'Learn more >';
      a.className = 'tab-link';
      a.append(chevronRight);
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
        optimizedPic.setAttribute('data-description', pictureDescription);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        tabPanel.append(optimizedPic);
      }
    }
    decorateIcons(tabPanel);
    tabContent.append(tabPanel);
  });

  // --- Switching logic ---
  const tabButtons = tabHeader.querySelectorAll('.tab-title');
  const tabPanels = tabContent.querySelectorAll('.tab-panel');

  const activateTab = (index) => {
    tabButtons.forEach((b) => b.classList.remove('active'));
    tabPanels.forEach((p) => p.classList.remove('active'));
    if (tabButtons[index]) tabButtons[index].classList.add('active');
    if (tabPanels[index]) tabPanels[index].classList.add('active');
    dropdown.value = index;
  };

  tabButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => activateTab(idx));
  });

  dropdown.addEventListener('change', (e) => {
    const idx = parseInt(e.target.value, 10);
    activateTab(idx);
  });

  switchTabContainer.append(tabHeader, dropdown, tabContent);

  // Replace original block content
  block.textContent = '';
  block.id = `${id}-content`;
  block.parentElement.classList.add('tabs-container-wrapper');
  block.append(switchTabContainer);
}
