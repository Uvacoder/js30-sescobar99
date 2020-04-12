//todo
//Hacer que al arrastrar la barra de progreso se muestre el tiempo (burbuja) 
//Hacer que despus de que salga de la barra no se buggee, y se pueda seguir arrastrando por fuera de ella
//fullscreen
//mobile

//elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = document.querySelector('.fullscreen');
const mute = document.querySelector('.player__button.mute');
const qualityButtons = document.querySelectorAll('.player__button.quality');
const restart = document.querySelector('.player__button.restart');
const time = document.querySelector('.player__button.time');
const playbackRate = document.getElementById('playbackRate');

// const restart;

let mouseDown = false;
//build functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function updateVolumeButton() {
    let icon;
    let volume = video.volume;
    if (volume === 0 || video.muted) {
        icon = '🔇'
    } else if (volume <= 0.2) {
        icon = '🔈';
    } else if (volume <= 0.7) {
        icon = '🔉';
    } else {
        icon = '🔊';
    }
    mute.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
    playbackRate.value = 1;
}
function skip(seconds){
    video.currentTime += seconds;
    playbackRate.value = 1;
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    time.textContent = `${secondsToString(video.currentTime.toFixed())}/${secondsToString(video.duration.toFixed())}`;
}


function secondsToString(seconds) {
    let hours = Math.floor(seconds / 3600);
    seconds -= (hours * 3600);
    let minutes = Math.floor(seconds / 60);
    seconds -= (minutes * 60);

    return hours > 0 ?
        (str_pad_left(hours, '0', 2) + ':' + str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2))
        :
        (str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2));
}

function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFullScreen() {
    if (!document.mozFullScreen && !document.webkitFullScreen) {
        if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else {
            video.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else {
            document.webkitCancelFullScreen();
        }
    }
}

function handleQuality() {
    let currentTime = video.currentTime;
    video.src = `videos/${this.value}.mp4`;
    video.currentTime = currentTime;
    video.play();
}

function restartVideo() {
    video.currentTime = 0;
}

function toggleMute() {
    video.muted = !video.muted;
}

/* When the user clicks on the button,
toggle between hiding and showing the dropup content */
function myFunction() {
    document.getElementById("myDropup").classList.toggle("show");
}

// Close the dropup menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropups = document.getElementsByClassName("dropup-content");
        var i;
        for (i = 0; i < dropups.length; i++) {
            var openDropup = dropups[i];
            if (openDropup.classList.contains('show')) {
                openDropup.classList.remove('show');
            }
        }
    }
}

//listeners
toggle.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('volumechange', updateVolumeButton);
video.addEventListener('durationchange', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('click', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        scrub(e);
    }
});
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mouseleave', () => mouseDown = false);

qualityButtons.forEach(button => button.addEventListener('click', handleQuality));

restart.addEventListener('click', restartVideo);

mute.addEventListener('click', toggleMute);

document.addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        toggleFullScreen();
    }else if(e.keyCode == 32){
        togglePlay();
    }else if(e.keyCode == 37){
        skip(-10);
    }else if(e.keyCode == 39 ){
        skip(10);
    }else if(e.keyCode == 77){
        toggleMute();
    }
}, false);

fullscreen.addEventListener('click', toggleFullScreen);
