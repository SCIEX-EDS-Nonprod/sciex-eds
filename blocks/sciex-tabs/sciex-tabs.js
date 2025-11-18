import { div, button } from '../../scripts/dom-builder.js';

/* eslint-disable no-unused-expressions */
function toggleTabs(tabId, mmgTabs, tabType, tabs) {
  const contentSections = document.querySelectorAll('[data-tabname]');
  contentSections.forEach((section) => {
    if (section.dataset.tabname === tabId) {
      section.classList.remove('hide-section');
    } else if (tabs.includes(section.dataset.tabname)) {
      section.classList.add('hide-section');
    }
  });
  const tabss = mmgTabs.querySelectorAll('.tab');
  tabss.forEach((tab) => {
    if (tab.id === tabId) {
      if (tabType === 'product-tabs') {
        tab.classList.add('active', 'border-b-8', 'border-[#ff7223]');
      } else if (tabType === 'content-tabs') {
        tab.classList.add('active', 'border-b-4', 'border-[#ff7223]');
      } else {
        tab.classList.add('bg-black', 'text-white');
      }
      tab.classList.remove('bg-white', 'text-black');
    } else {
      if (tabType === 'product-tabs') {
        tab.classList.remove('active', 'border-b-8', 'border-[#ff7223]');
      } else if (tabType === 'content-tabs') {
        tab.classList.remove('active', 'border-b-4', 'border-[#ff7223]');
      } else {
        tab.classList.remove('bg-black', 'text-white');
      }
      tab.classList.add('bg-white', 'text-black');
    }
  });
}

function getTabName(block) {
  const tabName = new Set();
  const parentEl = block.parentElement.parentElement;
  let sectionEl = parentEl.nextElementSibling;
  while (sectionEl && sectionEl !== undefined) {
    sectionEl = sectionEl.nextElementSibling;
    if (sectionEl && sectionEl.dataset.tabname === undefined) {
      break;
    } else {
      const tabSection = sectionEl?.dataset;
      if (tabSection && tabSection.tabname !== undefined) tabName.add(tabSection.tabname);
    }
  }
  return [...tabName];
}

function decorateButtonTabs(block) {
  const mmgTabs = div({ class: 'button-tabs flex flex-wrap gap-6' });
  const tabs = getTabName(block);
  tabs.forEach((tab) => {
    const buttonTab = button({
      class: 'tab px-6 py-2 border border-black border-solid bg-white text-black font-bold rounded-full',
      id: tab,
    }, tab);
    mmgTabs.appendChild(buttonTab);
    buttonTab.addEventListener('click', () => {
      toggleTabs(tab, mmgTabs, 'button-tabs', tabs);
    });
  });
  block.innerHTML = '';
  block.appendChild(mmgTabs);
  toggleTabs(tabs[0], mmgTabs, 'button-tabs', tabs);
}

export default async function decorate(block) {
  if (block.classList.contains('button-tabs')) decorateButtonTabs(block);
}
