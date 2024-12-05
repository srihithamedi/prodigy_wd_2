let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapList = document.getElementById('lap-list');

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(() => {
      milliseconds += 10;
      if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      updateDisplay();
    }, 10);
  }
}

function pauseStopwatch() {
  clearInterval(interval);
  isRunning = false;
}

function resetStopwatch() {
  clearInterval(interval);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  isRunning = false;
  updateDisplay();
  lapList.innerHTML = '';
}

function recordLap() {
  const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(
    Math.floor(milliseconds / 10)
  )}`;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapList.appendChild(lapItem);
}

function updateDisplay() {
  minutesDisplay.textContent = formatTime(minutes);
  secondsDisplay.textContent = formatTime(seconds);
  millisecondsDisplay.textContent = formatTime(Math.floor(milliseconds / 10));
}

function formatTime(unit) {
  return unit < 10 ? `0${unit}` : unit;
}

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);
