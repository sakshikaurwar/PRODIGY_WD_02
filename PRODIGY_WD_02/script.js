const display = document.getElementById("display");
const laps = document.getElementById("laps");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCounter = 1;

function updateTime() {

    elapsedTime = Date.now() - startTime;

    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let hours = Math.floor((elapsedTime / (1000 * 60 * 60)));

    display.textContent =
        `${String(hours).padStart(2,'0')}:` +
        `${String(minutes).padStart(2,'0')}:` +
        `${String(seconds).padStart(2,'0')}`;
}

document.getElementById("start").addEventListener("click", () => {

    if(!running){
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 1000);
        running = true;
    }

});

document.getElementById("pause").addEventListener("click", () => {

    clearInterval(timerInterval);
    running = false;

});

document.getElementById("reset").addEventListener("click", () => {

    clearInterval(timerInterval);

    running = false;
    elapsedTime = 0;
    lapCounter = 1;

    display.textContent = "00:00:00";
    laps.innerHTML = "";

});

document.getElementById("lap").addEventListener("click", () => {

    if(elapsedTime === 0) return;

    const li = document.createElement("li");

    li.textContent = `Lap ${lapCounter} — ${display.textContent}`;

    laps.prepend(li);

    lapCounter++;

});