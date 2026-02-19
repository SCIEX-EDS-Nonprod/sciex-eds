import { span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function extractBlockData(block) {
  const cells = [...block.querySelectorAll(':scope > div')];

  const data = {
    heading: cells[1]?.innerText?.trim(),
    description: cells[2]?.innerText?.trim(),
    mainPicture: cells[14]?.querySelector('picture'),
    videoAnchor: cells[14]?.querySelector('a'),
    buttonDataList: [],
  };

  for (let i = 3; i < 12; i += 3) {
    const label = cells[i]?.innerText?.trim();
    const link = cells[i + 1]?.querySelector('a')?.getAttribute('href');
    const target = cells[i + 2]?.innerText?.trim() || '_self';

    if (label && link) {
      data.buttonDataList.push({ label, link, target });
    }
  }

  return data;
}

function buildStandardHero(data, container) {
  container.classList.add('herosmallclass');

  const wrapper = document.createElement('div');
  wrapper.className = 'hero-wrapper';

  const content = document.createElement('div');
  content.className = 'hero-content';

  if (data.heading) {
    const h2 = document.createElement('h2');
    h2.className = 'hero-heading-hero';
    h2.textContent = data.heading;
    content.appendChild(h2);
  }

  if (data.description) {
    const p = document.createElement('p');
    p.className = 'hero-description';
    p.textContent = data.description;
    content.appendChild(p);
  }

  if (data.buttonDataList.length) {
    const buttons = document.createElement('div');
    buttons.className = 'hero-buttons';

    data.buttonDataList.forEach((btn, index) => {
      const a = document.createElement('a');
      a.href = btn.link;
      a.target = btn.target;
      a.className =
        index === 0 ? 'button primary' :
        index === 1 ? 'button secondary' :
        'button link';

      a.append(span({}, btn.label));
      a.append(span({ class: 'icon icon-arrow' }));

      buttons.appendChild(a);
    });

    decorateIcons(buttons);
    content.appendChild(buttons);
  }

  wrapper.appendChild(content);

  if (data.mainPicture) {
    const imgSrc = data.mainPicture.querySelector('img')?.src;
    if (imgSrc) {
      container.style.backgroundImage = `url('${imgSrc}')`;
      container.classList.add('hero-has-bg');
    }
  }

  container.appendChild(wrapper);
}

function buildContactHero(data, container) {
  container.classList.add('hero-contact-container');

  if (data.mainPicture) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'hero-contact-image';
    imageWrapper.append(data.mainPicture);
    container.appendChild(imageWrapper);
  }

  const overlay = document.createElement('div');
  overlay.className = 'hero-contact-overlay';

  const content = document.createElement('div');
  content.className = 'hero-contact-content';

  if (data.heading) {
    const h2 = document.createElement('h2');
    h2.textContent = data.heading;
    content.appendChild(h2);
  }

  if (data.description) {
    const p = document.createElement('p');
    p.className = 'hero-contact-description';
    p.textContent = data.description;
    content.appendChild(p);
  }

  if (data.buttonDataList.length) {
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'hero-contact-buttons';

    data.buttonDataList.forEach((btn, index) => {
      const button = document.createElement('a');
      button.href = btn.link;
      button.target = btn.target;
      button.textContent = btn.label;
      button.className =
        index === 0 ? 'primary-btn' : 'secondary-btn';

      if (btn.target === '_blank') {
        button.rel = 'noopener noreferrer';
      }

      btnWrapper.appendChild(button);
    });

    content.appendChild(btnWrapper);
  }

  overlay.appendChild(content);
  container.appendChild(overlay);
}

export default function decorate(block) {
  const data = extractBlockData(block);

  const fragment = document.createDocumentFragment();
  const container = document.createElement('div');

  moveInstrumentation(block, container);

  const isContact = block.classList.contains('contact-hero');

  if (isContact) {
    buildContactHero(data, container);
  } else {
    buildStandardHero(data, container);
  }

  block.innerHTML = '';
  fragment.append(container);
  block.append(fragment);
}
