export default function decorate(block) {
  const rows = Array.from(block.children);

  // Extract alignment from the first row
  const alignment = rows[0]?.querySelector('p')?.textContent?.trim() || 'left';

  block.innerHTML = '';
  block.classList.add('button-block', `align-${alignment}`);

  // Loop through each button row (starting from second div)
  rows.slice(1).forEach((row) => {
    const cells = Array.from(row.querySelectorAll('p')).map((p) => p.textContent.trim());

    const [
      type = 'primary',           // "primary" or "secondary"
      text = '',
      link = '#',
      showSvgRaw = 'false',
      svg = '',
      target = '_self',
    ] = cells;

    const showSvg = showSvgRaw.toLowerCase() === 'true';

    // Create button
    const button = document.createElement('a');
    button.href = link;
    button.target = target;
    button.className = `button ${type}`;
    button.textContent = text;

    // If SVG is shown and valid
    if (showSvg && svg && svg !== "''") {
      const cleanSvg = svg.replace(/^["'`]+|["'`]+$/g, '');
      const parsedSvgDoc = new DOMParser().parseFromString(cleanSvg, 'image/svg+xml');
      const parsedSvg = parsedSvgDoc.querySelector('svg');
      if (parsedSvg) {
        parsedSvg.classList.add('inline-icon');
        button.appendChild(parsedSvg);
      }
    }

    // Optional: add wrapper per type
    const wrapper = document.createElement('div');
    wrapper.classList.add(`button-wrapper-${type}`);
    wrapper.appendChild(button);

    block.appendChild(wrapper);
  });
}
