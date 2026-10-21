import { getMetadata, decorateIcons } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { span } from '../../scripts/dom-builder.js';

/** ********
     *
     *
     *
      function to check if mobile actions can be performed
     *
     *
     *
     *  */
function canMobileActions() {
  const screenWidth = window.innerWidth;
  if (screenWidth > 767) {
    return false;
  }
  return true;
}

/* function canTabletActions() {
  const screenWidth = window.innerWidth;
  if (screenWidth > 1024 || screenWidth < 768) {
    return false;
  }
  return true;
} */

function handleFirstSection(child, firstSectionContent) {
  firstSectionContent.append(child);
}

function handleMiddleSections(child, block, iteration) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add(`wrapper-${iteration}`, 'footer-list');

  const nav = document.createElement('nav');
  const newContainer = document.createElement('div');
  newContainer.classList.add('image-box');
  nav.classList.add('footer-navigation');
  nav.setAttribute('aria-label', 'Footer navigation');

  const sections = child.querySelectorAll('p');

  sections.forEach((section, sectionIndex) => {
    const sectionTitle = section.textContent.trim();
    const list = section.nextElementSibling;
    const chevronDown = span({
      class:
        'icon icon-chevron-down tw-text-mobBase md:tw-text-base tw-font-bold tw-tracking-wide stretch-text tw-pr-6',
    });
    const chevronUp = span({
      class:
        'icon icon-chevron-up tw-text-mobBase md:tw-text-base tw-font-bold tw-tracking-wide stretch-text tw-pr-6',
    });

    const sectionDiv = document.createElement('div');
    sectionDiv.classList.add('footer-section');
    if (list && list.tagName === 'UL') {
      const titleButton = document.createElement('button');
      titleButton.type = 'button';
      titleButton.classList.add('footer-section-title');
      titleButton.append(sectionTitle, chevronDown, chevronUp);

      const ul = document.createElement('ul');
      ul.classList.add('footer-section-list');
      ul.id = `footer-section-${iteration}-${sectionIndex}`;
      const isExpanded = window.matchMedia('(min-width: 768px)').matches;
      titleButton.setAttribute('aria-controls', ul.id);
      titleButton.setAttribute('aria-expanded', String(isExpanded));

      list.querySelectorAll('li a').forEach((link) => {
        const li = document.createElement('li');
        li.classList.add('footer-item');

        const a = document.createElement('a');
        a.classList.add('footer-link');
        a.href = link.href;
        a.title = link.textContent;
        a.textContent = link.textContent;

        li.appendChild(a);
        ul.appendChild(li);
      });

      sectionDiv.appendChild(titleButton);
      sectionDiv.appendChild(ul);
      nav.appendChild(sectionDiv);
    } else {
      const paragraphWithImage = section.querySelector('p > picture');
      if (paragraphWithImage) {
        const anchor = document.createElement('a');
        anchor.href = 'https://lifesciences.danaher.com';
        anchor.title = 'https://lifesciences.danaher.com';
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.appendChild(paragraphWithImage.cloneNode(true));
        newContainer.appendChild(anchor);
      }
    }
    const titleButton = sectionDiv.querySelector('.footer-section-title');
    if (titleButton) {
      titleButton.addEventListener('click', () => {
        if (window.matchMedia('(min-width: 768px)').matches) return;

        const listElement = document.getElementById(titleButton.getAttribute('aria-controls'));
        if (!listElement) return;

        const nextExpanded = titleButton.getAttribute('aria-expanded') !== 'true';
        listElement.style.display = nextExpanded ? 'block' : 'none';
        titleButton.setAttribute('aria-expanded', String(nextExpanded));
        titleButton.querySelector('.icon-chevron-down').style.display = nextExpanded ? 'none' : '';
        titleButton.querySelector('.icon-chevron-up').style.display = nextExpanded ? '' : 'none';

        if (nextExpanded) {
          nav.querySelectorAll('.footer-section-title[aria-expanded="true"]').forEach((otherButton) => {
            if (otherButton !== titleButton) {
              otherButton.setAttribute('aria-expanded', 'false');
              const otherList = document.getElementById(otherButton.getAttribute('aria-controls'));
              if (otherList) otherList.style.display = 'none';
              otherButton.querySelector('.icon-chevron-down').style.display = '';
              otherButton.querySelector('.icon-chevron-up').style.display = 'none';
            }
          });
        }
      });
    }
  });

  wrapperDiv.appendChild(nav);

  const header = child.querySelector('h2');
  const headerDiv = document.createElement('div');
  if (header) {
    headerDiv.classList.add(
      'footer-heading-div',
      'tw-pb-32',
      'tw-pt-48',
      'md:tw-py-64',
      'tw-border-b',
      'tw-border-grey-700',
      'tw-flex',
      'tw-flex-col',
      'md:tw-flex-row',
      'tw-justify-start',
      'md:tw-justify-between',
      'md:tw-items-end',
    );
    const headerH2 = document.createElement('h2');
    headerH2.classList.add(
      'footer-heading',
      'tw-text-[64px]',
      'tw-leading-[72px]',
      'md:tw-text-xl-display',
      'tw-text-white',
      'tw-font-thin',
      'tw-max-w-[700px]',
      'tw-tracking-tight',
    );
    headerH2.textContent = header.textContent;
    headerDiv.appendChild(headerH2);
    wrapperDiv.appendChild(headerDiv);
  }
  headerDiv.appendChild(newContainer);
  if (header != null) {
    const hr = document.createElement('hr');
    hr.classList.add('footer-divider');
    wrapperDiv.appendChild(hr);
  }
  block.appendChild(wrapperDiv);
  decorateIcons(wrapperDiv);
}

