/* jshint undef: true, unused: false, evil: true */
/* globals document, window, setInterval, clearInterval */
var clock = document.getElementById('clock');
var audio = document.getElementById('audio');
var statusPara = document.getElementById('status');
var buttons = document.getElementsByTagName("button");
var toggleBtn = document.getElementById('timer-toggle');
var resetBtn = document.getElementById("timer-reset");
var sessionInSeconds = parseInt(document.getElementById('session-time').value) * 60;
var breakinSeconds = parseInt(document.getElementById('break-time').value) * 60;

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

function decrement(targetId) {
    var currentVal, newVal;
    var target = document.getElementById(targetId);
    currentVal = parseInt(target.value);

    if (currentVal <= 0) {
        return false;
    } else {
        newVal = (currentVal - 1).toString();
        target.value = newVal;
        sessionInSeconds = parseInt(document.getElementById('session-time').value) * 60;
        breakinSeconds = parseInt(document.getElementById('break-time').value) * 60;
    }
    if (targetId === "session-time") {
        clock.innerHTML = formatTime(parseInt(newVal) * 60);
    }

}

function increment(targetId) {
    var currentVal, newVal;
    var target = document.getElementById(targetId);
    currentVal = parseInt(target.value);

    if (currentVal >= 60) {
        return false;
    } else {
        newVal = (currentVal + 1).toString();
        target.value = newVal;
        sessionInSeconds = parseInt(document.getElementById('session-time').value) * 60;
        breakinSeconds = parseInt(document.getElementById('break-time').value) * 60;
    }
    if (targetId === "session-time") {
        clock.innerHTML = formatTime(parseInt(newVal) * 60);
    }
}

function stopTimer() {
    for (var i = 1; i < 999; i++) {
        window.clearInterval(i);
    }
}

function startTimer() {
    statusPara.innerHTML = "Time to Work";
    var sessionStart = setInterval(sessionTimer, 1000);
    var breakStart;

    function sessionTimer() {
        if (sessionInSeconds >= 1) {
            sessionInSeconds--;
            clock.innerHTML = formatTime(sessionInSeconds);
        } else if (sessionInSeconds <= 0) {
            clearInterval(sessionStart);
            audio.play();
            statusPara.innerHTML = "Enjoy your Break";
            breakStart = setInterval(breakTimer, 1000);
        }
    }

    function breakTimer() {
        if (breakinSeconds >= 1) {
            breakinSeconds--;
            clock.innerHTML = formatTime(breakinSeconds);
        } else if (breakinSeconds <= 0) {
            clearInterval(breakStart);
            audio.load();
            sessionInSeconds = parseInt(document.getElementById('session-time').value) * 60;
            breakinSeconds = parseInt(document.getElementById('break-time').value) * 60;
            startTimer();
        }
    }

}

var musicBtn = document.getElementById("music");
musicBtn.onclick = function () {
    if (musicBtn.classList.contains("fa-volume-up")) {
        musicBtn.classList.remove("fa-volume-up");
        musicBtn.classList.add("fa-volume-off");
        if (statusPara.innerHTML === "Enjoy your Break") {
            audio.pause();
        }
    } else {
        musicBtn.classList.remove("fa-volume-off");
        musicBtn.classList.add("fa-volume-up");
        if (statusPara.innerHTML === "Enjoy your Break") {
            audio.play();
        }
    }
};

toggleBtn.onclick = function () {
    var i;
    if (toggleBtn.innerHTML === "Stop Timer") {
        toggleBtn.innerHTML = "Start Timer";
        stopTimer();
        for (i = 0; i <= 3; i++) {
            buttons[i].disabled = false;
        }
        audio.pause();
        audio.load();
    } else {
        startTimer();
        toggleBtn.innerHTML = "Stop Timer";
        for (i = 0; i <= 3; i++) {
            buttons[i].disabled = true;
        }
    }
};

resetBtn.onclick = function () {
    if (toggleBtn.innerHTML === "Stop Timer") {
        toggleBtn.click();
    }
    document.getElementById('session-time').value = "25";
    document.getElementById('break-time').value = "5";
    clock.innerHTML = "25:00";
    sessionInSeconds = parseInt(document.getElementById('session-time').value) * 60;
    breakinSeconds = parseInt(document.getElementById('break-time').value) * 60;

};
