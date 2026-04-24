import {
  div, p, img, a, span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  const categoryCardWrapper = div({ class: 'category-card-wrapper' });
  const [
    cardImage,
    categoryTitle,
    description,
    ctaLabel,
    ctaLink,
    ctaLinkTarget,
    bgColor,
  ] = block.children;

  const imageElement = cardImage?.querySelector('img');
  const imageUrl = imageElement?.getAttribute('src') || '';
  const imageAlt = imageElement?.getAttribute('alt') || 'Category Image';
  const title = categoryTitle?.textContent.trim() || '';
  const descriptionContent = description?.innerHTML.trim() || '';
  const ctaLabelText = ctaLabel?.textContent.trim() || '';
  const linkUrl = ctaLink?.textContent.trim() || '';
  const linkTarget = ctaLinkTarget?.textContent?.trim() === 'true';
  const backgroundColor = bgColor?.textContent.trim() || '#FFFFFF';

  const ctaTarget = linkTarget ? '_blank' : '_self';

  const cardContent = div(
    {
      class: 'category-card-content',
      style: `background-color: ${backgroundColor};`,
    },
    img({
      src: imageUrl,
      alt: imageAlt,
      class: 'category-card-image',
    }),
    div(
      { class: 'category-card-text-container' },
      p({ class: 'category-card-title' }, title),
      div({ class: 'category-card-description', innerHTML: descriptionContent }),
    ),
    a(
      {
        href: linkUrl,
        target: ctaTarget,
        class: 'category-card-cta',
      },
      span({ class: 'category-card-cta-label' }, ctaLabelText),
      span({ class: 'icon icon-arrow-right category-card-cta-icon' }),
    ),
  );

  categoryCardWrapper.appendChild(cardContent);
  decorateIcons(categoryCardWrapper);
  block.innerHTML = '';
  block.appendChild(categoryCardWrapper);
}
