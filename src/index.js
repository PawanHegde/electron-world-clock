const moment = require('moment-timezone')

let localTimeSpan = document.getElementById('local_time');

function getCurrentTime(moment, timezone) {
    return moment.tz(timezone).toLocaleString();
}

setInterval(function() {
    let timezone = moment.tz.guess()
    let currentTime = getCurrentTime(moment, timezone);
    localTimeSpan.innerHTML = currentTime
}, 0.1)
