import { moveInstrumentation } from '../../scripts/scripts.js';
import { decorateIcons } from '../../scripts/aem.js';
import { span } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const accordionContainer = document.createElement('div');
  accordionContainer.className = 'accordion-container-block';
  moveInstrumentation(block, accordionContainer);

  const rows = [...block.children];
  if (rows.length < 3) return;

  const id = rows[0]?.querySelector('p')?.textContent?.trim() || '';
  const headingText = rows[1]?.querySelector('p')?.textContent?.trim() || '';
  const descriptionText = rows[2]?.querySelector('p')?.textContent?.trim() || '';

  accordionContainer.id = id;

  const headingEl = document.createElement('h2');
  headingEl.className = 'accordion-heading';
  headingEl.textContent = headingText;

  const descEl = document.createElement('p');
  descEl.className = 'accordion-description';
  descEl.textContent = descriptionText;

  accordionContainer.append(headingEl, descEl);

  const items = rows.slice(3);

  items.forEach((row) => {
    const parts = [...row.children];
    if (parts.length < 2) return;

    const itemTitle = parts[0]?.querySelector('p')?.textContent?.trim() || '';
    const itemDesc = parts[1]?.querySelector('p')?.textContent?.trim() || '';
    const linkLabel = parts[2]?.querySelector('p')?.textContent?.trim() || '';
    const linkAnchor = parts[3]?.querySelector('a');
    const target = parts[4]?.querySelector('p')?.textContent?.trim() || '_self';

    const item = document.createElement('div');
    item.className = 'accordion-item';
    moveInstrumentation(row, item);

    const button = document.createElement('button');
    button.className = 'accordion-toggle';
    button.setAttribute('aria-expanded', 'false');

    const titleSpan = document.createElement('span');
    titleSpan.className = 'accordion-title';
    titleSpan.textContent = itemTitle;

    const icon = span({ class: 'icon icon-accordion-down' });

    button.append(titleSpan, icon);

    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.hidden = true;

    const descPara = document.createElement('p');
    descPara.textContent = itemDesc;
    content.append(descPara);

    if (linkAnchor) {
      const link = document.createElement('a');
      link.href = linkAnchor.getAttribute('href');
      link.target = target;
      link.textContent = linkLabel;
      link.className = 'accordion-link';
      const arrowIcon = span({ class: 'icon icon-right-arrow' });
      link.append(arrowIcon);
      content.append(link);
    }

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const isNowExpanded = !expanded;

      button.setAttribute('aria-expanded', String(isNowExpanded));
      content.hidden = !isNowExpanded;
      item.classList.toggle('open', isNowExpanded);

      icon.className = isNowExpanded
        ? 'icon icon-accordion-up'
        : 'icon icon-accordion-down';
    });

    item.append(button, content);
    accordionContainer.append(item);
  });

  decorateIcons(accordionContainer);

  block.textContent = '';
  block.id = `${id}-content`;
  block.append(accordionContainer);
}
