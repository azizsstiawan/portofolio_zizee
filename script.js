/* =========================================================
   🚀 PORTFOLIO JAVASCRIPT
   ========================================================= */

/* =========================================================
   📌 DOM SELECTOR
   ========================================================= */

const DOM = {
  typingText: document.getElementById("typingText"),

  card: document.getElementById("card"),
  cardLight: document.getElementById("cardLight"),

  sections: document.querySelectorAll("section"),
  navLinks: document.querySelectorAll(".nav-link"),

  reveals: document.querySelectorAll(".reveal"),
  staggerItems: document.querySelectorAll(".stagger-item"),

  projectCards: document.querySelectorAll(".project-card"),

  progressBar: document.getElementById("progressBar"),
};

/* =========================================================
   ✨ TYPING EFFECT
   ========================================================= */

const texts = [
  "I build modern and responsive websites 🚀",
  "I love clean UI and smooth user experience ✨",
  "Turning ideas into real digital products 💡",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!DOM.typingText) return;

  const currentText = texts[textIndex];

  // ✍️ TYPING
  if (!isDeleting) {
    DOM.typingText.innerHTML = currentText.substring(0, charIndex + 1);

    charIndex++;

    // selesai mengetik
    if (charIndex === currentText.length) {
      isDeleting = true;

      setTimeout(typeEffect, 1500);
      return;
    }
  }

  // ⌫ DELETING
  else {
    DOM.typingText.innerHTML = currentText.substring(0, charIndex - 1);

    charIndex--;

    // pindah text berikutnya
    if (charIndex === 0) {
      isDeleting = false;

      textIndex = (textIndex + 1) % texts.length;
    }
  }

  // ⏱️ SPEED
  const speed = isDeleting ? 30 : Math.random() * 50 + 50;

  setTimeout(typeEffect, speed);
}

// ▶️ START
typeEffect();

/* =========================================================
   🧊 REUSABLE 3D TILT EFFECT
   ========================================================= */

function tiltEffect(element, intensity = 20) {
  if (!element) return;

  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / intensity;
    const rotateY = (x - centerX) / intensity;

    element.style.transition = "none";

    requestAnimationFrame(() => {
      element.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });
  });

  element.addEventListener("mouseleave", () => {
    element.style.transition = "transform 0.4s ease";

    element.style.transform = `
      rotateX(0deg)
      rotateY(0deg)
    `;
  });
}

/* =========================================================
   ✨ HERO CARD LIGHT EFFECT
   ========================================================= */

if (DOM.card && DOM.cardLight) {
  DOM.card.addEventListener("mousemove", (e) => {
    const rect = DOM.card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    DOM.cardLight.style.left = x - 90 + "px";
    DOM.cardLight.style.top = y - 90 + "px";
  });

  DOM.card.addEventListener("mouseenter", () => {
    DOM.cardLight.style.opacity = "1";
  });

  DOM.card.addEventListener("mouseleave", () => {
    DOM.cardLight.style.opacity = "0";
  });

  // 🧊 APPLY TILT
  tiltEffect(DOM.card, 15);
}

/* =========================================================
   🎯 PROJECT CARD TILT
   ========================================================= */

DOM.projectCards.forEach((card) => {
  tiltEffect(card, 25);
});

/* =========================================================
   🔥 INTERSECTION OBSERVER
   ========================================================= */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // =========================
      // ✨ MASUK VIEWPORT
      // =========================
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        entry.target.classList.add("show");
      }

      // =========================
      // ❌ KELUAR VIEWPORT
      // =========================
      else {
        entry.target.classList.remove("active");
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

/* =========================================================
   👀 OBSERVE REVEAL ELEMENT
   ========================================================= */

DOM.reveals.forEach((item) => {
  observer.observe(item);
});

/* =========================================================
   👀 OBSERVE STAGGER ITEM
   ========================================================= */

DOM.staggerItems.forEach((item) => {
  observer.observe(item);
});

/* =========================================================
   🔥 NAVBAR ACTIVE LINK
   ========================================================= */

function activeNavbar() {
  let currentSection = "";

  DOM.sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });

  DOM.navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

/* =========================================================
   📊 SCROLL PROGRESS BAR
   ========================================================= */

function scrollProgress() {
  if (!DOM.progressBar) return;

  const scrollTop = window.scrollY;

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  const progress = (scrollTop / docHeight) * 100;

  DOM.progressBar.style.width = progress + "%";
}

/* =========================================================
   🌊 SMOOTH SCROLL EVENT
   ========================================================= */

window.addEventListener("scroll", () => {
  activeNavbar();
  scrollProgress();
});

/* =========================================================
   📱 MOBILE PERFORMANCE OPTIMIZATION
   ========================================================= */

