export default function decorate(block) {
  const rows = Array.from(block.children);
  const values = rows.map(row => row.querySelector('p')?.textContent?.trim());

  // Extract fields in order
  const [
    alignment = 'left',
    showPrimaryRaw = 'false',
    primaryText = 'Primary Button',
    primaryLink = '#',
    showSecondaryRaw = 'false',
    secondaryText = 'Secondary Button',
    secondaryLink = '#',
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
    block.append(primary);
  }

  if (showSecondary) {
    const secondary = document.createElement('a');
    secondary.href = secondaryLink;
    secondary.className = 'button secondary';
    secondary.textContent = secondaryText;
    block.append(secondary);
  }
}
