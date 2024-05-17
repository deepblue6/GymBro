"use strict";

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navLinks, "click", closeNavbar);

/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const reveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Get modal and close button
  const modal = document.getElementById("workout-modal");
  const closeModal = document.getElementById("close-modal");

  // Event listener for close button
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Event listener for showing workout on course click
  const showWorkoutButtons = document.querySelectorAll(".show-workout");

  showWorkoutButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const courseType = this.getAttribute("data-course");
      let workoutExercises = "";

      // Populate workout exercises based on course type
      switch (courseType) {
        case "beginner":
          workoutExercises = "Push-ups, Squats, Lunges, Planks";
          break;
        case "intermediate":
          workoutExercises =
            "Muscle-ups, Handstand Push-ups, Pistol Squats, L-sits";
          break;
        case "advanced":
          workoutExercises =
            "Front Lever, Planche, One-arm Pull-ups, Handstand Walks";
          break;
        default:
          workoutExercises = "No exercises found";
      }

      // Update modal content with workout exercises
      const workoutExercisesContainer =
        document.getElementById("workout-exercises");
      workoutExercisesContainer.textContent = workoutExercises;

      // Show modal
      modal.style.display = "block";
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
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
      const modal = document.getElementById("workout-modal");
      const workoutExercises = document.getElementById("workout-exercises");

      workoutExercises.innerHTML = workoutData[course]
        .map((exercise) => `<p>${exercise}</p>`)
        .join("");
      modal.style.display = "block";
    });
  });

  document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("workout-modal").style.display = "none";
  });

  window.addEventListener("click", (event) => {
    const modal = document.getElementById("workout-modal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});

reveal();
addEventOnElem(window, "scroll", reveal);
