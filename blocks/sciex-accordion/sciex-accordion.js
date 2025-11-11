export default function decorate(block) {
  const accordionContainer = document.createElement('div');
  accordionContainer.className = 'accordion-container-block';
  block.append(accordionContainer);
}
