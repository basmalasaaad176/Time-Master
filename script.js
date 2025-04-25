document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const timerInput = document.getElementById('timerInput');
  const timerDisplay = document.getElementById('timerDisplay');
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  
  // Timer variables
  let countdownInterval;
  let totalSeconds = 0;
  let isRunning = false;
  let remainingSeconds = 0;
  
  // Format time as MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Parse input time in MM:SS format
  function parseTime(timeString) {
    const [minutes, seconds] = timeString.split(':').map(part => parseInt(part, 10));
    if (isNaN(minutes) || isNaN(seconds)) {
      return 0;
    }
    return (minutes * 60) + seconds;
  }
  
  // Update the timer display
  function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingSeconds);
    
    // Change color to red when less than 10 seconds remaining
    if (remainingSeconds < 10) {
      timerDisplay.classList.add('warning');
    } else {
      timerDisplay.classList.remove('warning');
    }
  }
  
  // Start the countdown timer
  function startTimer() {
    if (!isRunning) {
      // If timer not yet set, get time from input
      if (remainingSeconds === 0) {
        const inputTime = timerInput.value;
        if (!inputTime) {
          alert('Please enter a valid time in MM:SS format');
          return;
        }
        
        remainingSeconds = parseTime(inputTime);
        if (remainingSeconds <= 0) {
          alert('Please enter a valid time greater than zero');
          return;
        }
      }
      
      isRunning = true;
      startBtn.disabled = true;
      timerInput.disabled = true;
      
      countdownInterval = setInterval(() => {
        remainingSeconds--;
        updateDisplay();
        
        if (remainingSeconds <= 0) {
          clearInterval(countdownInterval);
          isRunning = false;
          startBtn.disabled = false;
          timerInput.disabled = false;
          alert('Time is up!');
          remainingSeconds = 0;
        }
      }, 1000);
    }
  }
  
  // Pause the timer
  function pauseTimer() {
    if (isRunning) {
      clearInterval(countdownInterval);
      isRunning = false;
      startBtn.disabled = false;
    }
  }
  
  // Reset the timer
  function resetTimer() {
    clearInterval(countdownInterval);
    isRunning = false;
    remainingSeconds = 0;
    timerDisplay.textContent = '00:00';
    timerDisplay.classList.remove('warning');
    startBtn.disabled = false;
    timerInput.disabled = false;
    timerInput.value = '';
  }
  
  // Event listeners
  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);
  
  // Format the input as MM:SS while typing
  timerInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^\d]/g, '');
    
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
    
    if (value.length > 2) {
      const minutes = value.substring(0, value.length - 2);
      const seconds = value.substring(value.length - 2);
      value = `${minutes}:${seconds}`;
    }
    
    e.target.value = value;
  });
});