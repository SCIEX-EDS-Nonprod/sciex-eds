export default function decorate(block) {
  const rows = Array.from(block.children);
  const values = rows.map((row) => row.querySelector('p')?.textContent?.trim());

  const [
    alignment = 'left',
    showPrimaryRaw = 'false',
    primaryText = 'Primary Button',
    primaryLink = '#',
    showPrimarySvgRaw = 'false',
    primarySvg = '',
    showSecondaryRaw = 'false',
    secondaryText = 'Secondary Button',
    secondaryLink = '#',
    showSecondarySvgRaw = 'false',
    secondarySvg = '',
  ] = values;

  const showPrimary = showPrimaryRaw.toLowerCase() === 'true';
  const showPrimarySvg = showPrimarySvgRaw.toLowerCase() === 'true';
  const showSecondary = showSecondaryRaw.toLowerCase() === 'true';
  const showSecondarySvg = showSecondarySvgRaw.toLowerCase() === 'true';

  block.textContent = '';
  block.classList.add('button-block', `align-${alignment}`);

  // Create and append primary button
  if (showPrimary) {
    const primary = document.createElement('a');
    primary.href = primaryLink;
    primary.className = 'button primary';
    primary.textContent = primaryText;

    if (showPrimarySvg && primarySvg) {
      const span = document.createElement('span');
      span.className = 'button-icon';
      span.innerHTML = primarySvg;
      primary.append(span);
    }

    block.append(primary);
  }

  // Create and append secondary button
  if (showSecondary) {
    const secondary = document.createElement('a');
    secondary.href = secondaryLink;
    secondary.className = 'button secondary';
    secondary.textContent = secondaryText;

    if (showSecondarySvg && secondarySvg) {
      const span = document.createElement('span');
      span.className = 'button-icon';
      span.innerHTML = secondarySvg;
      secondary.append(span);
    }

    block.append(secondary);
  }
}
