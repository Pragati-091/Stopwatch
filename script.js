const timerDisplay = document.querySelector('.timer-display');
const startBtn = document.querySelector('.start-btn');
const pauseBtn = document.querySelector('.start-btn');
const lapBtn = document.querySelector('.lap-btn');
const resetBtn = document.querySelector('.reset-btn');
const lapsList = document.querySelector('.laps');

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let lapCount = 0;

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  const hours = Math.floor((elapsedTime / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((elapsedTime / (60 * 1000)) % 60);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const milliseconds = Math.floor(elapsedTime % 1000);
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  timerDisplay.textContent = formattedTime;
}


let BtnOn = false;
startBtn.addEventListener('click', () => {
  BtnOn = !BtnOn;
  if (BtnOn) {
    startTime = Date.now();
    intervalId = setInterval(updateTime, 10);
    isRunning = true;
    startBtn.classList.add('disabled'); // Disable startBtn
    pauseBtn.classList.remove('disabled'); // Enable pauseBtn
    lapBtn.classList.remove('disabled');
  } else {
    clearInterval(intervalId);
    isRunning = false;
    pauseBtn.classList.add('disabled'); // Disable pauseBtn
    startBtn.classList.remove('disabled'); // Enable startBtn
  }
});


function recordLap() {
  if (isRunning) {
    lapCount++;
    const lapTime = elapsedTime;
    const formattedLapTime = `${lapCount}. ${timerDisplay.textContent}`;

    const lapListItem = document.createElement('li');
    lapListItem.classList.add('lap');
    lapListItem.textContent = formattedLapTime;

    lapsList.appendChild(lapListItem);
  }
}

function resetTimer() {
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  lapCount = 0;
  timerDisplay.textContent = '00:00:00.000';
  lapsList.innerHTML = ''; // Clear laps list
  startBtn.classList.remove('disabled'); // Enable startBtn
  pauseBtn.classList.add('disabled'); // Disable pauseBtn
  lapBtn.classList.add('disabled'); // Disable lapBtn
}

lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetTimer);