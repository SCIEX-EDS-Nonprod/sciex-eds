import { moveInstrumentation } from "../../scripts/scripts";

export default function decorate(block) {
const categoriesContainer = document.createElement('div');
  categoriesContainer.className = 'categories-container-text';
  moveInstrumentation(block, categoriesContainer);  
  block.innerHTML = '';
  block.appendChild(categoriesContainer);
}