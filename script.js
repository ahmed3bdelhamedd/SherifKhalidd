document.addEventListener("DOMContentLoaded", () => {
  // 1. Preloader Cinematic Progress
  const preloader = document.getElementById("preloader");
  const loaderBar = document.getElementById("loaderBar");
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 25) + 15;
    if (progress >= 100) {
      progress = 100;
      loaderBar.style.width = "100%";
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add("hidden");
      }, 350);
    } else {
      loaderBar.style.width = progress + "%";
    }
  }, 150);

  // 2. Navbar Scroll Effect & Mobile Menu
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  // 3. Portfolio Filter Tabs
  const filterBtns = document.querySelectorAll(".filter-btn");
  const workCards = document.querySelectorAll(".work-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      workCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 4. Bilingual Language Switcher (AR / EN)
  const langToggle = document.getElementById("langToggle");
  let currentLang = "ar";

  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "ar" ? "en" : "ar";
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    langToggle.textContent = currentLang === "ar" ? "EN" : "عربي";

    // Update texts
    document.querySelectorAll("[data-ar]").forEach((el) => {
      el.textContent = el.getAttribute(`data-${currentLang}`);
    });

    // Update placeholders
    document.querySelectorAll("[data-ar-ph]").forEach((el) => {
      el.placeholder = el.getAttribute(`data-${currentLang}-ph`);
    });
  });

  // 5. Scroll Reveal Animation
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 80) {
        el.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // 6. Booking Form Handler (Client-Side Mailto Fallback for GitHub Pages)
  const bookingForm = document.getElementById("bookingForm");
  const formFeedback = document.getElementById("formFeedback");

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("senderName").value;
    const email = document.getElementById("senderEmail").value;
    const type = document.getElementById("inquiryType").value;
    const msg = document.getElementById("senderMsg").value;

    const subject = encodeURIComponent(`New Inquiry [${type}] from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nType: ${type}\n\nMessage:\n${msg}`);

    formFeedback.textContent =
      currentLang === "ar"
        ? "جاري فتح تطبيق البريد لإرسال طلبك..."
        : "Opening your mail client to send inquiry...";

    window.location.href = `mailto:management@sherifkhalid.com?subject=${subject}&body=${body}`;
    bookingForm.reset();
  });
});
