import { } from '../../scripts/aem.js';

export default function decorate(block) {
  const titleId = block.children[1].textContent;
  const headingDiv = document.createElement('div');
  headingDiv.classList.add('form-heading');
  headingDiv.textContent = titleId;
  const subHeading = block.children[2].textContent;
  const subHeadingDiv = document.createElement('div');
  subHeadingDiv.classList.add('form-sub-heading');
  subHeadingDiv.textContent = subHeading;

  const iframe = document.createElement('iframe');
  iframe.id = 'events-register-form';
  iframe.src = block.children[3].textContent;// 'https://info.sciex.com/LP=4907';
  iframe.className = 'iframe-form-container';
  block.innerHTML = '';
  block.append(headingDiv);
  block.append(subHeadingDiv);
  block.append(iframe);
}
