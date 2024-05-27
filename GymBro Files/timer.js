document.addEventListener("DOMContentLoaded", () => {
  let timer;
  let time = 0;
  const display = document.getElementById("timerDisplay");
  const timeInput = document.getElementById("timeInput");
  const setButton = document.getElementById("setButton");
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
    if (time > 0 && !timer) {
      timer = setInterval(() => {
        if (time > 0) {
          time--;
          updateDisplay();
        } else {
          clearInterval(timer);
          timer = null;
        }
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

  function setTimer() {
    const inputTime = parseInt(timeInput.value, 10);
    if (!isNaN(inputTime) && inputTime > 0) {
      time = inputTime;
      updateDisplay();
    }
  }

  setButton.addEventListener("click", setTimer);
  startButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);
  resetButton.addEventListener("click", resetTimer);

  updateDisplay();
});
