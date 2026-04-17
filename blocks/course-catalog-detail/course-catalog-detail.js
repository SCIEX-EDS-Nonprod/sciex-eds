export default function decorate(block) {
  const children = Array.from(block.children);
  if (children.length < 10) return;
  const courseId = children[0]?.textContent?.trim();
  const courseTitle = children[1]?.textContent?.trim();
  const courseUrl = children[2]?.textContent?.trim();
  const courseRating = children[3]?.textContent?.trim();
  const description = children[4]?.textContent?.trim();
  const duration = children[5]?.textContent?.trim();
  const region = children[6]?.textContent?.trim();
  const language = children[7]?.textContent?.trim();
  const courseType = children[8]?.textContent?.trim();
  const courseLevel = children[9]?.textContent?.trim();

  const courseHeaderContainer = document.createElement('div');
  courseHeaderContainer.className = 'course-header-container';

  courseHeaderContainer.innerHTML = `
  <div class="course-header-row">
    <div class="course-header-left">
      <h1 class="course-name">${courseTitle}</h1>
      <div class="rating">Rating: ${courseRating}</div>
    </div>

   <div class="course-header-social">
      <span class="favorite-icon" aria-label="Favorite">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 22"
          width="20"
          height="20"
          fill="none"
          stroke="#000"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21.1412 11.2293L11.7662 20.5143L2.39125 11.2293C1.77288 10.6275 1.2858 9.90428 0.96068 9.10505C0.635562 8.30583 0.479448 7.44795 0.502167 6.58543C0.524887 5.7229 0.725949 4.87443 1.09269 4.09343C1.45944 3.31243 1.98391 2.61583 2.6331 2.04748C3.28229 1.47914 4.04213 1.05137 4.86476 0.79111C5.68739 0.53085 6.555 0.443739 7.41296 0.535261C8.27091 0.626783 9.10062 0.894955 9.84984 1.32289C10.5991 1.75083 11.2516 2.32926 11.7662 3.02176C12.2832 2.33429 12.9364 1.76091 13.6851 1.33752C14.4338 0.91412 15.2619 0.649821 16.1174 0.561159C16.973 0.472497 17.8376 0.561382 18.6572 0.822249C19.4768 1.08312 20.2338 1.51035 20.8807 2.07721C21.5276 2.64408 22.0505 3.33836 22.4168 4.11662C22.783 4.89488 22.9847 5.74036 23.0091 6.60014C23.0336 7.45993 22.8803 8.3155 22.5589 9.11332C22.2375 9.91114 21.7549 10.634 21.1412 11.2368" />
        </svg>
      </span>  
    </div>
  </div>

  <div class="course-header-border"></div>
`;

  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('description-container');
  descriptionContainer.innerHTML = description;

  // ===== Convert "Follow on courses" UL → TABLE =====
  const items = descriptionContainer.querySelectorAll('li');

  items.forEach((li) => {
    const strong = li.querySelector('strong');

    if (strong && strong.textContent.includes('Follow on courses')) {
      const ul = li.querySelector('ul');

      if (ul) {
        const table = document.createElement('table');
        table.classList.add('course-table');

        Array.from(ul.children).forEach((childLi) => {
          const tr = document.createElement('tr');

          const temp = document.createElement('div');
          temp.innerHTML = childLi.innerHTML;

          let fullText = temp.textContent
            .replace(/\u00A0/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          const firstSpaceIndex = fullText.indexOf(' ');
          const code = fullText.slice(0, firstSpaceIndex).trim();

          let descHTML = temp.innerHTML.slice(firstSpaceIndex)
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          const td1 = document.createElement('td');
          td1.textContent = code;

          const td2 = document.createElement('td');
          td2.innerHTML = descHTML;

          tr.append(td1, td2);
          table.appendChild(tr);
        });

        li.replaceChild(table, ul);
      }
    }
  });

  // ===== RIGHT (COURSE DETAILS) =====
  const courseDetailsContainer = document.createElement('div');
  courseDetailsContainer.className = 'course-details-container';

  courseDetailsContainer.innerHTML = `
  <h3 class="course-details-title">Course details</h3>
  <div class="course-detail-info">

  <div class="course-detail-row">
    <span class="course-detail-key">Cost:</span>
    <span class="course-detail-value">$500</span>
  </div>

  <div class="course-detail-row">
    <span class="course-detail-key">Duration:</span>
    <span class="course-detail-value">${duration}</span>
  </div>

  <div class="course-detail-row">
    <span class="course-detail-key">Region:</span>
    <span class="course-detail-value">${region}</span>
  </div>

  <div class="course-detail-row">
    <span class="course-detail-key">Language:</span>
    <span class="course-detail-value">${language}</span>
  </div>

  <div class="course-detail-row">
    <span class="course-detail-key">Type:</span>
    <span class="course-detail-value">${courseType}</span>
  </div>

  <div class="course-detail-row">
    <span class="course-detail-key">Course Level:</span>
    <span class="course-detail-value">${courseLevel}</span>
  </div>
  </div>
  <div class="course-action-row">
   <a href="/take-course" class="btn primary">Take course</a>
   <a href="/my-learning-hub" class="btn secondary">Request a quote</a>
  </div> 
`;

  // ===== MAIN LAYOUT WRAPPER =====
  const layout = document.createElement('div');
  layout.className = 'course-layout';

  layout.append(descriptionContainer, courseDetailsContainer);
  const mainLayout = document.createElement('div');
  mainLayout.className = 'course-catalog-detail-main-layout';
  mainLayout.append(courseHeaderContainer, layout);
  block.textContent = '';
  block.append(mainLayout);
}