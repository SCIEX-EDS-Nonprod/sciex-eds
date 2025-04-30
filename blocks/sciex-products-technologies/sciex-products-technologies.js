export default async function decorate(block) {
  const technologyBlock = document.createElement('div');
  technologyBlock.classList.add('sciex-products-technologies');
  block.append(technologyBlock);
}
