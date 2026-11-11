/* PRO PHYSIQUE FITNESS CLUB — mobile menu, scroll-spy, reveal, lightbox */
(function () {
  "use strict";

  /* ---- mobile menu ---- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");
  if (toggle && menu) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open) {
        menu.removeAttribute("hidden");
      } else {
        menu.setAttribute("hidden", "");
      }
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ---- scroll-spy ---- */
  var navLinks = document.querySelectorAll(".main-nav a");
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.charAt(0) === "#") {
      var el = document.querySelector(id);
      if (el) sections.push({ link: link, el: el });
    }
  });
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          sections.forEach(function (s) {
            s.link.classList.toggle("active", s.el === entry.target);
          });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(function (s) { spy.observe(s.el); });
  }

  /* ---- reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---- lightbox ---- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector(".lightbox-img") : null;
  var lightboxCaption = lightbox ? lightbox.querySelector(".lightbox-caption") : null;
  var closeBtn = lightbox ? lightbox.querySelector(".lightbox-close") : null;
  var lastFocus = null;

  function openLightbox(src, alt) {
    lastFocus = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    if (lightboxCaption) lightboxCaption.textContent = alt || "";
    lightbox.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }
  function closeLightbox() {
    lightbox.setAttribute("hidden", "");
    lightboxImg.removeAttribute("src");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.querySelectorAll(".gallery-item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openLightbox(btn.getAttribute("data-full"), btn.getAttribute("data-alt"));
    });
  });
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox && !lightbox.hasAttribute("hidden")) {
      closeLightbox();
    }
  });
})();
