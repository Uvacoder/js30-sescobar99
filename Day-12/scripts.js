const image = document.getElementById('myImage');
const player = document.getElementById('player');
const backgrounds = 7;
let actualBackground = 0;
const pressed = [];
const secretCodes = [
    ['TURNDOWNTHEHEAT', 'Clear Wanted Level'],
    ['BTCDBCB', 'Fat Body'],
    ['BUFFMEUP', 'Muscular Body'],
    ['KVGYZQK', 'Skinny Body'],
    ['BRINGITON', 'Six Star Wanted Level'],
    ['ROCKETMAN', 'Spawn Jetpack'],
    ['IWPRTON', 'Spawn Rhino'],
    ['AIYPWZQP', 'Spawn Parachute'],
    ['KGGGDKP', 'Spawn Vortex Hovercraft'],
];
const longest = secretCodes.reduce(function (a, b) { return a[0].length > b[0].length ? a : b; })[0];

window.addEventListener('keyup', (e) => {
    console.log(e.key);
    pressed.push(e.key);
    pressed.splice(-longest.length - 1, pressed.length - longest.length);
    secretCodes.forEach(code => evalCode(code));
    // console.log(pressed);
});

function evalCode(code) {
    if (pressed.join('').includes(code[0])) {
        // console.log(code);
        activateCheatCode(code[0]);
        pressed.splice(0, longest.length);
    }
}

function activateCheatCode(code) {
    image.src = `images/${code}.png`;
}


player.addEventListener('play', () => {
    player.style.display = 'none';
});


const ul = document.createElement('ul');
document.getElementById('myItemList').appendChild(ul);
secretCodes.forEach(code => {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.innerHTML += `<span>${code[0]}</span> : <span class="saf">${code[1]}</span>`;
});


setInterval(() => {
    actualBackground++;
    actualBackground = actualBackground % backgrounds;
    document.body.style.backgroundImage = `url("images/wallpapers/wp${actualBackground}.jpg")`;
}, 10000);
