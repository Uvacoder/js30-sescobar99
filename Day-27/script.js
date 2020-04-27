document.querySelectorAll('img').forEach(img => img.ondragstart = function () { return false; });
const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;
const walkMultiplier = 3;

function onMouseDown(e) {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
}

function onMouseLeave() {
    isDown = false;
    slider.classList.remove('active');
}
function onMouseUp() {
    isDown = false;
    slider.classList.remove('active');
}
function onMouseMove(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * walkMultiplier;
    slider.scrollLeft = scrollLeft - walk;
    // console.log(walk);
}
slider.addEventListener('mousedown', onMouseDown);
slider.addEventListener('mouseleave', onMouseLeave);
slider.addEventListener('mouseup', onMouseUp);
slider.addEventListener('mousemove', onMouseMove);