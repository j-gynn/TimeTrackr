function populateTimer() {
    dropdownTimer = document.getElementById("dropdownManualTime");
    dropdownTimer.length = 1;

    //defaultOption = document.createElement("option");
    //defaultOption.text = "00:00";
    //defaultOption.value = 0;
    //dropdownTimer.add(defaultOption);

    hours = "00";
    minutes = "00";
    let zero = "0";

    let option
    for (i = 5; i <= 180; i = i + 5) {
        minutes = parseInt(minutes) + 5;
        minutes = zero.concat(minutes).slice(-2);

        if (minutes == 60) {
            hours++;
            hours = zero.concat(hours).slice(-2);
            minutes = "00";
        }
        option = document.createElement("option");
        option.text = hours + ":" + minutes;
        option.value = i;
        dropdownTimer.add(option);
    }
}
