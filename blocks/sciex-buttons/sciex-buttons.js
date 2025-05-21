import { } from '../../scripts/aem.js';

export default async function decorate(block) {
  const rows = Array.from(block.children);
  const alignment = rows[0]?.querySelector('p')?.textContent?.trim() || 'left';

  const fragment = document.createDocumentFragment();

  // Create a container for the decorated buttons
  const wrapper = document.createElement('div');
  wrapper.classList.add('button-block', `align-${alignment}`);

  rows.slice(1).forEach((row) => {
    const cells = Array.from(row.querySelectorAll('p')).map((p) => p.textContent.trim());

    const [
      type = 'primary',
      text = '',
      link = '#',
      showSvgRaw = 'false',
      svg = '',
      target = '_self',
    ] = cells;

    const showSvg = showSvgRaw.toLowerCase() === 'true';

    const button = document.createElement('a');
    button.href = link;
    button.target = target;
    button.className = `button ${type}`;
    button.textContent = text;

    if (showSvg && svg && svg !== "''") {
      const cleanSvg = svg.replace(/^["'`]+|["'`]+$/g, '');
      const parsedSvgDoc = new DOMParser().parseFromString(cleanSvg, 'image/svg+xml');
      const parsedSvg = parsedSvgDoc.querySelector('svg');
      if (parsedSvg) {
        parsedSvg.classList.add('inline-icon');
        button.appendChild(parsedSvg);
      }
    }

    wrapper.appendChild(button);
  });

  fragment.appendChild(wrapper);

  block.style.display = 'none';
  block.parentNode.insertBefore(fragment, block.nextSibling);
}
