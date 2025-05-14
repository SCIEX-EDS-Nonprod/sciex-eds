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

    if (index === 1 && row.querySelector('div > div > p')) {
      target = row.textContent.trim();
      return;
    }

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    while (row.firstElementChild) li.append(row.firstElementChild);

    let videoThumbnailImg;

    [...li.children].forEach((div, divIndex) => {
      const firstDiv = li.children[0];

      if (divIndex !== 0 && div.querySelector('picture')) {
        const pictureImg = div.querySelector('picture img');
        if (pictureImg) videoThumbnailImg = pictureImg.src; // ✅ Save .src instead of image element
        div.innerHTML = '';
      }

      if (divIndex === 0 && firstDiv) {
        const picture = firstDiv.querySelector('picture');
        const videoAnchor = firstDiv.querySelector('a[href$=".mp4"]');

        if (picture) {
          firstDiv.className = 'cards-card-image';
        } else if (videoAnchor) {
          const videoSrc = videoAnchor.href;
          const thumbnailSrc = videoThumbnailImg || `${videoSrc}/jcr:content/renditions/cq5dam.web.1280.1280.jpeg`;

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
          playBtn.innerHTML = '<span class="icon icon-play"></span>';

          playBtn.addEventListener('click', () => {
            video.play();
            video.controls = true;
            playBtn.style.display = 'none';
          });

          moveInstrumentation(videoAnchor, video);

          videoWrapper.appendChild(video);
          videoWrapper.appendChild(playBtn);
          firstDiv.innerHTML = '';
          firstDiv.appendChild(videoWrapper);

          firstDiv.className = 'cards-card-image';
        }
      } else {
        div.className = 'cards-card-body';
      }
    });

    const anchor = li.querySelector('a');
    if (anchor) {
      anchor.setAttribute('target', target);
      anchor.appendChild(span({ class: 'icon icon-right-arrow' }));
    }

    // ✅ Assign poster to all videos inside this card
    if (videoThumbnailImg) {
      li.querySelectorAll('video').forEach((video) => {
        video.setAttribute('poster', videoThumbnailImg);
      });
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
