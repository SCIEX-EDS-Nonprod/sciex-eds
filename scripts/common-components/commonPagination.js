const renderCommonPagination = (dataOrController, itemsPerPage = 10) => {
  const paginationElement = document.getElementById('pagination');
  paginationElement.innerHTML = '';

  let hasNextPage = false;
  let hasPreviousPage = false;
  let currentPages = [];
  let currentPage = 1;
  let totalItems = 0;

  if (Array.isArray(dataOrController)) {
    // New data array approach
    totalItems = dataOrController.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // For now, just show pages 1-5 or all pages if less than 5
    const pagesToShow = Math.min(5, totalPages);
    currentPages = Array.from({ length: pagesToShow }, (_, i) => i + 1);

    hasPreviousPage = false; // Pagination functionality not implemented yet
    hasNextPage = totalPages > pagesToShow;
    currentPage = 1;
  } else {
    // Legacy controller approach
    const {
      currentPages: pages, hasNextPage: hasNext, hasPreviousPage: hasPrev, currentPage: page,
    } = dataOrController.state;
    currentPages = pages;
    hasNextPage = hasNext;
    hasPreviousPage = hasPrev;
    currentPage = page;
  }

  if (hasPreviousPage && dataOrController && dataOrController.previousPage) {
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none"><path d="M16.5 20L8.5 12L16.5 4" stroke="#141414"/></svg>';
    prevButton.onclick = () => {
      dataOrController.previousPage();
    };
    paginationElement.appendChild(prevButton);
  }

  currentPages.forEach((page) => {
    const pageButton = document.createElement('button');
    pageButton.className = 'tw-w-10 tw-h-10 tw-bg-transparent tw-border tw-border-gray-300 tw-rounded-lg tw-text-black tw-p-2';
    pageButton.innerText = page.toString();
    pageButton.disabled = page === currentPage;
    if (dataOrController && dataOrController.selectPage) {
      pageButton.onclick = () => {
        dataOrController.selectPage(page);
      };
    }
    paginationElement.appendChild(pageButton);
  });

  if (hasNextPage && dataOrController && dataOrController.nextPage) {
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none"><path d="M8.5 20L16.5 12L8.5 4" stroke="#141414"/></svg>';
    nextButton.onclick = () => {
      dataOrController.nextPage();
    };
    paginationElement.appendChild(nextButton);
  }
};

export default renderCommonPagination;
