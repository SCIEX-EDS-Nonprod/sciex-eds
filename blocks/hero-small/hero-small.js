import { span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Extracts all required data (text, images, buttons, etc.) from original DOM
 */
function extractBlockData(block) {
  const cells = [...block.querySelectorAll(':scope > div')];

  const data = {
    heading: cells[1]?.innerText.trim(),
    description: cells[2]?.innerText.trim(),
    tagline: cells[12]?.innerText.trim(),
    badgePicture: cells[13]?.querySelector('picture'),
    mainPicture: cells[14]?.querySelector('picture'),
    videoAnchor: cells[14]?.querySelector('.button-container a'),
    mediaDivChildren: cells[14]?.querySelectorAll(':scope > div') || [],
    buttonDataList: [],
    originalCells: cells, // keep original references for instrumentation
  };

  // Extract button data
  for (let i = 3; i < 12; i += 3) {
    const label = cells[i]?.innerText.trim();
    const link = cells[i + 1]?.querySelector('a')?.getAttribute('href');
    const target = cells[i + 2]?.innerText.trim() || '_self';
    if (label && link) data.buttonDataList.push({ label, link, target });
  }

  // Detect colourPic (3 div children pattern)
  if (data.mediaDivChildren.length === 3) {
    data.colourPicture = cells[14]?.querySelector('picture');
    data.colourPictureBg = cells[14]?.querySelector('.button-container a');
  }

  return data;
}

/**
 * Builds hero content section and applies instrumentation
 */
function buildHeroContent(data, block) {
  const content = document.createElement('div');
  content.className = 'hero-content';
  moveInstrumentation(block, content);

  // Tagline + badge
  if (data.tagline) {
    const taglineWrap = document.createElement('div');
    taglineWrap.className = 'hero-tagline-wrap';
    moveInstrumentation(data.originalCells[12], taglineWrap);

    if (data.badgePicture) {
      const badgeWrap = document.createElement('div');
      badgeWrap.className = 'hero-badge';
      moveInstrumentation(data.originalCells[13], badgeWrap);
      badgeWrap.append(data.badgePicture);
      taglineWrap.append(badgeWrap);
    }

    const tagline = document.createElement('p');
    tagline.className = 'hero-tagline';
    tagline.textContent = data.tagline;
    moveInstrumentation(data.originalCells[12], tagline);
    taglineWrap.append(tagline);
    content.append(taglineWrap);
  }

  // Heading
  if (data.heading) {
    const heading = document.createElement('h2');
    heading.className = 'hero-heading-hero';
    heading.textContent = data.heading;
    moveInstrumentation(data.originalCells[1], heading);
    content.append(heading);
  }

  // Description
  if (data.description) {
    const desc = document.createElement('p');
    desc.className = 'hero-description';
    desc.textContent = data.description;
    moveInstrumentation(data.originalCells[2], desc);
    content.append(desc);
  }

  // Buttons
  if (data.buttonDataList.length) {
    const buttons = document.createElement('div');
    buttons.className = 'hero-buttons';
    moveInstrumentation(block, buttons);

    const buttonClasses = ['button primary', 'button secondary', 'button link'];

    data.buttonDataList.forEach((btn, index) => {
      const buttonEl = document.createElement('a');
      buttonEl.href = btn.link;
      buttonEl.target = btn.target;
      buttonEl.className = buttonClasses[index] || 'button link';
      moveInstrumentation(data.originalCells[3 + index * 3], buttonEl);

      const labelSpan = document.createElement('span');
      labelSpan.textContent = btn.label;
      buttonEl.append(labelSpan);
      buttonEl.append(span({ class: 'icon icon-arrow' }));

      buttons.append(buttonEl);
    });

    content.append(buttons);
    decorateIcons(buttons);
  }

  return content;
}

/**
 * Applies layout and background logic (image, video, colourPic)
 */
function applyLayoutAndBackground(data, heroContainer, heroWrapper, heroContent, block) {
  if (data.colourPicture) {
    const imgSrc = data.colourPicture.querySelector('img')?.src;
    const bgColor = data.colourPictureBg?.textContent?.trim();

    if (bgColor) heroContainer.style.backgroundColor = bgColor;

    if (imgSrc) {
      const sideImage = document.createElement('div');
      sideImage.className = 'hero-side-image';
      moveInstrumentation(data.originalCells[14], sideImage);

      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = 'hero-side-image';
      sideImage.append(img);

      const wrapper = document.createElement('div');
      wrapper.className = 'hero-content-wrapper';
      moveInstrumentation(block, wrapper);
      wrapper.append(heroContent);
      wrapper.append(sideImage);
      heroWrapper.append(wrapper);
    } else {
      heroWrapper.append(heroContent);
    }
  } else if (data.videoAnchor) {
    const videoSrc = data.videoAnchor.getAttribute('href');
    if (videoSrc) {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.className = 'hero-bg-video';
      moveInstrumentation(data.originalCells[14], video);
      heroContainer.append(video);
      heroContainer.classList.add('hero-has-bg');
    }
    heroWrapper.append(heroContent);
  } else if (data.mainPicture) {
    const imgSrc = data.mainPicture.querySelector('img')?.src;
    if (imgSrc) {
      heroContainer.style.backgroundImage = `url('${imgSrc}')`;
      heroContainer.classList.add('hero-has-bg');
      moveInstrumentation(data.originalCells[14], heroContainer);
    }
    heroWrapper.append(heroContent);
  } else {
    heroWrapper.append(heroContent);
  }
}

/**
 * Main decorate function
 */
export default function decorate(block) {
  const data = extractBlockData(block);

  const fragment = document.createDocumentFragment();
  const heroContainer = document.createElement('div');
  heroContainer.classList.add('herosmallclass');
  moveInstrumentation(block, heroContainer);

  const heroWrapper = document.createElement('div');
  heroWrapper.className = 'hero-wrapper';
  moveInstrumentation(block, heroWrapper);

  const heroContent = buildHeroContent(data, block);
  applyLayoutAndBackground(data, heroContainer, heroWrapper, heroContent, block);

  heroContainer.append(heroWrapper);
  fragment.append(heroContainer);

  block.textContent = '';
  block.append(fragment);
}
