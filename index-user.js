let allData = new Object;
let userID = 0;
let todayData = new Object;

function populateUsers() {
    dropdownUser = document.getElementById("dropdownUser");
    dropdownUser.length = 0;

    defaultOption = document.createElement("option");
    defaultOption.text = "Select user";

    dropdownUser.add(defaultOption);
    dropdownUser.selectedIndex = 0;

    const url = "../json/users.json";

    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            let option;
            for (let i = 0; i < data.length; i++) {
                option = document.createElement("option");
                option.text = data[i].name;
                option.value = data[i].name;
                dropdownUser.add(option);
            }
        }
    }
    request.send();
}

function loadUserData() {
    const dropdown = document.getElementById("dropdownUser")
    const user = dropdown.options[dropdown.selectedIndex].text;
    updateSession("user");
    userDataRequest(user, processUserData);
}

function userDataRequest(user, callback) {
    const url = "../json/users.json";

    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            allData = JSON.parse(request.responseText);


            userID = 0;
            tempUser = allData.find(checkUser);
            

            function checkUser(input) {
                if (input.name == user) {
                    return user;
                } else {
                    userID++;
                }
            }
            callback();
        }
    }
    request.open('GET', url, true);
    request.send();
}

function processUserData() {
    const warn = document.getElementById("dropdownWarn");
    const warnCheck = document.getElementById("warnDisabled");
    const limit = document.getElementById("dropdownLimit");
    const limitCheck = document.getElementById("limitDisabled");

    warn.selectedIndex = allData[userID].leisureWarn;
    limit.selectedIndex = allData[userID].leisureLimit;
    warnCheck.checked = allData[userID].leisureWarnDisabled;
    limitCheck.checked = allData[userID].leisureLimitDisabled;

    getTimeSpent(allData[userID].data);
    updatePieData(document.getElementById("timeDisplay").checked);
}

function getTimeSpent(data) {
    //get today's date
    d = new Date();
    let today = d.toISOString();
    today = today.slice(0, 10);

    //let today = "2022-01-21";
    let todayReadable = new Array(3);
    let todayTime = 0;
    //this should filter "data" and return only those entries that are equal to today's date
    try {
        todayArray = Object.fromEntries(
            Object.entries(data).filter(input => input[1].Date == today));

        todayData = Object.values(todayArray);

        //adds up all of today's PlayMins
        for (i = 0; i < todayData.length; i++) {
            todayTime += todayData[i].PlayMins;
        }

        //makes an array "todayReadable" and populates it with the time in hours, minutes and seconds
        todayMilliseconds = todayTime * 60 * 1000;
        todayReadable = calculateTimes(todayMilliseconds);

        //DEBUG
        document.getElementById("test1").innerHTML = `${todayTime}, ${todayMilliseconds}`

        document.getElementById("dropdownWarn").selectedIndex.value

        if (Math.floor(todayTime / 60) >= (allData[userID].leisureLimit) && !allData[userID].leisureWarnDisabled) {
            updateHue("yellow");
        }
        if (Math.floor(todayTime / 60) >= (allData[userID].leisureWarn) && !allData[userID].leisureLimitDisabled) {
            updateHue("red");
        }
    } catch {
        //if an error is thrown, then no data matches and no leisure time logged yet
        todayReadable[0] = "00";
        todayReadable[1] = "00";
    }

    document.getElementById("leisureTimeSpent").innerHTML = `${todayReadable[0]}:${todayReadable[1]}`;
}