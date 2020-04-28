const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');
const min = 0.1;
const max = 8;
let isBeingClicked = false

function handleMove(e) {
  if (!isBeingClicked) return;
  console.log(e)
  console.log(this);
  const y = e.pageY - this.offsetTop;
  const percent = y / this.offsetHeight;
  const height = Math.round(percent * 100) + '%';
  const playbackRate = percent * (max - min) + min;
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(2) + '×';
  video.playbackRate = playbackRate;
  console.log(video.playbackRate);
}
speed.addEventListener('mousedown', () => isBeingClicked = true);
speed.addEventListener('mouseup', () => isBeingClicked = false);
speed.addEventListener('mousemove', handleMove);
speed.addEventListener('mousedown', handleMove);