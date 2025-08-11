const posts = [
  { title: "Tech Trends 2025", category: "tech", img: "images/tech1.jpg", date: "Aug 1, 2025", desc: "Latest in AI and Web." },
  { title: "Travel in Japan", category: "travel", img: "images/travel1.jpg", date: "July 22, 2025", desc: "Exploring Tokyo." },
  { title: "Best Pasta Recipes", category: "food", img: "images/food1.jpg", date: "July 10, 2025", desc: "Delicious and easy pasta." },
];

const postsContainer = document.getElementById("posts-container");
const categoryButtons = document.querySelectorAll("nav button");
const paginationContainer = document.getElementById("pagination");

let currentCategory = "all";
let currentPage = 1;
const postsPerPage = 4;

function renderPosts() {
  postsContainer.innerHTML = "";

  let filteredPosts = currentCategory === "all" 
    ? posts 
    : posts.filter(p => p.category === currentCategory);

  let start = (currentPage - 1) * postsPerPage;
  let end = start + postsPerPage;
  let paginatedPosts = filteredPosts.slice(start, end);

  paginatedPosts.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";
    card.innerHTML = `
      <img src="${post.img}" alt="${post.title}">
      <div class="content">
        <h3>${post.title}</h3>
        <small>${post.date}</small>
        <p>${post.desc}</p>
      </div>
    `;
    postsContainer.appendChild(card);
  });

  renderPagination(filteredPosts.length);
}

function renderPagination(totalPosts) {
  paginationContainer.innerHTML = "";
  let totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderPosts();
    });
    paginationContainer.appendChild(btn);
  }
}

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    currentPage = 1;
    renderPosts();
  });
});

renderPosts();
