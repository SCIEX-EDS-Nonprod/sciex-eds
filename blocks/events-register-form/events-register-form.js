import { } from '../../scripts/aem.js';

export default function decorate(block) {
  const iframe = document.createElement('iframe');
  iframe.id = 'events-register-form';
  iframe.src = 'https://info.sciex.com/LP=5059';
  iframe.style.overflow = 'hidden';
  iframe.className = 'iframe-form-container';
  block.append(iframe);
}
