export default async function decorate(block) {
    const technologyBlock = document.createElement('div');
    technologyBlock.classList.add('sciex-products-technologies');
  
    const link = block.querySelector('a');
    const fragmentPath = link ? link.textContent.trim() : null;
  
    if (fragmentPath) {
      const resp = await fetch(`${fragmentPath}.plain.html`);
      if (resp.ok) {
        const fragment = document.createElement('div');
        fragment.innerHTML = await resp.text();
        technologyBlock.appendChild(fragment);
      }
    }
  
    block.appendChild(technologyBlock);
  }
  