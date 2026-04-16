export default function decorate(block) {
  const children = Array.from(block.children);
  if (children.length < 5) return;
  const courseId = children[0]?.textContent?.trim();
  const courseName = children[1]?.textContent?.trim();
  const courseUrl = children[2]?.textContent?.trim();
  const courseRating = children[3]?.textContent?.trim();
  const description = children[4]?.textContent?.trim();
  const duration = children[5]?.textContent?.trim();
  const region = children[6]?.textContent?.trim();
  const language = children[7]?.textContent?.trim();
  const courseType = children[8]?.textContent?.trim();
  const courseLevel = children[9]?.textContent?.trim();
  const cost = children[10]?.textContent?.trim();

    // ===== TITLE + RATING CONTAINER =====
  const courseHeaderContainer = document.createElement('div');
  courseHeaderContainer.className = 'course-header-container';

  courseHeaderContainer.innerHTML = `
    <h1 class="course-name">${courseName}</h1>
    <div class="rating">${courseRating}</div>
  `;
  const container = document.createElement('div');
  container.classList.add('description-container');
  container.innerHTML = description;

  // Find "Follow on courses" section
  const items = container.querySelectorAll('li');

  items.forEach(li => {
    const strong = li.querySelector('strong');

    if (strong && strong.textContent.includes('Follow on courses')) {
      const ul = li.querySelector('ul');

      if (ul) {
        const table = document.createElement('table');
        table.classList.add('course-table');

        Array.from(ul.children).forEach(childLi => {
          const tr = document.createElement('tr');

          const temp = document.createElement('div');
          temp.innerHTML = childLi.innerHTML;

          let fullText = temp.textContent;
          fullText = fullText.replace(/\u00A0/g, ' ');
          fullText = fullText.replace(/\s+/g, ' ').trim();

          const firstSpaceIndex = fullText.indexOf(' ');
          const code = fullText.slice(0, firstSpaceIndex).trim();

          let descHTML = temp.innerHTML.slice(firstSpaceIndex);
          descHTML = descHTML.replace(/&nbsp;/g, ' ');
          descHTML = descHTML.replace(/\s+/g, ' ').trim();

          const td1 = document.createElement('td');
          td1.textContent = code;

          const td2 = document.createElement('td');
          td2.innerHTML = descHTML; // keep formatting

          tr.append(td1, td2);
          table.appendChild(tr);
        });

        // Replace UL with TABLE
        li.replaceChild(table, ul);
      }
    }
  });

  block.textContent = '';
  block.append(courseHeaderContainer,container);
}