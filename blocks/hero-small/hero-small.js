import { span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

const BUTTON_START_CELL = 3;
const BUTTON_VARIANTS = ['primary', 'secondary', 'link'];

function extractBlockData(block) {
  const cells = [...block.querySelectorAll(':scope > div')];

  const heroTextColor = cells.find((cell) => (
    ['dark', 'light'].includes(cell.querySelector('p')?.textContent?.trim().toLowerCase())
  ))?.querySelector('p')?.textContent?.trim().toLowerCase();
  const mediaCell = cells.find((cell) => (
    cell.querySelectorAll(':scope > div').length > 1
  ));
  const mediaDivChildren = mediaCell?.querySelectorAll(':scope > div') || [];

  const isContactHero = mediaDivChildren[1]
    ?.querySelector('p')
    ?.textContent?.trim() === 'true';

  const data = {
    heading: cells[1]?.textContent.trim(),
    description: cells[2]?.textContent.trim(),
    tagline: cells[12]?.textContent.trim(),
    badgePicture: cells[13]?.querySelector('picture')?.cloneNode(true),
    captionPosition: cells[14]?.querySelector('p')?.textContent?.trim() || 'top',
    heroTextColor: heroTextColor === 'dark' ? 'dark' : 'light',
    mainPicture: mediaCell?.querySelector('picture'),
    videoAnchor: mediaCell?.querySelector('.button-container a'),
    mediaDivChildren,
    buttonDataList: [],
    isContactHero,
  };

  BUTTON_VARIANTS.forEach((variant, groupIndex) => {
    const cellIndex = BUTTON_START_CELL + groupIndex * 3;
    const label = cells[cellIndex]?.textContent.trim();
    const link = cells[cellIndex + 1]?.querySelector('a')?.getAttribute('href');
    const target = cells[cellIndex + 2]?.textContent.trim() || '_self';

    if (label && link) {
      data.buttonDataList.push({
        label,
        link,
        target,
        variant,
      });
    }
  });

  // Detect colourPic (3 div children pattern)
  if (mediaDivChildren.length === 3) {
    data.colourPicture = mediaCell?.querySelector('picture');
    data.colourPictureBg = mediaCell?.querySelector('.button-container a');
  }

  return data;
}

function preserveOriginalAuthoring(block) {
  const originalWrapper = document.createElement('div');
  originalWrapper.className = 'hero-original';
  originalWrapper.style.display = 'none';
  while (block.firstChild) {
    originalWrapper.appendChild(block.firstChild);
  }
  block.appendChild(originalWrapper);
}

function copyImageMetadata(image, sourceImage) {
  image.alt = sourceImage?.getAttribute('alt') || '';

  ['width', 'height', 'srcset', 'sizes'].forEach((attribute) => {
    const value = sourceImage?.getAttribute(attribute);
    if (value) image.setAttribute(attribute, value);
  });
}

function buildHeroContent(data) {
  const taglineWrap = document.createElement('div');
  const applyClass = (baseClass) => (data.isContactHero ? `contact-${baseClass}` : baseClass);

  const content = document.createElement('div');
  content.className = `${applyClass('hero-content')} hero-text-${data.heroTextColor}`;

  // Tagline + Badge
  if (data.tagline) {
    const baseClass = applyClass('hero-tagline-wrap');

    taglineWrap.className = data.captionPosition === 'bottom'
      ? `${baseClass}-bottom`
      : baseClass;
    if (data.badgePicture) {
      const badgeWrap = document.createElement('div');
      badgeWrap.className = applyClass('hero-badge');
      badgeWrap.append(data.badgePicture);
      taglineWrap.append(badgeWrap);
    }

    const tagline = document.createElement('p');
    tagline.className = applyClass('hero-tagline');
    tagline.textContent = data.tagline;
    taglineWrap.append(tagline);
    if (data.captionPosition !== 'bottom') {
      content.append(taglineWrap);
    }
  }

  // Heading
  if (data.heading) {
    const heading = document.createElement('h1');
    heading.className = applyClass('hero-heading-hero');
    heading.textContent = data.heading;
    content.append(heading);
  }

  // Description
  if (data.description) {
    const desc = document.createElement('p');
    desc.className = applyClass('hero-description');
    desc.textContent = data.description;
    content.append(desc);
  }

  // Buttons
  if (data.buttonDataList.length) {
    const buttons = document.createElement('div');
    buttons.className = applyClass('hero-buttons');

    data.buttonDataList.forEach((btn) => {
      const buttonEl = document.createElement('a');
      buttonEl.href = btn.link;
      buttonEl.target = btn.target;
      if (btn.target === '_blank') buttonEl.rel = 'noopener noreferrer';
      buttonEl.className = `button ${btn.variant}`;
      const labelSpan = document.createElement('span');
      labelSpan.textContent = btn.label;
      buttonEl.append(labelSpan);
      if (data.isContactHero && btn.variant === 'secondary') {
        buttonEl.append(span({ class: 'icon icon-arrow-blue' }));
      } else {
        buttonEl.append(span({ class: 'icon icon-arrow' }));
      }

      buttons.append(buttonEl);
    });

    content.append(buttons);
    decorateIcons(buttons);
  }
  if (taglineWrap && data.captionPosition === 'bottom') {
    content.append(taglineWrap);
  }

  return content;
}

function applyLayoutAndBackground(data, heroContainer, heroWrapper, heroContent) {
  if (data.colourPicture) {
    const sourceImage = data.colourPicture.querySelector('img');
    const imgSrc = sourceImage?.currentSrc || sourceImage?.src;
    const bgColor = data.colourPictureBg?.textContent?.trim();

    if (bgColor) heroContainer.style.backgroundColor = bgColor;

    if (imgSrc) {
      const sideImage = document.createElement('div');
      sideImage.className = 'hero-side-image';
      const img = document.createElement('img');
      copyImageMetadata(img, sourceImage);
      img.loading = 'eager';
      img.fetchPriority = 'high';
      img.src = imgSrc;
      sideImage.append(img);

      const wrapper = document.createElement('div');
      wrapper.className = 'hero-content-wrapper';
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
      heroContainer.append(video);
      heroContainer.classList.add('hero-has-bg');
    }
    heroWrapper.append(heroContent);
  } else if (data.mainPicture) {
    const sourceImage = data.mainPicture.querySelector('img');
    if (sourceImage) {
      sourceImage.loading = 'eager';
      sourceImage.fetchPriority = 'high';
      sourceImage.classList.add(data.isContactHero ? 'contact-hero-img' : 'hero-background-img');
      heroContainer.append(data.mainPicture);
      if (!data.isContactHero) heroContainer.classList.add('hero-has-bg');
    }
    heroWrapper.append(heroContent);
  } else {
    heroWrapper.append(heroContent);
  }
}

export default function decorate(block) {
  const data = extractBlockData(block);
  preserveOriginalAuthoring(block);

  const fragment = document.createDocumentFragment();
  const heroContainer = document.createElement('div');

  const heroWrapper = document.createElement('div');
  heroWrapper.className = data.isContactHero ? 'contact-hero-wrapper' : 'hero-wrapper';
  heroContainer.classList.add(data.isContactHero ? 'contact-hero-container' : 'herosmallclass');

  const heroContent = buildHeroContent(data);
  applyLayoutAndBackground(data, heroContainer, heroWrapper, heroContent);

  heroContainer.append(heroWrapper);
  fragment.append(heroContainer);
  block.append(fragment);
}
