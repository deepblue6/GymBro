document.addEventListener("DOMContentLoaded", () => {
  let timer;
  let time = 0;
  const display = document.getElementById("timerDisplay");
  const startButton = document.getElementById("startButton");
  const pauseButton = document.getElementById("pauseButton");
  const resetButton = document.getElementById("resetButton");

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }

  function updateDisplay() {
    display.textContent = formatTime(time);
  }

  function startTimer() {
    if (!timer) {
      timer = setInterval(() => {
        time++;
        updateDisplay();
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timer);
    timer = null;
  }

  function resetTimer() {
    clearInterval(timer);
    timer = null;
    time = 0;
    updateDisplay();
  }

  startButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);
  resetButton.addEventListener("click", resetTimer);

  updateDisplay();
});
