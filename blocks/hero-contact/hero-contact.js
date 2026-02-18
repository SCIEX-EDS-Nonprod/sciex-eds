
export default function decorate(block) {
  const rows = [...block.children];

  const container = document.createElement('div');
  container.className = 'hero-contact-container';


  /* ---------------- IMAGE ---------------- */
  const picture = rows[1]?.querySelector('picture');

  if (picture) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'hero-contact-image';
    imageWrapper.appendChild(picture);
    container.appendChild(imageWrapper);
  }

  /* ---------------- CONTENT ---------------- */
  const overlay = document.createElement('div');
  overlay.className = 'hero-contact-overlay';

  const content = document.createElement('div');
  content.className = 'hero-contact-content';

  // Heading
  const heading = rows[0]?.querySelector('p')?.textContent?.trim();
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading;
    content.appendChild(h2);
  }

  // Description
  const description = rows[2]?.querySelector('p')?.textContent?.trim();
  if (description) {
    const p = document.createElement('p');
    p.className = 'hero-contact-description';
    p.textContent = description;
    content.appendChild(p);
  }

  /* ---------------- BUTTONS ---------------- */
  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'hero-contact-buttons';

  /* ===== PRIMARY BUTTON ===== */
  const primaryText = rows[3]?.querySelector('p')?.textContent?.trim();
  const primaryLinkElement = rows[4]?.querySelector('a');

  if (primaryText && primaryLinkElement) {
    const primaryBtn = document.createElement('a');
    primaryBtn.href = primaryLinkElement.href;
    primaryBtn.textContent = primaryText;
    primaryBtn.target = primaryLinkElement.target || '_self';
    primaryBtn.className = 'primary-btn';

    if (primaryBtn.target === '_blank') {
      primaryBtn.rel = 'noopener noreferrer';
    }

    btnWrapper.appendChild(primaryBtn);
  }

  /* ===== SECONDARY BUTTON ===== */
  const secondaryText = rows[6]?.querySelector('p')?.textContent?.trim();
  const secondaryLinkElement = rows[7]?.querySelector('a');

  if (secondaryText && secondaryLinkElement) {
    const secondaryBtn = document.createElement('a');
    secondaryBtn.href = secondaryLinkElement.href;
    secondaryBtn.textContent = secondaryText;
    secondaryBtn.target = secondaryLinkElement.target || '_self';
    secondaryBtn.className = 'secondary-btn';

    if (secondaryBtn.target === '_blank') {
      secondaryBtn.rel = 'noopener noreferrer';
    }

    btnWrapper.appendChild(secondaryBtn);
  }

  content.appendChild(btnWrapper);
  overlay.appendChild(content);
  container.appendChild(overlay);

  block.innerHTML = '';
  block.append(container);
}
