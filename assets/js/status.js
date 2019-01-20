// var URL = "https://db.softver.org.mk/influxdb/query?db=status";
var QUERY = "q=SELECT doorstatus FROM doorstatus WHERE location='hacklab' ORDER BY time DESC LIMIT 1";

var queryURL = URL + "&" + QUERY;


var request = new XMLHttpRequest();
var status = "";

request.open('POST', queryURL, true);

request.onload = function () {
    if (request.status >= 200 && request.status < 400) {

        if (JSON.parse(request.responseText).results[0].series[0].values[0][1] == "OPEN") {
            status = 'Хаклабот во моментов е <span style="color: green;">отворен</span> :-)';
        } else {
            status = 'Хаклабот во моментов е <span style="color: red;">затворен</span> :-(';
        }
    } else {
        // Reached the target server, but it returned an error
    }

    $(".navbar-text").html(status);
};

request.onerror = function () {
    // There was a connection error of some sort
};

request.send();