function handleBlockSection(child, block, iteration) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add(`wrapper-${iteration}`, 'black-section');

  const uniqueId = getMetadata('pagetrackingid');
  const paragraphs = child.querySelectorAll('p');

  // ✅ Add ot-sdk-show-settings to "Cookies Settings" link
  const cookieLink = child.querySelector('a[title="Cookies Settings"]');
  if (cookieLink) {
    cookieLink.classList.add('ot-sdk-show-settings');
  }

  if (paragraphs.length >= 2) {
    const secondLastParagraph = paragraphs[paragraphs.length - 2];
    const lastParagraph = paragraphs[paragraphs.length - 1];

    secondLastParagraph.classList.add('tracking-id-paragraph');
    lastParagraph.classList.add('logo-paragraph');

    // Append uniqueId to the second-last paragraph
    secondLastParagraph.append(` ${uniqueId}`);

    // Create a new container for the two paragraphs
    const pContainer = document.createElement('div');
    pContainer.classList.add('paragraph-container'); // Optional: for styling

    pContainer.append(secondLastParagraph);
    pContainer.append(lastParagraph);

    // Append pContainer in place of the original two <p> elements
    child.append(pContainer);
  }

  wrapperDiv.append(child);
  block.append(wrapperDiv);
}

function handleLogoSection(child, block, iteration) {
  const pictures = child.querySelectorAll('picture');
  const links = child.querySelectorAll('a');

  const linkMap = [];
  links.forEach((link, index) => {
    linkMap[index] = link.getAttribute('href');
  });

  const ul = document.createElement('ul');
  ul.classList.add('logo-container');

  pictures.forEach((picture, index) => {
    const img = picture.querySelector('img');
    if (!img) return;

    const altText = img.getAttribute('alt') || 'Logo';
    const anchor = document.createElement('a');

    anchor.href = linkMap[index] || '#';
    anchor.target = '_blank';
    anchor.setAttribute('aria-label', altText);
    anchor.rel = 'noopener noreferrer';
    anchor.classList.add('logo-link');

    anchor.appendChild(img);

    const li = document.createElement('li');
    li.classList.add('logo-item');
    li.appendChild(anchor);

    ul.appendChild(li);
  });

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add(`wrapper-${iteration}`, 'black-section-logo');
  wrapperDiv.append(ul);

  block.append(wrapperDiv);
}

/**
 * Creates and returns the language selector dropdown
 */
