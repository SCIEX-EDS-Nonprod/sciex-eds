export default function decorate(block) {
  const config = block.dataset;

  const alignment = config.alignment || 'left';
  const showPrimary = config.showprimary === 'true';
  const showSecondary = config.showsecondary === 'true';
  const primaryText = config.primarytext || 'Primary Button';
  const primaryLink = config.primarylink || '#';
  const secondaryText = config.secondarytext || 'Secondary Button';
  const secondaryLink = config.secondarylink || '#';

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
