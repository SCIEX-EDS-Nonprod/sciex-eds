import { decorateIcons } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { span } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const videoTextDiv = document.createElement('div');
  videoTextDiv.className = 'video-text-container';

  let id = '';
  let headingText = '';
  let target = '_blank';
  let textAlignment = '';

  [...block.children].forEach((row, index) => {
    if (index === 0) {
      id = row.textContent.trim() || 'split-video-text';
      return;
    }

    if (index === 1) {
      const recDiv = document.createElement('div');
      recDiv.className = 'split-vedio-text-rectangle';

      row.className = 'split-vedio-text-frame';

      if (row.firstElementChild) {
        row.firstElementChild.className = 'split-vedio-text-heading';
      }

      row.prepend(recDiv);
      headingText = row;
      return;
    }

    if (index === 2) {
      textAlignment = row.textContent.trim() || 'text-right';
      videoTextDiv.classList.add(textAlignment);
      return;
    }

    if (index === 3) {
      target = row.textContent.trim() || '_blank';
      return;
    }

    // Ignore anything after the component configuration fields.
    if (index >= 5) return;

    moveInstrumentation(row, videoTextDiv);

    while (row.firstElementChild) {
      videoTextDiv.append(row.firstElementChild);
    }
  });

  /*
   * At this point videoTextDiv contains:
   *
   * 0 = text
   * 1 = video
   * 2 = video thumbnail
   * 3 = video alt text
   * 4 = fallback image
   */

  let videoThumbnailImg = '';
  let videoAltText = '';

  const contentDivs = [...videoTextDiv.children];

  const textDiv = contentDivs[0];
  const videoDiv = contentDivs[1];
  const thumbnailDiv = contentDivs[2];
  const altTextDiv = contentDivs[3];
  const imageDiv = contentDivs[4];

  // -------------------------
  // Text
  // -------------------------
  if (textDiv) {
    const anchor = textDiv.querySelector('a');

    if (anchor) {
      anchor.setAttribute('target', target);
      anchor.appendChild(span({ class: 'icon icon-arrow' }));
    }

    const ul = textDiv.querySelector('div > ul');

    if (ul) {
      [...ul.children].forEach((li) => {
        li.prepend(span({ class: 'icon icon-clock' }));
      });
    }

    textDiv.className = 'content-wrapper';
    decorateIcons(textDiv);
  }

  // -------------------------
  // Video thumbnail
  // -------------------------
  if (thumbnailDiv) {
    const thumbnailImg = thumbnailDiv.querySelector('picture img');

    if (thumbnailImg) {
      videoThumbnailImg = thumbnailImg.src;
    }
  }

  // -------------------------
  // Alt text
  // -------------------------
  if (altTextDiv) {
    const p = altTextDiv.querySelector('p');

    if (p) {
      videoAltText = p.textContent.trim();
    }
  }

  // -------------------------
  // Check for video
  // -------------------------
  const videoAnchor = videoDiv?.querySelector('a[href$=".mp4"]');

  // let hasVideo = false;

  if (videoAnchor) {
    // hasVideo = true;

    const videoSrc = videoAnchor.href;

    const thumbnailSrc = videoThumbnailImg
      || `${videoSrc}/jcr:content/renditions/cq5dam.web.1280.1280.jpeg`;

    const video = document.createElement('video');

    video.src = videoSrc;
    video.poster = thumbnailSrc;
    video.setAttribute('title', 'Embedded Video');
    video.setAttribute('loading', 'lazy');
    video.setAttribute('playsinline', '');
    video.setAttribute('preload', 'metadata');

    if (videoAltText) {
      video.setAttribute('aria-label', videoAltText);
    }

    const playBtn = document.createElement('button');

    playBtn.className = 'custom-play-button';

    playBtn.innerHTML = `
      <span class="icon icon-play">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="19"
             height="21"
             viewBox="0 0 19 21"
             fill="none">
          <path
            d="M3.50715 1.31598C1.70404 0.281693 0.242188 1.129 0.242188 3.20698V18.5416C0.242188 20.6216 1.70404 21.4678 3.50715 20.4345L16.9103 12.7479C18.7141 11.7132 18.7141 10.0369 16.9103 9.0025L3.50715 1.31598Z"
            fill="white"/>
        </svg>
      </span>
    `;

    playBtn.addEventListener('click', () => {
      const modal = document.getElementById('video-modal');
      const modalContainer = document.getElementById('video-modal-container');

      if (!modal || !modalContainer) return;

      modalContainer.innerHTML = '';

      const modalVideo = document.createElement('video');

      modalVideo.src = videoSrc;
      modalVideo.poster = thumbnailSrc;
      modalVideo.controls = true;
      modalVideo.autoplay = true;
      modalVideo.setAttribute('playsinline', '');
      modalVideo.setAttribute('preload', 'metadata');

      modalVideo.style.width = '100%';
      modalVideo.style.height = 'auto';

      modalContainer.appendChild(modalVideo);

      modal.classList.remove('hidden');

      modalVideo.play().catch(console.error);
    });

    moveInstrumentation(videoAnchor, video);

    videoDiv.innerHTML = '';
    videoDiv.appendChild(video);
    videoDiv.appendChild(playBtn);
    videoDiv.className = 'video-wrapper';

    // IMPORTANT:
    // Video exists, therefore remove/ignore fallback image.
    if (imageDiv) {
      imageDiv.remove();
    }

    // Also remove thumbnail field from the final DOM.
    if (thumbnailDiv) {
      thumbnailDiv.remove();
    }

    if (altTextDiv) {
      altTextDiv.remove();
    }
  } else {
    /*
     * -------------------------
     * NO VIDEO
     * -------------------------
     *
     * Therefore use fallback image.
     */

    if (imageDiv) {
      const picture = imageDiv.querySelector('picture');

      if (picture) {
        const image = picture.querySelector('img');

        if (image && videoAltText) {
          image.alt = videoAltText;
        }

        imageDiv.className = 'video-wrapper';

        // No play button because this is only an image.
        decorateIcons(imageDiv);
      }
    }

    // No video, so remove the empty video/thumbnail fields.
    if (videoDiv) {
      videoDiv.remove();
    }

    if (thumbnailDiv) {
      thumbnailDiv.remove();
    }

    if (altTextDiv) {
      altTextDiv.remove();
    }
  }

  // -------------------------
  // Heading
  // -------------------------
  const headingEl = document.createElement('div');
  headingEl.className = 'heading-wrapper';
  headingEl.appendChild(headingText);

  block.textContent = '';
  block.id = `${id}-content`;

  if (block.parentElement) {
    block.parentElement.classList.add('tabs-container-wrapper');
  }

  if (headingText.querySelector('p')) {
    block.append(headingEl);
  }

  block.append(videoTextDiv);
}
