var lineWidth = 100;
document.getElementById('lineWidth').value = lineWidth;

var hue = 0;
document.getElementById('hue').value = hue;

var alpha = 1;
document.getElementById('alpha').value = alpha;


let isDrawing = false;
let lastX = 0;
let lastY = 0;
let direction = true;

const canvas = document.createElement('canvas');
// const canvas = document.querySelector('#draw');

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.95 - document.getElementById('controls').offsetHeight;
ctx.strokeStyle = 'white';
ctx.lineWidth = lineWidth;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
// ctx.globalCompositeOperation = 'multiply';


function draw(e) {
    if (!isDrawing) {
        return;
    }
    // console.log(e);
    if (isDrawingRainbow()) {
        rainbowDraw();
    } else {
        regularDraw();
    }

    ctx.beginPath();

    // from
    ctx.moveTo(lastX, lastY);
    // to
    ctx.lineTo(e.offsetX, e.offsetY);

    lastX = e.offsetX;
    lastY = e.offsetY;
    ctx.stroke();
}

function rainbowDraw() {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    hue++;
    if (hue >= 360) {
        hue = 0;
    }
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

function regularDraw() {
    ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${alpha})`
    ctx.lineWidth = lineWidth;
}

function isDrawingRainbow() {
    let radioButtons = document.getElementsByName('sortRadio');
    for (let elem of radioButtons) {
        if (elem.checked) {
            return elem.value === 'rainbowDraw';
        }
    }
}

function handleUpdate() {
    // console.log(window[this.name]);
    // console.log(this.name);
    // console.log(this.value);
    window[this.name] = this.value;
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

const inputs = document.querySelectorAll('.controls .range');
inputs.forEach(input => input.addEventListener('change', handleUpdate));

document.querySelector('body').append(canvas);