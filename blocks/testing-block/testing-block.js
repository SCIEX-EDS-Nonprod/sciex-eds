export default function decorate(block) {
  const testTabContainer = document.createElement('div');
  testTabContainer.className = 'test-tabs-container-block';
  block.append(testTabContainer);
}