const isMobile = window.innerWidth < 768;

if (isMobile) {
  DOM.projectCards.forEach((card) => {
    card.style.transform = "none";
  });
}

/* =========================================================
   🎨 LUCIDE ICON
========================================================= */

window.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

/* =========================================================
   😎 CONSOLE EASTER EGG
   ========================================================= */

console.log(
  "%c👋 Welcome Developer!",
  `
    color: #3b82f6;
    font-size: 20px;
    font-weight: bold;
  `,
);

console.log(
  "%cBuilt with HTML, Tailwind CSS & Vanilla JavaScript 🚀",
  `
    color: #a855f7;
    font-size: 14px;
  `,
);

/* =========================================================
   📱 MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");

const mobileMenu = document.getElementById("mobileMenu");

const closeMenu = document.getElementById("closeMenu");

const mobileLinks = document.querySelectorAll(".mobile-link");

// OPEN MENU
menuBtn.addEventListener("click", () => {
  mobileMenu.style.right = "0";
});

// CLOSE MENU
closeMenu.addEventListener("click", () => {
  mobileMenu.style.right = "-100%";
});

// CLOSE SAAT KLIK LINK
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.style.right = "-100%";
  });
});

/* =========================================================
   ✨ PROJECT MODAL
========================================================= */

const modal = document.getElementById("projectModal");

const modalContent = document.getElementById("modalContent");

const closeModal = document.getElementById("closeModal");

const openModalButtons = document.querySelectorAll(".openModal");

const modalTitle = document.getElementById("modalTitle");

const modalDescription = document.getElementById("modalDescription");

const modalImage = document.getElementById("modalImage");

const modalStack = document.getElementById("modalStack");

const modalFeatures = document.getElementById("modalFeatures");

const modalLive = document.getElementById("modalLive");

const modalGithub = document.getElementById("modalGithub");

/* =========================
   📦 PROJECT DATA
========================= */

const projects = {
  ticket: {
    title: "Ticket Booking Website",

    description:
      "Modern responsive ticket booking platform with elegant UI and smooth booking experience.",

    image: "assets/project2.jpg",

    stack: ["Vue.js", "Express.js", "MySQL", "Tailwind CSS"],

    features: [
      "Responsive Design",
      "Authentication System",
      "Booking Management",
      "Modern Dashboard UI",
    ],

    live: "#",

    github: "#",
  },

  finance: {
    title: "Finance Tracker App",

    description:
      "Mobile finance tracking application with analytics dashboard and transaction management.",

    image: "assets/project3.jpg",

    stack: ["Flutter", "Firebase", "Dart"],

    features: [
      "Expense Analytics",
      "Category Management",
      "Modern Mobile UI",
      "Realtime Database",
    ],

    live: "#",

    github: "#",
  },

  portfolio: {
    title: "Portfolio Website",

    description:
      "Modern animated portfolio website with smooth interaction and futuristic design.",

    image: "assets/project4.jpg",

    stack: ["HTML", "Tailwind CSS", "JavaScript"],

    features: [
      "3D Card Effect",
      "Scroll Animation",
      "Responsive Design",
      "Modern UI/UX",
    ],

    live: "#",

    github: "#",
  },
};

/* =========================
   🚀 OPEN MODAL
========================= */

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];

    // TITLE
    modalTitle.textContent = project.title;

    // DESCRIPTION
    modalDescription.textContent = project.description;

    // IMAGE
    modalImage.src = project.image;

    // STACK
    modalStack.innerHTML = "";

    project.stack.forEach((tech) => {
      modalStack.innerHTML += `
        <span class="project-badge">
          ${tech}
        </span>
      `;
    });

    // FEATURES
    modalFeatures.innerHTML = "";

    project.features.forEach((feature) => {
      modalFeatures.innerHTML += `
        <li>
          ✅ ${feature}
        </li>
      `;
    });

    // LINKS
    modalLive.href = project.live;

    modalGithub.href = project.github;

    // OPEN MODAL
    modal.classList.remove("opacity-0", "pointer-events-none");

    modalContent.classList.remove("scale-90");

    modalContent.classList.add("scale-100");

    // DISABLE SCROLL
    document.body.style.overflow = "hidden";
  });
});

/* =========================
   ❌ CLOSE MODAL
========================= */

function closeProjectModal() {
  modal.classList.add("opacity-0", "pointer-events-none");

  modalContent.classList.remove("scale-100");

  modalContent.classList.add("scale-90");

  // ENABLE SCROLL
  document.body.style.overflow = "auto";
}

// BUTTON CLOSE
closeModal.addEventListener("click", closeProjectModal);

// CLICK OUTSIDE
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeProjectModal();
  }
});

// ESC KEY
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectModal();
  }
});
