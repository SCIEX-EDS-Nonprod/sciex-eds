export default function decorate(block) {
  const statLictContainer = document.createElement('div');
  statLictContainer.className = 'stat-list-container-text';
  block.append(statLictContainer);
}
