import { createOptimizedPicture, decorateIcons } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { span } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  let headingText = '';
  let target = '_blank';

  [...block.children].forEach((row, index) => {
    if (index === 0) {
      headingText = row.textContent.trim();
      return;
    }

    if (
      index === 1
      && row.querySelector('div > div > p')
    ) {
      target = row.textContent.trim();
      return;
    }

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    while (row.firstElementChild) li.append(row.firstElementChild);

    [...li.children].forEach((div) => {
      const picture = div.querySelector('picture');
      const videoAnchor = div.querySelector('a[href$=".mp4"]');

      if (picture) {
        div.className = 'cards-card-image';
      } else if (videoAnchor) {
        // 🎥 Handle embedded video with optional thumbnail
        const videoSrc = videoAnchor.href;
        const thumbnailSrc = videoSrc
          ? `${videoSrc}/jcr:content/renditions/cq5dam.web.1280.1280.jpeg`
          : 'icons/poster.jpg';
        
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video-wrapper';

        const video = document.createElement('video');
        video.src = videoSrc;
        video.poster = thumbnailSrc;
        video.setAttribute('title', 'Embedded Video');
        video.setAttribute('loading', 'lazy');
        video.setAttribute('playsinline', '');
        video.setAttribute('preload', 'metadata');

        const playBtn = document.createElement('button');
        playBtn.className = 'custom-play-button';
        playBtn.innerHTML = '<span class="icon icon-play"></span>'; // Assume CSS adds play icon

        // Play on click
        playBtn.addEventListener('click', () => {
          video.play();
          playBtn.style.display = 'none';
        });

        // Move any tracking
        moveInstrumentation(videoAnchor, video);

        // Replace anchor with video
        videoWrapper.appendChild(video);
        videoWrapper.appendChild(playBtn);
        div.innerHTML = ''; // Clear the old anchor
        div.appendChild(videoWrapper);

        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });

    const anchor = li.querySelector('a');
    if (anchor) {
      anchor.setAttribute('target', target);
      anchor.appendChild(span({ class: 'icon icon-right-arrow' }));
    }

    ul.append(li);
    decorateIcons(li);
  });

  // Optimize images
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Heading
  const headingEl = document.createElement('h2');
  headingEl.textContent = headingText;
  headingEl.className = 'cards-heading';

  block.textContent = '';
  block.append(headingEl);
  block.append(ul);
}
