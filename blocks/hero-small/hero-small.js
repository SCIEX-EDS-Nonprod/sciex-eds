import { span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/* =====================================================
   EXISTING DATA EXTRACTION (UNCHANGED)
===================================================== */
function extractBlockData(block) {
  const cells = [...block.querySelectorAll(':scope > div')];
  const clonedCells = cells.map((cell) => cell.cloneNode(true));

  const data = {
    heading: clonedCells[1]?.innerText.trim(),
    description: clonedCells[2]?.innerText.trim(),
    tagline: clonedCells[12]?.innerText.trim(),
    badgePicture: clonedCells[13]?.querySelector('picture'),
    mainPicture: clonedCells[14]?.querySelector('picture'),
    videoAnchor: clonedCells[14]?.querySelector('.button-container a'),
    mediaDivChildren:
      clonedCells[14]?.querySelectorAll(':scope > div') || [],
    buttonDataList: [],
  };

  // Extract button data
  for (let i = 3; i < 12; i += 3) {
    const label = clonedCells[i]?.innerText.trim();
    const link =
      clonedCells[i + 1]?.querySelector('a')?.getAttribute('href');
    const target =
      clonedCells[i + 2]?.innerText.trim() || '_self';

    if (label && link)
      data.buttonDataList.push({ label, link, target });
  }

  // Detect colourPic
  if (data.mediaDivChildren.length === 3) {
    data.colourPicture =
      clonedCells[14]?.querySelector('picture');
    data.colourPictureBg =
      clonedCells[14]?.querySelector('.button-container a');
  }

  return data;
}

/* =====================================================
   EXISTING AUTHORING PRESERVE (UNCHANGED)
===================================================== */
function preserveOriginalAuthoring(block) {
  const originalWrapper = document.createElement('div');
  originalWrapper.className = 'hero-original';
  originalWrapper.style.display = 'none';

  while (block.firstChild) {
    originalWrapper.appendChild(block.firstChild);
  }

  block.appendChild(originalWrapper);
}

/* =====================================================
   EXISTING CONTENT BUILDER (UNCHANGED)
===================================================== */
function buildHeroContent(data) {
  const content = document.createElement('div');
  content.className = 'hero-content';

  if (data.tagline) {
    const taglineWrap = document.createElement('div');
    taglineWrap.className = 'hero-tagline-wrap';

    if (data.badgePicture) {
      const badgeWrap = document.createElement('div');
      badgeWrap.className = 'hero-badge';
      badgeWrap.append(data.badgePicture);
      taglineWrap.append(badgeWrap);
    }

    const tagline = document.createElement('p');
    tagline.className = 'hero-tagline';
    tagline.textContent = data.tagline;
    taglineWrap.append(tagline);

    content.append(taglineWrap);
  }

  if (data.heading) {
    const heading = document.createElement('h2');
    heading.className = 'hero-heading-hero';
    heading.textContent = data.heading;
    content.append(heading);
  }

  if (data.description) {
    const desc = document.createElement('p');
    desc.className = 'hero-description';
    desc.textContent = data.description;
    content.append(desc);
  }

  if (data.buttonDataList.length) {
    const buttons = document.createElement('div');
    buttons.className = 'hero-buttons';

    const buttonClasses = [
      'button primary',
      'button secondary',
      'button link',
    ];

    data.buttonDataList.forEach((btn, index) => {
      const buttonEl = document.createElement('a');
      buttonEl.href = btn.link;
      buttonEl.target = btn.target;
      buttonEl.className =
        buttonClasses[index] || 'button link';

      const labelSpan = document.createElement('span');
      labelSpan.textContent = btn.label;

      buttonEl.append(labelSpan);
      buttonEl.append(
        span({ class: 'icon icon-arrow' })
      );

      buttons.append(buttonEl);
    });

    content.append(buttons);
    decorateIcons(buttons);
  }

  return content;
}

/* =====================================================
   EXISTING LAYOUT HANDLER (UNCHANGED)
===================================================== */
function applyLayoutAndBackground(
  data,
  heroContainer,
  heroWrapper,
  heroContent
) {
  if (data.colourPicture) {
    const imgSrc =
      data.colourPicture.querySelector('img')?.src;
    const bgColor =
      data.colourPictureBg?.textContent?.trim();

    if (bgColor)
      heroContainer.style.backgroundColor = bgColor;

    if (imgSrc) {
      const sideImage = document.createElement('div');
      sideImage.className = 'hero-side-image';

      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = 'hero-side-image';

      sideImage.append(img);

      const wrapper =
        document.createElement('div');
      wrapper.className =
        'hero-content-wrapper';

      wrapper.append(heroContent);
      wrapper.append(sideImage);

      heroWrapper.append(wrapper);
    } else {
      heroWrapper.append(heroContent);
    }
  } else if (data.videoAnchor) {
    const videoSrc =
      data.videoAnchor.getAttribute('href');

    if (videoSrc) {
      const video =
        document.createElement('video');
      video.src = videoSrc;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.className = 'hero-bg-video';

      heroContainer.append(video);
      heroContainer.classList.add(
        'hero-has-bg'
      );
    }

    heroWrapper.append(heroContent);
  } else if (data.mainPicture) {
    const imgSrc =
      data.mainPicture.querySelector('img')?.src;

    if (imgSrc) {
      heroContainer.style.backgroundImage = `url('${imgSrc}')`;
      heroContainer.classList.add(
        'hero-has-bg'
      );
    }

    heroWrapper.append(heroContent);
  } else {
    heroWrapper.append(heroContent);
  }
}

/* =====================================================
   🆕 CONTACT VARIANT (ADDED — SAFE)
===================================================== */
function buildContactVariant(
  data,
  heroContainer
) {
  heroContainer.classList.add(
    'contact-hero-container'
  );

  // IMAGE
  if (data.mainPicture) {
    const imageWrapper =
      document.createElement('div');
    imageWrapper.className =
      'contact-hero-image';
    imageWrapper.append(data.mainPicture);
    heroContainer.appendChild(imageWrapper);
  }

  // OVERLAY
  const overlay =
    document.createElement('div');
  overlay.className =
    'contact-hero-overlay';

  const content =
    document.createElement('div');
  content.className =
    'contact-hero-content';

  if (data.heading) {
    const h2 =
      document.createElement('h2');
    h2.className =
      'contact-hero-heading';
    h2.textContent = data.heading;
    content.appendChild(h2);
  }

  if (data.description) {
    const p =
      document.createElement('p');
    p.className =
      'contact-hero-description';
    p.textContent = data.description;
    content.appendChild(p);
  }

  if (data.buttonDataList.length) {
    const btnWrapper =
      document.createElement('div');
    btnWrapper.className =
      'contact-hero-buttons';

    data.buttonDataList.forEach(
      (btn, index) => {
        const button =
          document.createElement('a');
        button.href = btn.link;
        button.target = btn.target;
        button.textContent = btn.label;

        button.className =
          index === 0
            ? 'contact-primary-btn'
            : 'contact-secondary-btn';

        if (btn.target === '_blank') {
          button.rel =
            'noopener noreferrer';
        }

        btnWrapper.appendChild(button);
      }
    );

    content.appendChild(btnWrapper);
  }

  overlay.appendChild(content);
  heroContainer.appendChild(overlay);
}

/* =====================================================
   DECORATE (ONLY ADDITION — NOTHING REMOVED)
===================================================== */
export default function decorate(block) {
  const data = extractBlockData(block);

  preserveOriginalAuthoring(block);

  const fragment =
    document.createDocumentFragment();
  const heroContainer =
    document.createElement('div');

  moveInstrumentation(block, heroContainer);

  const isContact =
    block.classList.contains(
      'contact-hero'
    );

  if (isContact) {
    buildContactVariant(
      data,
      heroContainer
    );
  } else {
    heroContainer.classList.add(
      'herosmallclass'
    );

    const heroWrapper =
      document.createElement('div');
    heroWrapper.className =
      'hero-wrapper';

    const heroContent =
      buildHeroContent(data);

    applyLayoutAndBackground(
      data,
      heroContainer,
      heroWrapper,
      heroContent
    );

    heroContainer.append(
      heroWrapper
    );
  }

  fragment.append(heroContainer);
  block.append(fragment);
}
