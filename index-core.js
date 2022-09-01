document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    switch (event.key) {
        case " ":
            if (running == true) {
                btnStop_onClick();
                break;
            } else if (timePaused != 0) {
                btnResume_onClick();
                break;
            } else {
                btnStart_onClick();
                break;
            }
            break;
        case "Esc":
        case "Escape":
            if (running == true) {
                btnStop_onClick();
            } else {
                btnReset_onClick();
            }
            break;
        default:
            return;
    }
    event.preventDefault();
}, true);

function window_onLoad() {
    document.getElementById("dropdownUser").addEventListener("change", loadUserData);
    document.getElementById("dropdownManualTime").addEventListener("change", function () { updateSession("time", "manual"); });
    document.getElementById("dropdownManualActivity").addEventListener("change", function () { updateSession("activity", "manual"); });
    document.getElementById("dropdownTimerActivity").addEventListener("change", function () { updateSession("activity", "manual"); });
    document.getElementById("pushSessionData").addEventListener("click", pushSessionData);
    document.getElementById("timeDisplay").addEventListener("change", function () { toggleTimeframe() })

    populateUsers();
    populateTimer();
    generateChart();
    //window.setInterval("stopwatch()", refresh);
}

