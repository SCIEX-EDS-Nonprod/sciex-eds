const mockData = {
  title: "3 day introduction to triple quad with analyst at SCIC",
  provider: "DevRev",
  rating: 4.5,
  reviews: 120,
  description:
    "Learn the fundamentals of triple quad analysis with hands-on sessions.",

  learn: [
    "Triple quad basics",
    "Analyst workflow",
    "Real-world examples"
  ],

  requirements: [
    "Basic programming",
    "Interest in analytics"
  ],

  outline: [
    { day: "Day 1", topic: "Introduction" },
    { day: "Day 2", topic: "Advanced Concepts" },
    { day: "Day 3", topic: "Project" }
  ],

  resources: [
    { title: "Guide PDF", link: "#" },
    { title: "Dataset", link: "#" }
  ],

  sidebar: {
    level: "Beginner",
    duration: "3 days",
    price: "Free"
  }
};

export default async function decorate(block) {
  const data = mockData;

  block.innerHTML = `
    <div class="coursecatalog">
      
      <div class="course-main">
        ${renderHeader(data)}
        ${renderDescription(data)}
        ${renderList("What you'll learn", data.learn)}
        ${renderList("Requirements", data.requirements)}
        ${renderOutline(data.outline)}
        ${renderResources(data.resources)}
      </div>

      <div class="course-sidebar">
        ${renderSidebar(data.sidebar)}
      </div>

    </div>
  `;
}

/* ---------- Components ---------- */

function renderHeader(data) {
  return `
    <div class="course-header">
      <h1>${data.title}</h1>
      <p class="provider">${data.provider}</p>
      <div class="rating">
        ⭐ ${data.rating} (${data.reviews} reviews)
      </div>
    </div>
  `;
}

function renderDescription(data) {
  return `
    <div class="course-description">
      <p>${data.description}</p>
    </div>
  `;
}

function renderList(title, items) {
  return `
    <div class="course-section">
      <h3>${title}</h3>
      <ul>
        ${items.map(i => `<li>${i}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderOutline(outline) {
  return `
    <div class="course-section">
      <h3>Course Outline</h3>
      <ul>
        ${outline
          .map(o => `<li><strong>${o.day}:</strong> ${o.topic}</li>`)
          .join("")}
      </ul>
    </div>
  `;
}

function renderResources(resources) {
  return `
    <div class="course-section">
      <h3>Related Resources</h3>
      <ul>
        ${resources
          .map(r => `<li><a href="${r.link}">${r.title}</a></li>`)
          .join("")}
      </ul>
    </div>
  `;
}

function renderSidebar(sidebar) {
  return `
    <div class="sidebar-box">
      <p><strong>Level:</strong> ${sidebar.level}</p>
      <p><strong>Duration:</strong> ${sidebar.duration}</p>
      <p><strong>Price:</strong> ${sidebar.price}</p>

      <button class="enroll-btn">Enroll Now</button>
    </div>
  `;
}