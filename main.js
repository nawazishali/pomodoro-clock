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
    var newVal = (currentVal + 1).toString();
    targetId.innerHTML = newVal;

}

function displayTimer() {
    var clock = document.getElementById('clock');

}
