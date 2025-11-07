export default function decorate(block) {
  // Create the main container
  const statListContainer = document.createElement('div');
  statListContainer.className = 'stat-list-container-text';

  // Get data from the block dataset
  const rows = block.querySelectorAll(':scope > div');

  // The first div = container id (ignore or use as needed)
  const containerId = rows[0]?.textContent.trim();

  // The second div = main heading (e.g. "Benefits")
  const headingDiv = rows[1];
  const heading = headingDiv ? headingDiv.textContent.trim() : '';
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading;
    statListContainer.append(h2);
  }

  // Create a wrapper for the benefit cards
  const benefitsWrapper = document.createElement('div');
  benefitsWrapper.className = 'benefits-wrapper';

  // From the third div onwards → iterate to create benefit items
  rows.forEach((row, index) => {
    if (index < 2) return; // skip first two (id + heading)

    const cols = row.querySelectorAll(':scope > div');
    if (cols.length < 2) return;

    const title = cols[0].textContent.trim();
    const description = cols[1].textContent.trim();

    // Build each benefit card
    const card = document.createElement('div');
    card.className = 'benefit-card';

    const h3 = document.createElement('h3');
    h3.textContent = title;

    const p = document.createElement('p');
    p.textContent = description;

    card.append(h3, p);
    benefitsWrapper.append(card);
  });

  statListContainer.append(benefitsWrapper);
    // Clear existing content inside the block
    block.textContent = '';
  block.append(statListContainer);
}
