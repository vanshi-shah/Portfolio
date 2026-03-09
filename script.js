// Simple scroll effect (future extensibility)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.textShadow = "0 0 10px rgba(91,140,255,0.7)";
  });

  /* =========================
   NAVBAR ACTIVE SECTION
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });

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

/* =========================
    PROJECTS FILTER
========================= */
document.addEventListener("DOMContentLoaded", function () {

  const projectItems = document.querySelectorAll(".project-item");
  const projectContents = document.querySelectorAll(".project-content");

  projectItems.forEach(item => {
    item.addEventListener("click", function () {

      const targetProject = this.getAttribute("data-project");

      // Remove active state from all nav items
      projectItems.forEach(i => i.classList.remove("active"));

      // Hide all project panels
      projectContents.forEach(content => {
        content.classList.remove("active");
      });

      // Activate selected nav item
      this.classList.add("active");

      // Show selected project panel
      const activePanel = document.getElementById(targetProject);
      if (activePanel) {
        activePanel.classList.add("active");
      }

    });
  });

});

/* =========================
   PROJECT SIDEBAR SWITCH
========================= */

/* =========================
   PROJECT SIDEBAR SWITCH
========================= */

/* =========================
   PROJECT SIDEBAR SWITCH
========================= */

/* =========================
   PROJECT SIDEBAR SWITCH
========================= */

const tabs = document.querySelectorAll(".project-tab");
const panels = document.querySelectorAll(".project-panel");
const projectMain = document.querySelector(".projects-main");

let currentIndex = 0;
let autoSwitchTimer = null;
const AUTO_DELAY = 4000;


// activate project
function activateProject(index) {

  tabs.forEach(t => t.classList.remove("active"));
  panels.forEach(p => p.classList.remove("active"));

  tabs[index].classList.add("active");

  const target = tabs[index].dataset.project;
  document.getElementById(target).classList.add("active");

  currentIndex = index;
}


// next project
function nextProject() {

  let nextIndex = (currentIndex + 1) % tabs.length;
  activateProject(nextIndex);

}


// start auto switching
function startAutoSwitch() {

  stopAutoSwitch();

  autoSwitchTimer = setInterval(() => {
    nextProject();
  }, AUTO_DELAY);

}


// stop auto switching
function stopAutoSwitch() {

  if (autoSwitchTimer) {
    clearInterval(autoSwitchTimer);
    autoSwitchTimer = null;
  }

}


// manual clicking
tabs.forEach((tab, index) => {

  tab.addEventListener("click", () => {

    activateProject(index);
    startAutoSwitch();

  });

});


// pause when hovering on project main
projectMain.addEventListener("mouseenter", () => {
  stopAutoSwitch();
});


// instantly change when mouse leaves
projectMain.addEventListener("mouseleave", () => {

  nextProject();      // instant change
  startAutoSwitch();  // then continue normal cycle

});


// start automatic sliding
startAutoSwitch();

/* =========================
   PROJECT IMAGE SLIDERS
========================= */

document.querySelectorAll(".project-slider").forEach(slider => {

  const slides = slider.querySelector(".slides");
  const slideItems = slider.querySelectorAll(".slide");
  const prev = slider.querySelector(".prev");
  const next = slider.querySelector(".next");

  let index = 0;

  function updateSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  next.addEventListener("click", () => {
    index = (index + 1) % slideItems.length;
    updateSlide();
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + slideItems.length) % slideItems.length;
    updateSlide();
  });

});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* =========================
   SERVICES SLIDER
========================= */

/* =========================
   WORKING CENTER INFINITE SLIDER
========================= */

document.addEventListener("DOMContentLoaded", function () {

  const slider = document.querySelector(".services-slider");
  const container = document.querySelector(".services-slider-container");
  const prevBtn = document.querySelector(".slider-btn.left");
  const nextBtn = document.querySelector(".slider-btn.right");

  if (!slider) return;

  let cards = Array.from(slider.children);

  // Clone ONLY once
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);

  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slider.firstChild);

  cards = Array.from(slider.children);

  let index = 1;
  let isTransitioning = false;

  function updateSlider(animate = true) {

    const cardWidth = cards[index].offsetWidth;
    const gap = parseInt(getComputedStyle(slider).gap) || 50;
    const containerWidth = container.offsetWidth;

    const offset =
      (index * (cardWidth + gap)) -
      (containerWidth / 2) +
      (cardWidth / 2);

    slider.style.transition = animate ? "transform 0.6s ease" : "none";
    slider.style.transform = `translateX(-${offset}px)`;

    cards.forEach(card => card.classList.remove("active"));
    cards[index].classList.add("active");
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    index++;
    updateSlider();
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    index--;
    updateSlider();
  }

  slider.addEventListener("transitionend", () => {

    if (index === cards.length - 1) {
      slider.style.transition = "none";
      index = 1;
      updateSlider(false);
    }

    if (index === 0) {
      slider.style.transition = "none";
      index = cards.length - 2;
      updateSlider(false);
    }

    isTransitioning = false;
  });

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Controlled auto slide
  let autoSlide = setInterval(nextSlide, 4000);

  slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slider.addEventListener("mouseleave", () => {
    autoSlide = setInterval(nextSlide, 4000);
  });

  window.addEventListener("resize", () => updateSlider(false));

  updateSlider(false);
});

