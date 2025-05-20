export default function decorate(block) {
  const rows = Array.from(block.children);
  const values = rows.map(row => row.querySelector('p')?.textContent?.trim());

  const [
    alignment = 'left',
    showPrimaryRaw = 'false',
    primaryText = 'Primary Button',
    primaryLink = '#',
    primarySvg = '', // New SVG field
    showSecondaryRaw = 'false',
    secondaryText = 'Secondary Button',
    secondaryLink = '#',
    secondarySvg = '' // New SVG field
  ] = values;

  const showPrimary = showPrimaryRaw.toLowerCase() === 'true';
  const showSecondary = showSecondaryRaw.toLowerCase() === 'true';

  block.textContent = '';

  block.classList.add('button-block', `align-${alignment}`);

  if (showPrimary) {
    const primary = document.createElement('a');
    primary.href = primaryLink;
    primary.className = 'button primary';
    primary.textContent = primaryText;
    const span = document.createElement('span');
    span.className = 'button-icon'
    span.innerHTML = primarySvg
    primary.append(span)
    block.append(primary);
  }

  if (showSecondary) {
    const secondary = document.createElement('a');
    secondary.href = secondaryLink;
    secondary.className = 'button secondary';
    secondary.textContent = secondaryText;
    const span = document.createElement('span');
    span.className = 'button-icon'
    span.innerHTML = secondarySvg
    secondary.append(span)
    block.append(secondary);
  }
}
