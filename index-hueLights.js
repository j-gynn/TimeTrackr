const http = new XMLHttpRequest();
const localUrl = "http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/";
const remoteUrl = "http://10.208.61.74:5050/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/";

const red = [0.675, 0.322];
const yellow = [0.5567, 0.4091];
const green = [0.35, 0.55];

const colours = {
    "red": [0.675, 0.322],
    "yellow": [0.5567, 0.4091],
    "green": [0.35, 0.55]
    

}

var messageData = {
    "on": true,
    "bri": 50,
    //is green by default
    "xy": [0.35, 0.55]
}

function updateHue(colour) {

    //e = document.getElementById("hueColour");
    //selectedColour = e.options[e.selectedIndex].text;
    messageData.xy = colours[colour];
    document.getElementById("hueOnscreen").style.backgroundColor = colour;
    let light = document.getElementById("hueSelect").selectedIndex + 1;


    let url = remoteUrl + light + "/state/";

    http.open("PUT", url);
    http.send(JSON.stringify(messageData));

    //url = remoteUrl;

    //selectedColour = document.getElementById("hueColour").selectedIndex.value;
    //xyColour = JSON.stringify(colours[selectedColour]);

    //selectedLight = document.getElementById("hueSelect").selectedIndex.value;

    //hueRequest = JSON.stringify('{ "on": true, "bri": 50}');
    //hueUrl = url + selectedLight + "/state/";



    //http.open("PUT", hueUrl);
    //http.send(hueRequest);
}

http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(http.responseText);
    }
}