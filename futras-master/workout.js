"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const level = urlParams.get("level");

  const apiKey = "4h4Y+M6Ozow9Y1GnLh1PSg==EKiD6WFfoMqPmwtT"; // Replace with your actual API key
  const workoutData = {
    beginner: [
      { name: "Push-ups", sets: 3, reps: 10 },
      { name: "Squats", sets: 3, reps: 15 },
      { name: "Lunges", sets: 3, reps: 10 },
    ],
    intermediate: [
      { name: "Muscle-ups", sets: 3, reps: 5 },
      { name: "Handstand Push-ups", sets: 3, reps: 8 },
      { name: "Pistol Squats", sets: 3, reps: 10 },
    ],
    advanced: [
      { name: "Planche Push-ups", sets: 3, reps: 5 },
      { name: "One-arm Pull-ups", sets: 3, reps: 5 },
      { name: "Front Lever Raises", sets: 3, reps: 8 },
    ],
  };

  const workoutDetails = document.getElementById("workout-details");
  workoutDetails.innerHTML = workoutData[level]
    .map(
      (exercise) => `
      <div class="exercise">
        <h3>${exercise.name}</h3>
        <p>Sets: ${exercise.sets}</p>
        <p>Reps: ${exercise.reps}</p>
        <p class="description">Loading description...</p>
      </div>
    `
    )
    .join("");

  const exerciseNames = workoutData[level].map((ex) => ex.name.toLowerCase());

  exerciseNames.forEach((exerciseName, index) => {
    fetch(`https://api.api-ninjas.com/v1/exercises?name=${exerciseName}`, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const description = data[0]
          ? data[0].description
          : "No description available.";
        document.querySelectorAll(".description")[index].textContent =
          description;
      })
      .catch((error) => {
        document.querySelectorAll(".description")[index].textContent =
          "Error fetching description.";
        console.error("Error fetching data:", error);
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Function to redirect to the corresponding workout level page
  const redirectToLevel = (level) => {
    window.location.href = `${level}.html`;
  };

  // Event listeners for each level button
  document.getElementById("beginner-button").addEventListener("click", () => {
    redirectToLevel("beginner");
  });

  document
    .getElementById("intermediate-button")
    .addEventListener("click", () => {
      redirectToLevel("intermediate");
    });

  document.getElementById("advanced-button").addEventListener("click", () => {
    redirectToLevel("advanced");
  });

  document.getElementById("custom-button").addEventListener("click", () => {
    redirectToLevel("custom");
  });
});