/* =========================
    Process Section - Scroll Animations
========================= */

// ===========================
// PROCESS SCROLL ANIMATION (STAGGERED)
// ===========================

const processSteps = document.querySelectorAll(".process-step");

function revealProcess() {
  processSteps.forEach((step, index) => {
    const stepTop = step.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.85;

    if (stepTop < triggerPoint && !step.classList.contains("active")) {
      setTimeout(() => {
        step.classList.add("active");
      }, index * 250); // 250ms delay between each step
    }
  });
}

window.addEventListener("scroll", revealProcess);
window.addEventListener("load", revealProcess);

// ===========================
// TRUST SECTION ANIMATION
// ===========================

const trustItems = document.querySelectorAll(".trust-list li");

function revealTrust() {
  trustItems.forEach((item, index) => {
    const itemTop = item.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.9;

    if (itemTop < triggerPoint && !item.classList.contains("active")) {
      setTimeout(() => {
        item.classList.add("active");
      }, index * 200);
    }
  });
}

window.addEventListener("scroll", revealTrust);
window.addEventListener("load", revealTrust);

// ===========================
// PRICING FADE IN
// ===========================

const pricingSection = document.querySelector(".pricing-container");

function revealPricing() {
  const top = pricingSection.getBoundingClientRect().top;
  const trigger = window.innerHeight * 0.85;

  if (top < trigger) {
    pricingSection.style.opacity = "1";
    pricingSection.style.transform = "translateY(0)";
  }
}

pricingSection.style.opacity = "0";
pricingSection.style.transform = "translateY(40px)";
pricingSection.style.transition = "all 1s ease";

window.addEventListener("scroll", revealPricing);
window.addEventListener("load", revealPricing);

// ===========================
// SNAPSHOT SECTION ANIMATION
// ===========================

const snapshotCards = document.querySelectorAll(".snapshot-card");

function revealSnapshot() {
  snapshotCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.85;

    if (cardTop < triggerPoint) {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 200);
    }
  });
}

window.addEventListener("scroll", revealSnapshot);
window.addEventListener("load", revealSnapshot);

// ===========================
// CONTACT REVEAL
// ===========================

const contactSection = document.querySelector(".contact-container");

function revealContact() {
  const top = contactSection.getBoundingClientRect().top;
  const trigger = window.innerHeight * 0.85;

  if (top < trigger) {
    contactSection.style.opacity = "1";
    contactSection.style.transform = "translateY(0)";
  }
}

contactSection.style.opacity = "0";
contactSection.style.transform = "translateY(40px)";
contactSection.style.transition = "all 1s ease";

window.addEventListener("scroll", revealContact);
window.addEventListener("load", revealContact);

// ===========================
// CONTACT FORM VALIDATION
// ===========================

/*const form = document.querySelector(".contact-form");
const inputs = form.querySelectorAll("input, textarea");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  inputs.forEach(input => {
    if (input.value.trim() === "") {
      showError(input, "This field is required");
      isValid = false;
    } else {
      clearError(input);
    }

    if (input.type === "email" && !validateEmail(input.value)) {
      showError(input, "Enter a valid email address");
      isValid = false;
    }
  });

  if (isValid) {
    sendToGoogleSheets();
  }
});

function showError(input, message) {
  input.style.borderColor = "#ff4d4d";
  input.nextElementSibling?.remove();

  const error = document.createElement("small");
  error.style.color = "#ff4d4d";
  error.style.display = "block";
  error.style.marginTop = "6px";
  error.innerText = message;

  input.after(error);
}

function clearError(input) {
  input.style.borderColor = "rgba(91, 140, 255, 0.2)";
  if (input.nextElementSibling?.tagName === "SMALL") {
    input.nextElementSibling.remove();
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}*/

//https://script.google.com/macros/s/AKfycbyVaBA2OBsgqecA97o3HMEJNrTrDXemzOlSgi39VkK-FdC7NZ0mgFcpJ624WhTCXQl3rg/exec
// ===========================
// CONTACT FORM - GOOGLE SHEETS INTEGRATION
// ===========================

// ===========================
// CONTACT FORM VALIDATION + GOOGLE SHEETS
// ===========================

