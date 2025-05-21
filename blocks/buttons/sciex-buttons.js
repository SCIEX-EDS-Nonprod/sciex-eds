export default function decorate(block) {
  const rows = Array.from(block.children);
  const alignment = rows[0]?.textContent?.trim() || 'left';
  block.classList.add('button-block', `align-${alignment}`);
  block.textContent = '';

  // Remaining rows represent buttons
  rows.slice(1).forEach((row) => {
    const values = Array.from(row.querySelectorAll('p')).map((p) => p.textContent.trim());

    const [
      type = 'primary',
      text = 'Button',
      link = '#',
      showSvgRaw = 'false',
      svg = '',
      target = '_self',
    ] = values;

    const showSvg = showSvgRaw.toLowerCase() === 'true';

    const button = document.createElement('a');
    button.href = link;
    button.target = target;
    button.className = `button ${type}`;
    button.textContent = text;

    if (showSvg && svg) {
      const cleanSvg = svg.trim().replace(/^["'`]+|["'`]+$/g, '');
      const svgDoc = new DOMParser().parseFromString(cleanSvg, 'image/svg+xml');
      const svgElement = svgDoc.querySelector('svg');
      if (svgElement) {
        svgElement.classList.add('inline-icon');
        button.appendChild(svgElement);
      }
    }

    block.appendChild(button);
  });
}
