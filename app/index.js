let localTimeSpan = document.getElementById('local_time')

function showCurrentTime() {
    localTimeSpan.innerHTML = new Date().toLocaleTimeString();
}

setInterval(showCurrentTime, 0.1)
