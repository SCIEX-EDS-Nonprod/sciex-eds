export default function decorate(block) {
  // Extract text content from each row of the block
  const values = Array.from(block.querySelectorAll('div')).map((div) => div.textContent.trim());

  const [
    alignment = 'left',
    showPrimaryRaw = 'false',
    primaryText = 'Primary Button',
    primaryLink = '#',
    primarySvg = '',
    showSecondaryRaw = 'false',
    secondaryText = 'Secondary Button',
    secondaryLink = '#',
    secondarySvg = '',
  ] = values;

  const showPrimary = showPrimaryRaw.toLowerCase() === 'true';
  const showSecondary = showSecondaryRaw.toLowerCase() === 'true';

  // Clear the block before appending new content
  block.textContent = '';
  block.classList.add('button-block', `align-${alignment}`);

  function createButton(className, text, link, svgMarkup) {
    const button = document.createElement('a');
    button.href = link;
    button.className = `button ${className}`;
    button.textContent = text;

    if (svgMarkup) {
      try {
        const svgElement = new DOMParser().parseFromString(svgMarkup, 'image/svg+xml').documentElement;
        button.append(svgElement);
      } catch (e) {
        console.warn('Invalid SVG provided:', svgMarkup);
      }
    }

    return button;
  }

  if (showPrimary) {
    const primaryButton = createButton('primary', primaryText, primaryLink, primarySvg);
    block.append(primaryButton);
  }

  if (showSecondary) {
    const secondaryButton = createButton('secondary', secondaryText, secondaryLink, secondarySvg);
    block.append(secondaryButton);
  }
}
