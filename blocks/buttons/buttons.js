export default function decorate(block) {
  const rows = Array.from(block.children);
  const values = rows.map(row => row.querySelector('p')?.textContent?.trim());

  const [
    alignment = 'left',
    showPrimaryRaw = 'false',
    primaryText = 'Primary Button',
    primaryLink = '#',
    showPrimarySvgRaw = 'false',
    primarySvg = '',
    primaryOptionToSelect = '_self', // Primary button target
    showSecondaryRaw = 'false',
    secondaryText = 'Secondary Button',
    secondaryLink = '#',
    showSecondarySvgRaw = 'false',
    secondarySvg = '',
    secondaryOptionToSelect = '_self' // Secondary button target
  ] = values;

  const showPrimary = showPrimaryRaw.toLowerCase() === 'true';
  const showPrimarySvg = showPrimarySvgRaw.toLowerCase() === 'true';
  const showSecondary = showSecondaryRaw.toLowerCase() === 'true';
  const showSecondarySvg = showSecondarySvgRaw.toLowerCase() === 'true';

  block.textContent = '';
  block.classList.add('button-block', `align-${alignment}`);

  function createButton({ text, link, className, svg, showSvg, target }) {
    const button = document.createElement('a');
    button.href = link;
    button.target = target; // Set target for primary/secondary button
    button.className = `button ${className}`;
    button.appendChild(document.createTextNode(text));

    if (showSvg && svg) {
      const cleanSvg = svg.trim().replace(/^`+|`+$/g, '').replace(/^'+|'+$/g, '').replace(/^"+|"+$/g, '');
      const parsedSvgDoc = new DOMParser().parseFromString(cleanSvg, 'image/svg+xml');
      const parsedSvg = parsedSvgDoc.querySelector('svg');
      if (parsedSvg) {
        parsedSvg.classList.add('inline-icon');
        button.append(parsedSvg);
      }
    }

    return button;
  }

  if (showPrimary) {
    block.append(
      createButton({
        text: primaryText,
        link: primaryLink,
        className: 'primary',
        svg: primarySvg,
        showSvg: showPrimarySvg,
        target: primaryOptionToSelect // Set target from the primary button option
      })
    );
  }

  if (showSecondary) {
    block.append(
      createButton({
        text: secondaryText,
        link: secondaryLink,
        className: 'secondary',
        svg: secondarySvg,
        showSvg: showSecondarySvg,
        target: secondaryOptionToSelect // Set target from the secondary button option
      })
    );
  }
}