function createSocialLinks() {
  const socialPlatforms = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/sciex',
      svg: '<svg viewBox="0 0 16 16" fill="none"><path d="M3.91708 15.3333H0.825185V5.50271H3.91708V15.3333ZM2.41077 4.15496C1.45942 4.15496 0.666626 3.36217 0.666626 2.41082C0.666626 1.45947 1.45942 0.666672 2.41077 0.666672C3.36212 0.666672 4.15491 1.45947 4.15491 2.41082C4.15491 3.36217 3.36212 4.15496 2.41077 4.15496ZM15.3333 15.3333H12.2414V10.5766C12.2414 9.46667 12.2414 7.96037 10.6558 7.96037C9.07023 7.96037 8.83239 9.22883 8.83239 10.4973V15.3333H5.7405V5.50271H8.75311V6.85046H8.83239C9.22879 6.05766 10.2594 5.26487 11.6864 5.26487C14.7783 5.26487 15.3333 7.32613 15.3333 9.94235V15.3333Z" fill="currentColor"></path></svg>',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/SCIEXnews',
      svg: '<svg viewBox="0 0 16 16" fill="none"><path d="M5.02682 14.3295C11.0345 14.3295 14.3448 9.36398 14.3448 5.07279C14.3448 4.95019 14.3448 4.76628 14.3448 4.64367C14.9579 4.15325 15.5096 3.60153 16 2.9272C15.387 3.17241 14.7739 3.35632 14.0996 3.41762C14.7739 2.9885 15.2644 2.37547 15.5096 1.57854C14.8966 1.94636 14.1609 2.25287 13.4253 2.37547C12.8123 1.76245 11.954 1.33333 11.0345 1.33333C9.2567 1.33333 7.78544 2.80459 7.78544 4.58237C7.78544 4.82758 7.78544 5.07279 7.84674 5.318C5.14943 5.2567 2.69732 3.96934 1.10345 2.00766C0.858238 2.49808 0.67433 3.0498 0.67433 3.66283C0.67433 4.82758 1.22605 5.80842 2.14559 6.36015C1.59387 6.36015 1.10345 6.17624 0.613027 5.93103C0.613027 5.93103 0.613027 5.93103 0.613027 5.99233C0.613027 7.5862 1.71648 8.87356 3.24904 9.18007C3.00383 9.24137 2.69732 9.30268 2.3908 9.30268C2.2069 9.30268 1.96169 9.30268 1.77778 9.24137C2.2069 10.5287 3.37165 11.5096 4.84291 11.5096C3.73946 12.3678 2.3295 12.9195 0.796935 12.9195C0.551724 12.9195 0.245211 12.9195 0 12.8582C1.47126 13.7778 3.18774 14.3295 5.02682 14.3295Z" fill="currentColor"></path></svg>',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/SCIEXnews',
      svg: '<svg viewBox="0 0 16 16" fill="none"><path d="M8.91101 15.3333V8.63047H11.1674L11.4992 6.04224H8.91101V4.38311C8.91101 3.6531 9.11011 3.12218 10.1719 3.12218H11.5656V0.799402C11.3002 0.799402 10.5038 0.666672 9.57466 0.666672C7.58371 0.666672 6.25641 1.86124 6.25641 4.11765V6.04224H4V8.63047H6.25641V15.3333H8.91101Z" fill="currentColor"></path></svg>',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/instasciex',
      svg: '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3.5" stroke="currentColor" stroke-width="1.5"></circle><circle cx="12.5" cy="3.5" r="1" fill="currentColor"></circle><rect x="1.5" y="1.5" width="13" height="13" rx="3.5" stroke="currentColor" stroke-width="1.5"></rect></svg>',
    },
  ];

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Social media');
  const ul = document.createElement('ul');

  socialPlatforms.forEach((platform) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = platform.url;
    a.title = platform.name;
    a.setAttribute('aria-label', platform.name);
    a.rel = 'noopener noreferrer';
    a.innerHTML = platform.svg;
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  return nav;
}

