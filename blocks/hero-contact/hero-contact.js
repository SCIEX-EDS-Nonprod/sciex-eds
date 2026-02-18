import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  const container = document.createElement('div');
  container.className = 'hero-contact-container';

  // Move block level instrumentation
  moveInstrumentation(block, container);

  /* ---------------- IMAGE ---------------- */
  const imageRow = rows[1];
  const picture = imageRow?.querySelector('picture');

  if (picture) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'hero-contact-image';

    imageWrapper.appendChild(picture);

    // Move instrumentation from image row
    moveInstrumentation(imageRow, imageWrapper);

    container.appendChild(imageWrapper);
  }

  /* ---------------- CONTENT ---------------- */
  const overlay = document.createElement('div');
  overlay.className = 'hero-contact-overlay';

  const content = document.createElement('div');
  content.className = 'hero-contact-content';

  /* -------- HEADING -------- */
  const headingRow = rows[0];
  const heading = headingRow?.querySelector('p')?.textContent?.trim();

  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading;

    moveInstrumentation(headingRow, h2);

    content.appendChild(h2);
  }

  /* -------- DESCRIPTION -------- */
  const descRow = rows[2];
  const description = descRow?.querySelector('p')?.textContent?.trim();

  if (description) {
    const p = document.createElement('p');
    p.className = 'hero-contact-description';
    p.textContent = description;

    moveInstrumentation(descRow, p);

    content.appendChild(p);
  }

  /* ---------------- BUTTONS ---------------- */
  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'hero-contact-buttons';

  /* ===== PRIMARY BUTTON ===== */
  const primaryTextRow = rows[3];
  const primaryLinkRow = rows[4];

  const primaryText = primaryTextRow?.querySelector('p')?.textContent?.trim();
  const primaryLinkElement = primaryLinkRow?.querySelector('a');

  if (primaryText && primaryLinkElement) {
    const primaryBtn = document.createElement('a');
    primaryBtn.href = primaryLinkElement.href;
    primaryBtn.textContent = primaryText;
    primaryBtn.target = primaryLinkElement.target || '_self';
    primaryBtn.className = 'primary-btn';

    if (primaryBtn.target === '_blank') {
      primaryBtn.rel = 'noopener noreferrer';
    }

    // Move instrumentation from BOTH rows
    moveInstrumentation(primaryTextRow, primaryBtn);
    moveInstrumentation(primaryLinkRow, primaryBtn);

    btnWrapper.appendChild(primaryBtn);
  }

  /* ===== SECONDARY BUTTON ===== */
  const secondaryTextRow = rows[6];
  const secondaryLinkRow = rows[7];

  const secondaryText = secondaryTextRow?.querySelector('p')?.textContent?.trim();
  const secondaryLinkElement = secondaryLinkRow?.querySelector('a');

  if (secondaryText && secondaryLinkElement) {
    const secondaryBtn = document.createElement('a');
    secondaryBtn.href = secondaryLinkElement.href;
    secondaryBtn.textContent = secondaryText;
    secondaryBtn.target = secondaryLinkElement.target || '_self';
    secondaryBtn.className = 'secondary-btn';

    if (secondaryBtn.target === '_blank') {
      secondaryBtn.rel = 'noopener noreferrer';
    }

    // Move instrumentation from BOTH rows
    moveInstrumentation(secondaryTextRow, secondaryBtn);
    moveInstrumentation(secondaryLinkRow, secondaryBtn);

    btnWrapper.appendChild(secondaryBtn);
  }

  content.appendChild(btnWrapper);
  overlay.appendChild(content);

  container.appendChild(overlay);

  block.innerHTML = '';
  block.append(container);
}
