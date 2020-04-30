let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const audio = document.getElementById('audio');

function timer(seconds) {
    clearInterval(countdown);
    audio.currentTime = 0;
    audio.pause();

    const now = Date.now();
    const then = now + (seconds * 1000);
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            audio.play();
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    let remainderSeconds = seconds % 3600;
    const minutes = Math.floor(remainderSeconds / 60);
    remainderSeconds = remainderSeconds % 60
    // console.log(seconds);
    // console.log(hours, minutes, remainderSeconds);
    const display = hours > 0 ?
        `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
        :
        `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

    document.title = display;
    timerDisplay.textContent = display;
    // console.log(display);
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    const seconds = end.getSeconds();
    const display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    endTime.textContent = `Be Back At ${display}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

audio.addEventListener('play', () => {    
    document.body.style.backgroundImage = "url('https://media.giphy.com/media/Zg7clvqHE3CdW/giphy.gif')";
});
audio.addEventListener('pause', () => { 
    document.body.style.backgroundImage = '';
});

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes * 60);
    this.reset();
});