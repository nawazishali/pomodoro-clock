function decrement(targetId) {
    if (targetId === "session-time") {
        var targetId = document.getElementById(targetId);
        var currentVal = parseInt(targetId.value);
        if (currentVal <= 0) {
            return false;
        } else {
            var newVal = (currentVal - 1).toString();
            targetId.value = newVal;
            document.getElementById('clock').innerHTML = formatTime(parseInt(newVal) * 60);
        }
    } else {
        var targetId = document.getElementById(targetId);
        var currentVal = parseInt(targetId.value);
        if (currentVal <= 0) {
            return false;
        } else {
            var newVal = (currentVal - 1).toString();
            targetId.value = newVal;
        }
    }


}

function increment(targetId) {
    if (targetId === "session-time") {
        var targetId = document.getElementById(targetId);
        var currentVal = parseInt(targetId.value);
        if (currentVal >= 60) {
            return false;
        } else {
            var newVal = (currentVal + 1).toString();
            targetId.value = newVal;
            document.getElementById('clock').innerHTML = formatTime(parseInt(newVal) * 60);
        }
    } else {
        var targetId = document.getElementById(targetId);
        var currentVal = parseInt(targetId.value);
        if (currentVal >= 60) {
            return false;
        } else {
            var newVal = (currentVal + 1).toString();
            targetId.value = newVal;
        }
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
var audio = document.getElementById('audio');

function startTimer() {
    var sessionInSeconds = parseInt(document.getElementById('session-time').value) * 60;
    var breakinSeconds = parseInt(document.getElementById('break-time').value) * 60;
    var sessionT = sessionInSeconds;
    var breakT = breakinSeconds;
    var sessionTimer = setInterval(function () {
        clock.innerHTML = formatTime(sessionT);
        sessionT--;
        if (sessionT < 0) {
            clearInterval(sessionTimer);
            audio.play();
            var breakTimer = setInterval(function () {
                clock.innerHTML = formatTime(breakT);
                breakT--;
                if (breakT < 0) {
                    clearInterval(breakTimer);
                    audio.load();
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
        audio.pause();
        audio.load();
    } else {
        toggleBtn.innerHTML = "Stop Timer";
        startTimer();
    }
};
