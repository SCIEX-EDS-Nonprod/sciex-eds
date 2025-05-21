import { createOptimizedPicture, decorateIcons } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { span } from '../../scripts/dom-builder.js';

function embedYoutube(url, autoplay, background) {
  let suffix = '';

  if (background || autoplay) {
    const suffixParams = {
      autoplay: autoplay ? '1' : '0',
      mute: background ? '1' : '0',
      controls: background ? '0' : '1',
      disablekb: background ? '1' : '0',
      loop: background ? '1' : '0',
      playsinline: background ? '1' : '0',
    };
    suffix = `&${Object.entries(suffixParams)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&')}`;
  }

  let vid = '';
  if (url.hostname.includes('youtu.be')) {
    [, vid] = url.pathname.split('/');
  } else if (url.searchParams.has('v')) {
    vid = url.searchParams.get('v');
  } else {
    [, vid] = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]+)/) || [];
  }

  const temp = document.createElement('div');
  temp.innerHTML = `
    <div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe
        src="https://www.youtube.com/embed/${vid}?rel=0${suffix}"
        style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope"
        allowfullscreen
        scrolling="no"
        title="Content from Youtube"
        loading="lazy">
      </iframe>
    </div>`;
  return temp.children.item(0);
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  let headingText = '';
  let target = '_blank';
  let id = '';

  [...block.children].forEach((row, index) => {
    if (index === 0) {
      id = row.textContent.trim();
      return;
    }

    if (index === 1) {
      headingText = row.textContent.trim();
      return;
    }

    if (index === 2 && row.querySelector('div > div > p')) {
      target = row.textContent.trim();
      return;
    }

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);

    const firstDiv = li.children[0];
    const youtubeLink = firstDiv.textContent.trim();
    let videoThumbnailImg;

    if (!youtubeLink.includes('youtube')) {
      [...li.children].forEach((div, divIndex) => {
        if (divIndex !== 0 && div.querySelector('picture')) {
          const pictureImg = div.querySelector('picture img');
          if (pictureImg) videoThumbnailImg = pictureImg.src;
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

      if (videoThumbnailImg) {
        li.querySelectorAll('video').forEach((video) => {
          video.setAttribute('poster', videoThumbnailImg);
        });
      }

      ul.append(li);
      decorateIcons(li);
    } else {
      [...li.children].forEach((div, divIndex) => {
        if (divIndex === 0 && firstDiv) {
          let parsedUrl;
          try {
            parsedUrl = new URL(youtubeLink.startsWith('http') ? youtubeLink : `https://${youtubeLink}`);
          } catch (e) {
            console.error('Invalid YouTube URL:', youtubeLink, e);
            return;
          }

          const autoplay = false;
          const background = false;

          const embedWrapper = embedYoutube(parsedUrl, autoplay, background);
          firstDiv.innerHTML = '';
          firstDiv.appendChild(embedWrapper);

          embedWrapper.querySelector('iframe').addEventListener('load', () => {
            block.dataset.embedLoaded = true;
          });

          firstDiv.className = 'cards-card-image';
        } else {
          div.className = 'cards-card-body';
        }
      });

      ul.append(li);
      decorateIcons(li);
    }
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

  // Clear block and wrap final content
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.id = id;
  wrapper.className = 'cards-wrapper';
  wrapper.appendChild(headingEl);
  wrapper.appendChild(ul);

  block.appendChild(wrapper);
}
