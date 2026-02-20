// Simple scroll effect (future extensibility)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.textShadow = "0 0 10px rgba(91,140,255,0.7)";
  });

  link.addEventListener('mouseleave', () => {
    link.style.textShadow = "none";
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.about-left, .about-card')
  .forEach(el => {
    el.classList.add("hidden-section");
    observer.observe(el);
  });