/*const form = document.querySelector(".contact-form");
const inputs = form.querySelectorAll("input, textarea");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  inputs.forEach(input => {
    clearError(input);

    if (input.value.trim() === "") {
      showError(input, "This field is required");
      isValid = false;
    }

    if (input.type === "email" && !validateEmail(input.value)) {
      showError(input, "Enter a valid email address");
      isValid = false;
    }
  });

  if (isValid) {
    sendToGoogleSheets();
  }
});

// ===========================
// ERROR HANDLING
// ===========================

function showError(input, message) {
  input.style.borderColor = "#ff4d4d";

  const error = document.createElement("small");
  error.style.color = "#ff4d4d";
  error.style.display = "block";
  error.style.marginTop = "6px";
  error.innerText = message;

  input.after(error);
}

function clearError(input) {
  input.style.borderColor = "rgba(91, 140, 255, 0.2)";
  const next = input.nextElementSibling;
  if (next && next.tagName === "SMALL") {
    next.remove();
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===========================
// SEND TO GOOGLE SHEETS
// ===========================

function sendToGoogleSheets() {

  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const message = form.querySelector('textarea').value;

  fetch("https://script.google.com/macros/s/AKfycbyVaBA2OBsgqecA97o3HMEJNrTrDXemzOlSgi39VkK-FdC7NZ0mgFcpJ624WhTCXQl3rg/exec", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      message: message
    })
  })
  .then(res => res.json())
  .then(data => {

    // PREMIUM SUCCESS UI (instead of alert)
    form.innerHTML = `
      <div style="
        text-align:center;
        padding:60px 20px;
        color:#5B8CFF;
        font-size:20px;
        line-height:1.6;
      ">
        Message received.<br>
        I’ll get back to you soon.
      </div>
    `;

  })
  .catch(err => {
    form.innerHTML = `
      <div style="
        text-align:center;
        padding:60px 20px;
        color:#ff4d4d;
        font-size:18px;
      ">
        Something went wrong.<br>
        Please try again later.
      </div>
    `;
  });
}*/

document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector(".contact-form");

  if (!form) {
    console.error("Form not found. Check .contact-form class.");
    return;
  }

  const inputs = form.querySelectorAll("input, textarea");
  const submitBtn = form.querySelector(".form-btn");

  // ===========================
  // ADD HONEYPOT
  // ===========================

  const honeypot = document.createElement("input");
  honeypot.type = "text";
  honeypot.name = "company";
  honeypot.style.display = "none";
  form.appendChild(honeypot);

  const RATE_LIMIT_TIME = 30000;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const lastSubmission = localStorage.getItem("lastSubmissionTime");
    const now = Date.now();

    if (lastSubmission && now - lastSubmission < RATE_LIMIT_TIME) {
      showTemporaryMessage("Please wait before sending another message.", false);
      return;
    }

    if (honeypot.value !== "") return;

    let isValid = true;

    inputs.forEach(input => {
      clearError(input);

      if (input.value.trim() === "") {
        showError(input, "This field is required");
        isValid = false;
      }

      if (input.type === "email" && !validateEmail(input.value)) {
        showError(input, "Enter a valid email address");
        isValid = false;
      }
    });

    if (isValid) {
      sendToGoogleSheets();
    }
  });

  function showError(input, message) {
    input.style.borderColor = "#ff4d4d";

    const error = document.createElement("small");
    error.style.color = "#ff4d4d";
    error.style.display = "block";
    error.style.marginTop = "6px";
    error.innerText = message;

    input.after(error);
  }

  function clearError(input) {
    input.style.borderColor = "rgba(91, 140, 255, 0.2)";
    const next = input.nextElementSibling;
    if (next && next.tagName === "SMALL") next.remove();
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function sendToGoogleSheets() {

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    fetch("https://script.google.com/macros/s/AKfycbwA3-ReYi6IIIR68JFODgAzuk9NZhJFBy90IzrouPHHZhJTNNNsQnsWcgWRWXQmKiguxw/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        message
      })
    })
    .then(res => res.text())
    .then(result => {

      localStorage.setItem("lastSubmissionTime", Date.now());

      form.innerHTML = `
        <div style="
          text-align:center;
          padding:60px 20px;
          color:#5B8CFF;
          font-size:22px;
        ">
          Message received.<br>
          I’ll get back to you soon.
        </div>
      `;
    })
    .catch(error => {
      console.error(error);
      showTemporaryMessage("Connection failed. Check deployment.", false);
      submitBtn.disabled = false;
      submitBtn.innerText = "Send Message →";
    });
  }

  function showTemporaryMessage(message, success = true) {
    const msg = document.createElement("div");
    msg.style.marginTop = "20px";
    msg.style.fontSize = "16px";
    msg.style.color = success ? "#5B8CFF" : "#ff4d4d";
    msg.innerText = message;

    form.appendChild(msg);

    setTimeout(() => msg.remove(), 4000);
  }

});

const startBtn = document.getElementById("startProjectBtn");

if (startBtn) {
  startBtn.addEventListener("click", function () {

    if (typeof gtag === "function") {
      gtag("event", "start_project_click", {
        event_category: "CTA",
        event_label: "Contact Section",
      });
    }

  });
}
/* =========================
   FOOTER SCROLL ANIMATION
========================= */
const footer = document.querySelector(".footer");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.9;
  const footerTop = footer.getBoundingClientRect().top;

  if (footerTop < trigger) {
    footer.style.opacity = "1";
    footer.style.transform = "translateY(0)";
  }
});


