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
      index === 1 &&
      row.querySelector('div > div > p')
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
        const thumbnailSrc = videoAnchor.dataset.thumbnail || videoSrc.replace('.mp4', '.jpg');
    
        const video = document.createElement('video');
        video.src = videoSrc;
        video.controls = true;
        video.width = 560;
        video.height = 315;
        video.setAttribute('title', 'Embedded Video');
        video.setAttribute('loading', 'lazy');
        video.setAttribute('poster', thumbnailSrc); // 🔽 Add thumbnail
    
        moveInstrumentation(videoAnchor, video);
        videoAnchor.replaceWith(video);
    
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