// function to  add country flag before name
function addCountryFlag(countryCode) {
  const countryIcon = document.createElement('img');
  countryIcon.alt = countryCode;
  countryIcon.src = `/icons/${countryCode}.svg`;
  return countryIcon;
}

function processFragment(block, fragment) {
  const firstSectionContent = document.createElement('div');
  firstSectionContent.classList.add('footer-social-links');
  firstSectionContent.appendChild(createSocialLinks());

  Array.from(fragment.children).forEach((child, index) => {
    const iteration = index + 1;

    if (iteration === 1) {
      handleFirstSection(child, firstSectionContent);
    } else if (iteration === 2) {
      handleMiddleSections(child, block, iteration);
    } else if (iteration === 3) {
      handleBlockSection(child, block, iteration);
    } else if (iteration === 4) {
      handleLogoSection(child, block, iteration);
    }
  });

  const chevronDown = span({
    class:
      'icon icon-chevron-down tw-text-mobBase md:tw-text-base tw-font-bold tw-tracking-wide stretch-text tw-pr-6',
  });
  const chevronUp = span({
    class:
      'icon icon-chevron-up tw-text-mobBase md:tw-text-base tw-font-bold tw-tracking-wide stretch-text tw-pr-6',
  });
  const usflag = span({
    class:
      'icon icon-us tw-text-mobBase md:tw-text-base tw-font-bold tw-tracking-wide stretch-text tw-pr-6',
  });
  const esflag = span({
    class:
      'icon icon-es tw-text-mobBase md:tw-text-base tw-font-bold tw-tracking-wide stretch-text tw-pr-6',
  });
  const jpflag = span({
    class:
      'icon icon-jp tw-text-mobBase md:tw-text-base tw-font-bold tw-tracking-wide stretch-text tw-pr-6',
  });
  const krflag = span({
    class:
      'icon icon-kr tw-text-mobBase md:tw-text-base tw-font-bold tw-tracking-wide stretch-text tw-pr-6',
  });
  const cnflag = span({
    class:
      'icon icon-cn tw-text-mobBase md:tw-text-base tw-font-bold tw-tracking-wide stretch-text tw-pr-6',
  });

  const countrySelect = firstSectionContent.querySelector(
    '.default-content-wrapper',
  );
  const ul = countrySelect?.querySelector('ul');
  if (!countrySelect || !ul || !ul.querySelector('li')) {
    block.prepend(firstSectionContent);
    return;
  }
  const selectedLanguage = document.createElement('button');
  selectedLanguage.type = 'button';
  selectedLanguage.classList.add('selected-language');
  selectedLanguage.setAttribute('aria-haspopup', 'dialog');
  const listItems = ul.getElementsByTagName('li');
  countrySelect.appendChild(selectedLanguage);

  const activeLanguageIcon = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" x-transition="" data-di-rand="1740542366829"><circle cx="10" cy="10" r="10" fill="#0068FA"></circle><path d="M5.33331 9.66667L8.77551 13L14.6666 6" stroke="white"></path></svg>';

  if (listItems[0].textContent === 'English') {
    selectedLanguage.append(addCountryFlag('us'), listItems[0].textContent);
  } else if (listItems[0].textContent === 'Japanese') {
    selectedLanguage.append(addCountryFlag('jp'), listItems[0].textContent);
  } else if (listItems[0].textContent === 'Korean') {
    selectedLanguage.append(addCountryFlag('kr'), listItems[0].textContent);
  } else if (listItems[0].textContent === 'Spanish') {
    selectedLanguage.append(addCountryFlag('es'), listItems[0].textContent);
  } else if (listItems[0].textContent === 'Chinese') {
    selectedLanguage.append(addCountryFlag('cn'), listItems[0].textContent);
  }

  if (selectedLanguage.textContent === 'English') {
    selectedLanguage.prepend(usflag);
  } else if (selectedLanguage.textContent === 'Japanese') {
    selectedLanguage.prepend(jpflag);
  } else if (selectedLanguage.textContent === 'Korean') {
    selectedLanguage.prepend(krflag);
  } else if (selectedLanguage.textContent === 'Spanish') {
    selectedLanguage.prepend(esflag);
  } else if (selectedLanguage.textContent === 'Chinese') {
    selectedLanguage.prepend(cnflag);
  }

  // Modal code for language selection
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.id = 'footer-language-dialog';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  const modalHeader = document.createElement('h3');
  modalHeader.textContent = 'Choose your Language:';
  modalHeader.classList.add('modal-header');
  modalHeader.id = 'footer-language-dialog-title';
  modal.setAttribute('aria-labelledby', modalHeader.id);
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modal.appendChild(modalContent);
  modalContent.appendChild(modalHeader);
  const closeCta = document.createElement('button');
  closeCta.type = 'button';
  closeCta.classList.add('close');
  closeCta.textContent = 'x';
  closeCta.setAttribute('aria-label', 'x, close language selector');
  modalContent.appendChild(closeCta);
  modalContent.appendChild(ul);

  // set the first language as active and add the svg selected icon to it...

  const initialCountryList = modalContent.querySelectorAll('ul li')[0];
  if (initialCountryList) {
    const activeCountry = initialCountryList.querySelector('a');
    activeCountry.className = 'active';
    activeCountry.insertAdjacentHTML('beforeend', activeLanguageIcon);
  }

  firstSectionContent.appendChild(modal);

  selectedLanguage.appendChild(chevronDown);
  selectedLanguage.appendChild(chevronUp);

  const mobileNav = document.querySelector('.footer-navigation');
  const cloneSelectedlang = selectedLanguage.cloneNode(true);

  mobileNav?.appendChild(cloneSelectedlang);

  selectedLanguage.setAttribute('aria-controls', modal.id);
  cloneSelectedlang.setAttribute('aria-controls', modal.id);
  selectedLanguage.setAttribute('aria-expanded', 'false');
  cloneSelectedlang.setAttribute('aria-expanded', 'false');
  selectedLanguage.setAttribute('aria-label', `Select language, ${selectedLanguage.textContent}`);
  cloneSelectedlang.setAttribute('aria-label', selectedLanguage.getAttribute('aria-label'));

  const closeLanguageModal = () => {
    modal.style.display = 'none';
    selectedLanguage.setAttribute('aria-expanded', 'false');
    cloneSelectedlang.setAttribute('aria-expanded', 'false');
    const focusTarget = canMobileActions() && cloneSelectedlang.isConnected
      ? cloneSelectedlang
      : selectedLanguage;
    focusTarget.focus();
  };
  const openLanguageModal = () => {
    modal.style.display = 'flex';
    selectedLanguage.setAttribute('aria-expanded', 'true');
    cloneSelectedlang.setAttribute('aria-expanded', 'true');
    modalContent.querySelector('a')?.focus();
  };

  closeCta.addEventListener('click', closeLanguageModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeLanguageModal();
    }
  });
  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLanguageModal();
      return;
    }

    if (event.key === 'Tab') {
      const focusableElements = [...modal.querySelectorAll('button, a[href]')];
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  });
  const optionLinks = ul.querySelectorAll('li a');
  selectedLanguage.addEventListener('click', (e) => {
    e.preventDefault();
    openLanguageModal();
  });

  cloneSelectedlang.addEventListener('click', (e) => {
    e.preventDefault();
    openLanguageModal();
  });

  const clickFn = function handleLanguageSelection(e) {
    e.preventDefault();

    selectedLanguage.textContent = this.text;
    cloneSelectedlang.textContent = this.text;
    selectedLanguage.setAttribute('aria-label', `Select language, ${this.text}`);
    cloneSelectedlang.setAttribute('aria-label', selectedLanguage.getAttribute('aria-label'));
    const activeLink = document.querySelector('li .active');

    if (activeLink) {
      activeLink.classList.remove('active');
      const svgLanguageIcon = activeLink.querySelector('svg');
      if (svgLanguageIcon) {
        activeLink.removeChild(svgLanguageIcon);
      }
    }

    this.classList.add('active');

    const selectedLanguageMobile = document.querySelector(
      '.wrapper-2 .selected-language',
    );

    this.insertAdjacentHTML('beforeend', activeLanguageIcon);
    if (this.text === 'English') {
      cloneSelectedlang.prepend(addCountryFlag('us'), usflag);
      selectedLanguage.prepend(addCountryFlag('us'), usflag);

      selectedLanguage.appendChild(chevronDown);
      selectedLanguage.appendChild(chevronUp);
      this.prepend(usflag);

      if (selectedLanguageMobile && canMobileActions()) {
        selectedLanguageMobile.append(chevronDown);
        selectedLanguageMobile.append(chevronUp);
      }
    } else if (this.text === 'Japanese') {
      cloneSelectedlang.prepend(addCountryFlag('jp'), jpflag);
      selectedLanguage.prepend(addCountryFlag('jp'), jpflag);
      selectedLanguage.appendChild(chevronDown);
      selectedLanguage.appendChild(chevronUp);

      this.prepend(jpflag);
      if (selectedLanguageMobile && canMobileActions()) {
        selectedLanguageMobile.append(chevronDown);
        selectedLanguageMobile.append(chevronUp);
      }
    } else if (this.text === 'Korean') {
      cloneSelectedlang.prepend(addCountryFlag('kr'), krflag);
      selectedLanguage.prepend(addCountryFlag('kr'), krflag);
      selectedLanguage.appendChild(chevronDown);
      selectedLanguage.appendChild(chevronUp);
      this.prepend(krflag);
      if (selectedLanguageMobile && canMobileActions()) {
        selectedLanguageMobile.append(chevronDown);
        selectedLanguageMobile.append(chevronUp);
      }
    } else if (this.text === 'Spanish') {
      cloneSelectedlang.prepend(addCountryFlag('es'), esflag);
      selectedLanguage.prepend(addCountryFlag('es'), esflag);
      selectedLanguage.appendChild(chevronDown);
      selectedLanguage.appendChild(chevronUp);
      this.prepend(esflag);
      if (selectedLanguageMobile && canMobileActions()) {
        selectedLanguageMobile.append(chevronDown);
        selectedLanguageMobile.append(chevronUp);
      }
    } else if (this.text === 'Chinese') {
      cloneSelectedlang.prepend(addCountryFlag('cn'), cnflag);
      selectedLanguage.prepend(addCountryFlag('cn'), cnflag);
      selectedLanguage.appendChild(chevronDown);
      selectedLanguage.appendChild(chevronUp);
      this.prepend(cnflag);
      if (selectedLanguageMobile && canMobileActions()) {
        selectedLanguageMobile.append(chevronDown);
        selectedLanguageMobile.append(chevronUp);
      }
    }
    closeLanguageModal();
  };

  for (let i = 0; i < optionLinks.length; i += 1) {
    optionLinks[i].addEventListener('click', clickFn);
    optionLinks[i].classList.add(
      'tw-mx-3',
      'stretch-text',
      'tw-font-bold',
      'tw-tracking-wide',
      'country-list',
    );
    if (optionLinks[i].textContent === 'English') {
      optionLinks[i].prepend(usflag);
    } else if (optionLinks[i].textContent === 'Japanese') {
      optionLinks[i].prepend(jpflag);
    } else if (optionLinks[i].textContent === 'Korean') {
      optionLinks[i].prepend(krflag);
    } else if (optionLinks[i].textContent === 'Spanish') {
      optionLinks[i].prepend(esflag);
    } else if (optionLinks[i].textContent === 'Chinese') {
      optionLinks[i].prepend(cnflag);
    }
  }

  decorateIcons(firstSectionContent);
  block.prepend(firstSectionContent);
}

export default async function decorate(block) {
  const { lang } = document.documentElement;
  let path = '/footer';
  if (lang === 'en') {
    path = '/footer';
  } else if (lang === 'ja') {
    path = '/ja-jp/footer';
  } else if (lang === 'zh-cn') {
    path = '/zh-cn/footer';
  }
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : path;
  let fragment;
  try {
    fragment = await loadFragment(footerPath);
  } catch {
    return;
  }
  block.textContent = '';
  processFragment(block, fragment);
}
