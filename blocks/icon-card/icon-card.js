export default function decorate(block) {
    const iconCardContainer = document.createElement('div');
    iconCardContainer.className = 'icon-card-container-text';
  
    // Get the first child text content (if it exists)
    const id = block.querySelector(':scope > div')?.textContent?.trim() || '';

    iconCardContainer.id = id;
  
    block.append(iconCardContainer);
  }
  