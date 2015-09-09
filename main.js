function init() {    
    document.getElementById("pomodoro+").addEventListener("click", function() {changeWorkingTime("pomodoro+");});
    document.getElementById("pomodoro-").addEventListener("click", function() {changeWorkingTime("pomodoro-");});
    document.getElementById("break+").addEventListener("click", function() {changeWorkingTime("break+");});
    document.getElementById("break-").addEventListener("click", function() {changeWorkingTime("break-");});
}
function changeWorkingTime(changeEvent) {
  switch(changeEvent) {
    case 'pomodoro+': {
        var pomTime = document.getElementById("pomodoroTime");
        pomTime.textContent = parseInt(pomTime.textContent) + 1;
    } break;
    case 'pomodoro-': {
        var pomTime = document.getElementById("pomodoroTime");
        pomTime.textContent = parseInt(pomTime.textContent) - 1;
    } break;
    case 'break+': {
        var breakTime = document.getElementById("breakTime");
        breakTime.textContent = parseInt(breakTime.textContent)+ 1;
    } break;
    case 'break-': {
        var breakTime = document.getElementById("breakTime");
        breakTime.textContent = parseInt(breakTime.textContent) - 1;
    } break;
    default:
      alert(changeEvent);
  }
}