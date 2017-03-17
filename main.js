function decrement(targetId) {
    var targetId = document.getElementById(targetId);
    var currentVal = parseInt(targetId.innerHTML);
    if (currentVal <= 1) {
        return false;
    } else {
        var newVal = (currentVal - 1).toString();
        targetId.innerHTML = newVal;
    }

}

function increment(targetId) {
    var targetId = document.getElementById(targetId);
    var currentVal = parseInt(targetId.innerHTML);
    if (currentVal >= 60) {
        return false;
    } else {
        var newVal = (currentVal + 1).toString();
        targetId.innerHTML = newVal;
    }
}

function formatTime(time) {
    var seconds = time % 60;
    var mins = (time - seconds) / 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    return mins + ":" + seconds;
}


var clock = document.getElementById('clock');
var sessionInSeconds = parseInt(document.getElementById('session-time').innerHTML) * 60;
var breakinSeconds = parseInt(document.getElementById('break-time').innerHTML) * 60;
var sessionT = sessionInSeconds;
var breakT = breakinSeconds;

function startTimer() {
    var sessionTimer = setInterval(function () {
        clock.innerHTML = formatTime(sessionT);
        sessionT--;
        if (sessionT < 0) {
            clearInterval(sessionTimer);
            var breakTimer = setInterval(function () {
                clock.innerHTML = formatTime(breakT);
                breakT--;
                if (breakT < 0) {
                    clearInterval(breakTimer);
                    sessionT = sessionInSeconds;
                    breakT = breakinSeconds;
                    startTimer();
                }
            }, 1000);
        }
    }, 1000);

}

function stopTimer() {
    for (var i = 1; i < 10; i++) {
        window.clearInterval(i);
    }
}

var toggleBtn = document.getElementById('timer-toggle');
toggleBtn.onclick = function () {
    if (toggleBtn.innerHTML === "Stop Timer") {
        toggleBtn.innerHTML = "Start Timer";
        stopTimer();
    } else {
        toggleBtn.innerHTML = "Stop Timer";
        startTimer();
    }
};
