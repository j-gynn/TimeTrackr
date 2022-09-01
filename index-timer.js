var timeElapsed;
var refresh = 500; // How often timeElapsed refreshes
var running = false; // Used to determine if timeElapsed should be calculated
var timeStart; // When the current timing segment was started (since Unix Epoch)
var timePaused = 0; // How much time has elapsed in previous timing segments
var timeIntervals = {
    hours: 0,
    minutes: 0,
    seconds: 0
};
var units = ["hours", "minutes", "seconds"];
var zeros = "0000";
var manualActivity = "";

function btnStart_onClick() {
    timeStart = new Date().getTime();
    document.getElementById("btnStop").disabled = false;
    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnChange").disabled = true;
    running = true;
}
function btnResume_onClick() {
    running = true;
    timeStart = new Date().getTime();
    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnResume").disabled = true;
    document.getElementById("btnStop").disabled = false;
    document.getElementById("btnReset").disabled = true;
    document.getElementById("btnChange").disabled = true;
}
function btnStop_onClick() {
    running = false;
    timePaused += timeElapsed;
    displayTimes(calculateTimes(timeElapsed));
    document.getElementById("btnStart").hidden = true;
    document.getElementById("btnResume").disabled = false;
    document.getElementById("btnResume").hidden = false;
    document.getElementById("btnStop").disabled = true;
    document.getElementById("btnReset").disabled = false;
    document.getElementById("btnChange").disabled = false;

    //if the time recorded was less than one minute, round it up to a minute, 
    //because if a time is trying to be logged, the user clearly wanted it kept
    //and a time of 0 is helpful to nobody
    if ((time = Math.round((timeElapsed / 1000) / 60)) == 0) {
        document.getElementById("saveTime").value = 1;
    } else {
        document.getElementById("saveTime").value = time;
    }
}
function btnReset_onClick() {
    document.getElementById("btnStart").disabled = false;
    document.getElementById("btnStart").hidden = false;
    document.getElementById("btnResume").hidden = true;
    document.getElementById("btnReset").disabled = true;
    document.getElementById("btnChange").disabled = true;
    timeElapsed = 0;
    timePaused = 0;
    displayTimes(calculateTimes(timeElapsed));
}
function btnSubmit_onClick() {

    updateSession("time", "timer");
    updateSession("activity", "timer");
    if (sessionData.Username == ("undefined" || "Select user")) {
        alert("Select a user to save data to!");
    } else {
        pushSessionData();
    }

    updateSession("activity", "manual");

}

function stopwatch() {
    if (running == true) {
        document.getElementById("timerLabel").style.color = "red"; //DEBUG PURPOSES
        var timeNow = new Date().getTime();
        timeElapsed = (timeNow - timeStart) + timePaused;
        displayTimes(calculateTimes(timeElapsed));
    }
}

function calculateTimes(timeElapsed) {
    timeIntervals = {
        hours: Math.floor(timeElapsed / (1000 * 60 * 60) % 24),
        minutes: Math.floor(timeElapsed / (1000 * 60) % 60),
        seconds: Math.floor((timeElapsed / 1000) % 60)
    }
    var resultArray = new Array(3);
    for (var i = 0; i < 3; i++) {
        var res = zeros.concat(timeIntervals[units[i]]);
        resultArray[i] = res.slice(-2);
    }
    return resultArray;
}

function displayTimes(input) {
    for (var i = 0; i < 3; i++) {
        document.getElementById(units[i]).innerText = input[i];
    }
}