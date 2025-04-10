import {} from '../../scripts/aem.js';

function showTabContent(tabId) {
  const section = document.getElementById(`${tabId}-content`);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function showActiveTab() {
  const tabs = document.querySelectorAll('.tab-section');
  const tabContents = document.querySelectorAll('.tech-note-wrapper');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', function () {
      tabs.forEach((t) => t.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));
      this.classList.add('active');
      tabContents[index].classList.add('active');
    });
  });

  tabs[0].classList.add('active');
  tabContents[0].classList.add('active');
}

export default async function decorate(block) {
  const blockDiv = document.createElement('div');
  blockDiv.classList.add('tw', 'tabs-nav', 'tab-buttons', 'tw-bg-white');
  const tabData = document.createElement('div');
  tabData.classList.add('tab-data');
  [...block.children].forEach((row) => {
    const tabDIv = document.createElement('div');
    tabDIv.id = row.children[1].textContent;
    tabDIv.classList.add('tab-section');
    tabDIv.textContent = row.children[0].textContent;
    blockDiv.append(tabDIv);
    tabDIv.addEventListener('click', function () {
      showTabContent(this.id);
      showActiveTab();
    });
  });
  // block.textContent = '';
  // block.append(blockDiv);
  // block.append(tabData);
  block.replaceChildren(blockDiv, tabData);
}
