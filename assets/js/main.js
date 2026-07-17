(function () {
  "use strict";

  // Sticky header shadow
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active nav link based on current page
  var current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a[data-page]").forEach(function (link) {
    if (link.getAttribute("data-page") === current) {
      link.classList.add("active");
    }
  });

  // Scroll reveal (progressive enhancement: .js-anim only gets added here,
  // so if this script fails to run, .reveal content stays visible via CSS)
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    document.documentElement.classList.add("js-anim");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
    // Safety net: some browsers throttle IntersectionObserver callbacks in
    // background/inactive tabs. Never let content stay hidden indefinitely.
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add("in-view"); });
    }, 1500);
  }

  // FAQ accordions
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    if (!btn || !panel) return;
    btn.addEventListener("click", function () {
      var isOpen = item.getAttribute("data-open") === "true";
      document.querySelectorAll(".faq-item").forEach(function (other) {
        other.setAttribute("data-open", "false");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.setAttribute("data-open", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // Demo contact form (client-side only, no backend)
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = document.getElementById("formSuccess");
      if (success) success.classList.add("show");
      contactForm.reset();
      if (success) success.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
