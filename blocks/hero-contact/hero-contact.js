import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  const container = document.createElement('div');
  container.className = 'contact-hero-container';

  moveInstrumentation(block, container);

  const content = document.createElement('div');
  content.className = 'contact-hero-content';

  // Heading
  const heading = rows[0]?.querySelector('p');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    content.appendChild(h2);
  }

  // Description
  const desc = rows[1]?.querySelector('p');
  if (desc) {
    const p = document.createElement('p');
    p.className = 'contact-hero-description';
    p.textContent = desc.textContent;
    content.appendChild(p);
  }

  // Buttons wrapper
  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'contact-hero-buttons';

  // Primary button
  const primaryLink = rows[2]?.querySelector('a');
  if (primaryLink) {
    primaryLink.classList.add('primary-btn');
    btnWrapper.appendChild(primaryLink);
  }

  // Secondary button
  const secondaryLink = rows[3]?.querySelector('a');
  if (secondaryLink) {
    secondaryLink.classList.add('secondary-btn');
    btnWrapper.appendChild(secondaryLink);
  }

  content.appendChild(btnWrapper);

  // Image
  const picture = block.querySelector('picture');
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'contact-hero-image';

  if (picture) {
    imageWrapper.appendChild(picture);
  }

  container.appendChild(content);
  container.appendChild(imageWrapper);

  block.innerHTML = '';
  block.append(container);
}
