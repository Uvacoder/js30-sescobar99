const divs = document.querySelectorAll('div');
const removeB = document.querySelector('#remove');
const addB = document.querySelector('#add');
const checkboxes = document.querySelectorAll('input[type=checkbox]');

var stopPropagation = false;
var capture = false;
var once = false;

function logText(e) {
    if (stopPropagation) {
        e.stopPropagation();
    }
    console.log(this.classList.value);
}

function divsRemoveEventListeners() {
    divs.forEach(div => div.removeEventListener('click', logText, false));
    divs.forEach(div => div.removeEventListener('click', logText, true));
    console.log('Removed');

}

function divsAddEventListeners() {
    divs.forEach(div => div.removeEventListener('click', logText, false));
    divs.forEach(div => div.removeEventListener('click', logText, true));
    divs.forEach(div => div.addEventListener('click', logText, { capture: capture, once: once }));
    console.log('Added');
}

function update() {
    globalThis[this.name] = this.checked;
    console.log(this.name, globalThis[this.name]);
}



removeB.addEventListener('click', () => { divsRemoveEventListeners() });
addB.addEventListener('click', () => { divsAddEventListeners() });
checkboxes.forEach(checkbox => checkbox.addEventListener('click', update));