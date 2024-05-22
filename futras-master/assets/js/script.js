"use strict";

const addEventOnElem = (elems, type, callback) => {
  elems.forEach((elem) => elem.addEventListener(type, callback));
};

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

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  const activeClass = window.scrollY >= 100 ? "add" : "remove";
  header.classList[activeClass]("active");
  backTopBtn.classList[activeClass]("active");
});

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

document
  .getElementById("fetch-exercises-button")
  .addEventListener("click", fetchExercises);

function fetchExercises() {
  const muscle = prompt(
    "Enter a muscle group (e.g., chest, back, legs):"
  ).toLowerCase();
  const apiKey = "4h4Y+M6Ozow9Y1GnLh1PSg==EKiD6WFfoMqPmwtT"; // Replace with your actual API key
  const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

  fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      displayExercises(data);
    })
    .catch((error) => {
      console.error("Error fetching exercises:", error);
    });
}

function displayExercises(exercises) {
  const exerciseList = document.getElementById("exercise-list");
  exerciseList.innerHTML = ""; // Clear previous list items

  exercises.forEach((exercise) => {
    const listItem = document.createElement("li");
    listItem.textContent = exercise.name;
    exerciseList.appendChild(listItem);
  });
}
