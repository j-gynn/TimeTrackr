sessionData = {
    Username: "undefined",
    Application: "undefined",
    PlayMins: 0,
    Score: 0,
    Level: 0,
    Date: "0001-01-01"
}

function updateSession(input, origin) {
    alert(`Updating session, code: ${input}`);
    let dropdown;

    switch (input) {

        case "user":
            dropdown = document.getElementById("dropdownUser");
            sessionData.Username = dropdown.options[dropdown.selectedIndex].text;
            //document.getElementById("test1").innerHTML = sessionData.Username;
            break;
        case "activity":
            switch (origin) {
                case "manual":
                    dropdown = document.getElementById("dropdownManualActivity");
                    sessionData.Application = dropdown.options[dropdown.selectedIndex].text;
                    break;
                case "timer":
                    dropdown = document.getElementById("dropdownTimerActivity");
                    sessionData.Application = dropdown.options[dropdown.selectedIndex].text;
            }
            break;
        case "time":
            let playTime;
            switch (origin) {
                case "manual":
                    dropdown = document.getElementById("dropdownManualTime");
                    playTime = parseInt(dropdown.options[dropdown.selectedIndex].value, 10);

                    sessionData.PlayMins = playTime;
                    break;
                case "timer":
                    dropdown = document.getElementById("saveTime").value;
                    playTime = parseInt(dropdown);

                    sessionData.PlayMins = playTime;
                    break;
            }
            //document.getElementById("test1").innerHTML = sessionData.PlayMins;
            break;
    }
}

function pushSessionData() {
    if (sessionData.Username == ("undefined" || "Select user")) {
        alert("Select a user to save data to!");
        return;
    } else if (sessionData.Application == "undefined") {
        alert("Select an activity to log!");
        return;
    } else if (sessionData.PlayMins == 0) {
        alert("You can't log 0 minutes of activity!");
        return;
    }

    let d = new Date();
    let today = d.toISOString();
    today = today.slice(0, 10);

    sessionData.Date = today;

    sendToJSON(processUserData);

}

function sendToJSON(callback) {
    //const url = "../json/users.json";

    let newEntryNumber;

    try {
        newEntryNumber = Object.keys(allData[userID].data).length + 1;
    } catch {
        newEntryNumber = 0;
    }

    const request = new XMLHttpRequest();

    allData[userID].data[newEntryNumber] = JSON.parse(JSON.stringify(sessionData));

    console.log(allData);

    //request.open('POST', url);
    //request.setRequestHeader('Content-Type', 'application/json');
    //request.send(JSON.stringify(allData));

    callback();

}