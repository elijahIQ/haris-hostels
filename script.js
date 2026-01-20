// 🏫 Tab Switching
function switchTab(tabId, event) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.hostels').forEach(section => section.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
  document.getElementById('searchInput').value = '';
}

// 🔍 Search
function searchHostels() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const activeTab = document.querySelector('.hostels.active');
  if (!activeTab) return;
  const hostels = activeTab.querySelectorAll('.hostel-card');

  hostels.forEach(hostel => {
    const name = (hostel.dataset.name || '').toLowerCase();
    const location = (hostel.dataset.location || '').toLowerCase();
    hostel.style.display = (name.includes(input) || location.includes(input)) ? 'block' : 'none';
  });
}

// 📸 Carousel Functionality
document.querySelectorAll('.carousel').forEach(carousel => {
  const imagesContainer = carousel.querySelector('.carousel-images');
  const images = imagesContainer.querySelectorAll('img');
  let index = 0;
  const total = images.length || 1;

  // Ensure each image container has the proper width (helps when responsive)
  imagesContainer.style.width = `${total * 100}%`;
  images.forEach(img => img.style.width = `${100 / total}%`);

  // Move slides
  carousel.dataset.index = 0;
  carousel.move = function (dir) {
    index = (Number(carousel.dataset.index) + dir + total) % total;
    carousel.dataset.index = index;
    imagesContainer.style.transform = `translateX(-${index * (100 / total)}%)`;
  };

  // Swipe functionality
  let startX = 0;
  imagesContainer.addEventListener('touchstart', e => {
    if (!e.touches || !e.touches[0]) return;
    startX = e.touches[0].clientX;
  });

  imagesContainer.addEventListener('touchend', e => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) carousel.move(1);
    else if (endX - startX > 50) carousel.move(-1);
  });

  // Optional: keyboard support (left/right) when carousel is focused
  carousel.tabIndex = 0;
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') carousel.move(-1);
    if (e.key === 'ArrowRight') carousel.move(1);
  });
});

// For buttons ❮ ❯
function moveSlide(btn, dir) {
  const carousel = btn.parentElement;
  if (carousel && typeof carousel.move === 'function') {
    carousel.move(dir);
  }
}

// Initialize: ensure first tab / first hostels section visible if page loads without active set
document.addEventListener('DOMContentLoaded', () => {
  const firstTab = document.querySelector('.tab');
  const firstHostels = document.querySelector('.hostels');
  if (firstTab && !document.querySelector('.tab.active')) firstTab.classList.add('active');
  if (firstHostels && !document.querySelector('.hostels.active')) firstHostels.classList.add('active');

  // Set widths for any carousels that might be present on load (responsive fix)
  document.querySelectorAll('.carousel').forEach(carousel => {
    const imagesContainer = carousel.querySelector('.carousel-images');
    const images = imagesContainer.querySelectorAll('img');
    const total = images.length || 1;
    imagesContainer.style.width = `${total * 100}%`;
    images.forEach(img => img.style.width = `${100 / total}%`);
  });
});
