export default function decorate(block) {
  const rows = [...block.children];
  

  const grid = document.createElement('div');
  grid.className = 'featured-key-workflows-grid';

 

  block.innerHTML = '';
  block.appendChild(grid);
}