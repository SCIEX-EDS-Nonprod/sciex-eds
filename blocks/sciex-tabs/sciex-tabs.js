export default async function decorate(block) {
    const blockDiv = document.createElement('div');
    blockDiv.classList.add('tab-main');
    block.append(block);
}