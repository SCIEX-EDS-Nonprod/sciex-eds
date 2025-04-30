export default async function decorate(block) {
  const technologyBlock = document.createElement('div');
  technologyBlock.classList.add('sciex-products-technologies');

  const links = block.querySelectorAll('a');
  block.textContent = '';

  for (const link of links) {
    const fragmentPath = link.textContent.trim();
    if (fragmentPath) {
      try {
        const resp = await fetch(`${fragmentPath}.plain.html`);
        if (resp.ok) {
          const fragment = document.createElement('div');
          fragment.innerHTML = await resp.text();
          technologyBlock.appendChild(fragment);
        }
      } catch (e) {
        console.error(`Failed to load fragment: ${fragmentPath}`, e);
      }
    }
  }

  block.appendChild(technologyBlock);
}
