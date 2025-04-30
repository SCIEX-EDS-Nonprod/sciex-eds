export default async function decorate(block) {
  const technologyBlock = document.createElement('div');
  technologyBlock.classList.add('sciex-products-technologies');

  const links = Array.from(block.querySelectorAll('a'));
  block.textContent = '';

  const fragmentPromises = links.map(async (link) => {
    const fragmentPath = link.getAttribute('href') || link.textContent.trim();
    if (fragmentPath) {
      try {
        const resp = await fetch(`${fragmentPath}.plain.html`);
        if (resp.ok) {
          const fragment = document.createElement('div');
          fragment.innerHTML = await resp.text();
          return fragment;
        }
      } catch (e) {
        console.error(`Failed to load fragment: ${fragmentPath}`, e);
      }
    }
    return null;
  });

  const fragments = await Promise.all(fragmentPromises);
  fragments.forEach((fragment) => {
    if (fragment) technologyBlock.appendChild(fragment);
  });

  block.appendChild(technologyBlock);
}
