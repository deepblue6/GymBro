///////////

document.getElementById("home").addEventListener("click", function () {
  showSection("home-section");
});

document.getElementById("workouts").addEventListener("click", function () {
  showSection("workouts-section");
});

document.getElementById("about").addEventListener("click", function () {
  fetchExercises();
});

function showSection(sectionId) {
  let sections = document.getElementsByTagName("section");
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }
  document.getElementById(sectionId).style.display = "block";
}

function fetchExercises() {
  const apiKey = "4h4Y+M6Ozow9Y1GnLh1PSg==EKiD6WFfoMqPmwtT";
  const muscle = "biceps"; // Specify the muscle group you want to target
  const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

  fetch(apiUrl, {
    headers: {
      "X-Api-Key": apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Output the list of exercises to console
      displayExercises(data.results);
    })
    .catch((error) => console.error("Error fetching exercises:", error));
}

function displayExercises(exercises) {
  const aboutSection = document.getElementById("about-section");
  aboutSection.innerHTML = ""; // Clear previous content

  if (!exercises || exercises.length === 0) {
    // If no exercises found, display a message
    const noExerciseMessage = document.createElement("p");
    noExerciseMessage.textContent = "No exercises found.";
    aboutSection.appendChild(noExerciseMessage);
  } else {
    // Display the exercises
    const exerciseList = document.createElement("ul");
    exercises.forEach((exercise) => {
      const exerciseName = exercise.name;
      const exerciseElement = document.createElement("li");
      exerciseElement.textContent = exerciseName;
      exerciseList.appendChild(exerciseElement);
    });
    aboutSection.appendChild(exerciseList);
  }

  showSection("about-section");
}

// 4h4Y+M6Ozow9Y1GnLh1PSg==EKiD6WFfoMqPmwtT
