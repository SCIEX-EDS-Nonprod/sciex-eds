export default function decorate(block) {
  const rows = [...block.children];
  const headingRow = rows[0];
  const headingText = headingRow.querySelector('p')?.textContent;

    const heading = document.createElement('h2');
    heading.className = 'featured-key-workflows-title';
    heading.textContent = headingText;
  const aa='hiiii'

  block.innerHTML = '';
  block.append(aa)
}
