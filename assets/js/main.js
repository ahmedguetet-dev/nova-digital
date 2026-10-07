"use strict";

/* Theme toggle (initial theme is set inline in <head> to avoid a flash) */
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
  const sync = () => themeBtn.setAttribute("aria-pressed", root.dataset.bsTheme === "dark");
  sync();
  themeBtn.addEventListener("click", () => {
    const next = root.dataset.bsTheme === "dark" ? "light" : "dark";
    root.dataset.bsTheme = next;
    try { localStorage.setItem("nd-theme", next); } catch (e) { /* storage unavailable */ }
    sync();
  });
}

/* Reveal on scroll */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

/* Project filter */
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach((btn) => btn.addEventListener("click", () => {
  filterBtns.forEach((b) => b.setAttribute("aria-pressed", b === btn));
  const cat = btn.dataset.filter;
  document.querySelectorAll("[data-category]").forEach((item) => {
    item.hidden = cat !== "all" && item.dataset.category !== cat;
  });
}));

/* Contact form validation */
const form = document.getElementById("contactForm");
if (form) {
  const status = document.getElementById("formStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";
    status.className = "mt-3";
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      form.querySelector(":invalid").focus();
      return;
    }
    // Demo only: connect this to your backend, Formspree or Netlify Forms.
    form.reset();
    form.classList.remove("was-validated");
    status.textContent = "Thanks, your message is on its way. We reply within one business day.";
    status.classList.add("text-success", "fw-semibold");
  });
}

/* Footer year */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
/* Screenshot mode */
if (new URLSearchParams(window.location.search).has("screenshot")) {
  document.documentElement.classList.add("screenshot-mode");
}