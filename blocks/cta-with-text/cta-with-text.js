import { } from '../../scripts/aem.js';

export default function decorate(block) {
  // Debug once if needed
  // console.log('CTA dataset:', block.dataset);

  // Clear any server-rendered markup
  // block.innerHTML = '';
  const child = block.children;

  const heading = child[0]?.textContent.trim();
  const description = child[1]?.textContent.trim();
  const variation = 'card'; // child[2]?.textContent.trim();
  const alignment = child[3]?.textContent.trim();
  const type = child[4]?.textContent.trim();
  const buttonText = child[5]?.textContent.trim();
  const link = child[6]?.textContent.trim();
  const showSvg = child[5]?.textContent.trim();
  const target = child[6]?.textContent.trim();
  console.log('heading:', heading);
  console.log('description:', description);
  console.log('variation:', variation);
  // Root
  const section = document.createElement('div');
  section.classList.add('support-cta-block');

  // Variation (default = banner)
  if (variation === 'card') {
    section.classList.add('support-cta--card');
  } else {
    section.classList.add('support-cta--banner');
  }

  // Alignment (left | right | bottom)
  if (alignment) {
    section.classList.add(`support-cta--align-${alignment}`);
  } else {
    section.classList.add('support-cta--align-right'); // safe default
  }

  // Inner wrapper
  const inner = document.createElement('div');
  inner.className = 'support-cta-inner';

  // Text wrapper
  const textWrap = document.createElement('div');
  textWrap.className = 'support-cta-text';

  if (heading) {
    const titleEl = document.createElement('h3');
    titleEl.className = 'support-cta-title';
    titleEl.textContent = heading;
    textWrap.appendChild(titleEl);
  }

  if (description) {
    const descEl = document.createElement('p');
    descEl.className = 'support-cta-desc';
    descEl.textContent = description;
    textWrap.appendChild(descEl);
  }

  // Action wrapper
  const actionWrap = document.createElement('div');
  actionWrap.className = 'support-cta-action';

  const buttonEl = document.createElement('a');
  buttonEl.classList.add('support-cta-button');

  // Button type (primary | secondary | link)
  if (type) {
    buttonEl.classList.add(`support-cta-button--${type}`);
  } else {
    buttonEl.classList.add('support-cta-button--secondary'); // default like banner view
  }

  buttonEl.textContent = buttonText || 'Request support';

  // Link
  if (link) {
    buttonEl.href = link;
  } else {
    buttonEl.href = '#';
  }

  // Target
  if (target) {
    buttonEl.target = target;
    if (target === '_blank') {
      buttonEl.rel = 'noopener noreferrer';
    }
  }

  // Optional icon
  if (showSvg === 'true') {
    const iconSpan = document.createElement('span');
    iconSpan.className = 'support-cta-icon';
    iconSpan.setAttribute('aria-hidden', 'true');

    // Replace with real SVG later if needed
    iconSpan.innerHTML = '→';

    buttonEl.appendChild(iconSpan);
  }

  actionWrap.appendChild(buttonEl);

  // Assemble based on alignment
  if (alignment === 'bottom') {
    inner.appendChild(textWrap);
    inner.appendChild(actionWrap);
  } else if (alignment === 'left') {
    inner.appendChild(actionWrap);
    inner.appendChild(textWrap);
  } else {
    // right (default)
    inner.appendChild(textWrap);
    inner.appendChild(actionWrap);
  }

  section.appendChild(inner);
  console.log('section:', section);
  // block.innerHTML = '';
  block.appendChild(section);
}
