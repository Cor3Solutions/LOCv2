/**
 * Template Name: iConstruction
 * Template URL: https://bootstrapmade.com/iconstruction-bootstrap-construction-template/
 * Updated: Jul 27 2025 with Bootstrap v5.3.7
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);
})();

const expSwiper = new Swiper(".experiences-swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 24,
  autoplay: {
    delay: 3000, // 3 seconds per slide
    disableOnInteraction: false, // keep autoplaying even after user interacts
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
  },
});

// Navigation active state on scroll and click
const navLinks = document.querySelectorAll("#navmenu a");

navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    // First, remove the 'active' class from all links
    navLinks.forEach((item) => {
      item.classList.remove("active");
    });

    // Then, add the 'active' class to the clicked link
    this.classList.add("active");
  });
});

//email
document
  .getElementById("emailForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const name = this.name.value;
    const fromEmail = this.email.value;
    const subject = this.subject.value;
    const message = this.message.value;

    // Build email body
    const body = `Name: ${name}%0D%0AEmail: ${fromEmail}%0D%0A%0D%0A${message}`;

    // Replace with YOUR email address
    const recipient = "lakeocali@gmail.com";

    // Open email client
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
  });

document.querySelectorAll(".modal").forEach((modalEl) => {
  modalEl.addEventListener("shown.bs.modal", () => {
    history.pushState({ modalId: modalEl.id }, "");
  });

  modalEl.addEventListener("hidden.bs.modal", () => {
    if (history.state?.modalId === modalEl.id) {
      history.back();
    }
  });
});

window.addEventListener("popstate", (event) => {
  if (event.state?.modalId) {
    // Close the modal if open
    const modalEl = document.getElementById(event.state.modalId);
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();
    }
  } else {
    // No modal open
    if (window.scrollY > 50) {
      // Scroll to top instead of exiting
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.pushState({}, ""); // prevent immediate exit
    }
  }
});
