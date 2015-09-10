var interval = undefined;
var timerRunning = false;
var taskTime = true;

function init() {    
  document.getElementById("pomodoro+").addEventListener("click", function() {changeWorkingTime("pomodoro+");});
  document.getElementById("pomodoro-").addEventListener("click", function() {changeWorkingTime("pomodoro-");});
  document.getElementById("break+").addEventListener("click", function() {changeWorkingTime("break+");});
  document.getElementById("break-").addEventListener("click", function() {changeWorkingTime("break-");});
  
  var timenode = document.querySelector("#time");
  timenode.addEventListener("click", function() {changeTimerStatus(timenode);});
}
function changeWorkingTime(changeEvent) {
  var pomTime = undefined;
  var breakTime = undefined;
  switch(changeEvent) {
    case 'pomodoro+': {
        pomTime = document.getElementById("pomodoroTime");
        pomTime.textContent = parseInt(pomTime.textContent) + 1;
    } break;
    case 'pomodoro-': {
        pomTime = document.getElementById("pomodoroTime");
        var decPom = parseInt(pomTime.textContent) - 1; 
        pomTime.textContent = (decPom == 0) ? 1 : decPom;
    } break;
    case 'break+': {
        breakTime = document.getElementById("breakTime");
        breakTime.textContent = parseInt(breakTime.textContent)+ 1;
    } break;
    case 'break-': {
        breakTime = document.getElementById("breakTime");
        var decBreak = parseInt(breakTime.textContent) - 1;
        breakTime.textContent = (decBreak == 0) ? 1 : decBreak;
    } break;
    default:
      alert(changeEvent);
  }
  var timenode = document.querySelector("#time");
  var mins = taskTime ? pomTime.textContent : breakTime.textContent;
  var minsNormalised = mins >= 10 ? mins : "0" + mins;
  timenode.textContent = minsNormalised + ":" + "00" 
  
  // Running twice. First time we stop it, then we started it again.
  if (timerRunning) {
    changeTimerStatus(timenode);
    changeTimerStatus(timenode);
  }
}

function changeTimerStatus(display) {
  
  var duration = computeClockTimeInSeconds(display.textContent);
  if(timerRunning) {
    clearInterval(interval);
    timerRunning = false
  } else {
    var timer = duration;
    var minutes = undefined;
    var seconds = undefined;
  
    interval = setInterval(function() {
      minutes = parseInt(timer / 60);
      seconds = parseInt(timer % 60);
    
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
    
      display.textContent = minutes + ":" + seconds;
      if (--timer < 0) {
        // Emit a loud beeeeeeep!
   
        // Stop the timer
        
        if(taskTime)
          taskTime = false;
        else 
          taskTime = true;
        
        var timenode = document.querySelector("#time");
        var workTime = document.querySelector("#pomodoroTime").textContent;
        var breakTime = document.querySelector("#breakTime").textContent;
        
        timeValue = taskTime ? workTime : breakTime;
        timeValueNorm = (timeValue < 10) ? "0" + timeValue : timeValue;  
        timenode.textContent = timeValueNorm + ":" + "00";
        timer = computeClockTimeInSeconds(timenode.textContent);
        minutes = parseInt(timer / 60);
        seconds = parseInt(timer % 60);
//        alert("2");
//        changeTimerStatus(timenode);
//        alert("3");
//        changeTimerStatus(timenode);
//        alert("timer started again");
      }
      timerRunning = true;
    },1000);
  }
}

function computeClockTimeInSeconds(timeStr) {
  var regExpTime = /(\d{2}):(\d{2})/
  var match = regExpTime.exec(timeStr);
  var minutes = match[1];
  var seconds = match[2];
  return (minutes * 60) + parseInt(seconds);
}