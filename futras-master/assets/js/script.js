"use strict";

/**
 * Utility function to add an event listener to elements
 */
const addEventOnElem = (elems, type, callback) => {
  elems.forEach((elem) => elem.addEventListener(type, callback));
};

/**
 * Navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

const closeNavbar = () => {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);
addEventOnElem(navLinks, "click", closeNavbar);

/**
 * Header active state on scroll
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  const activeClass = window.scrollY >= 100 ? "add" : "remove";
  header.classList[activeClass]("active");
  backTopBtn.classList[activeClass]("active");
});

/**
 * Scroll reveal effect
 */
const sections = document.querySelectorAll("[data-section]");

const reveal = () => {
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top < window.innerHeight / 2) {
      section.classList.add("active");
    }
  });
};

window.addEventListener("scroll", reveal);

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("workout-modal");
  const closeModal = document.getElementById("close-modal");

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const workoutData = {
    beginner: [
      "Push-ups: 3 sets of 10 reps",
      "Squats: 3 sets of 15 reps",
      "Lunges: 3 sets of 10 reps each leg",
    ],
    intermediate: [
      "Muscle-ups: 3 sets of 5 reps",
      "Handstand Push-ups: 3 sets of 8 reps",
      "Pistol Squats: 3 sets of 10 reps each leg",
    ],
    advanced: [
      "Planche Push-ups: 3 sets of 5 reps",
      "One-arm Pull-ups: 3 sets of 5 reps each arm",
      "Front Lever Raises: 3 sets of 8 reps",
    ],
  };

  document.querySelectorAll(".show-workout").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const course = event.target.dataset.course;
      const workoutExercises = document.getElementById("workout-exercises");

      workoutExercises.innerHTML = workoutData[course]
        .map((exercise) => `<p>${exercise}</p>`)
        .join("");
      modal.style.display = "block";
    });
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  reveal(); // Initial call to reveal elements on page load
});
