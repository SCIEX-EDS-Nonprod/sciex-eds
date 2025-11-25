export default function decorate(block) {
    const container = document.createElement('div');
    container.className = 'container-block';
    block.append(accordionContainer);
}