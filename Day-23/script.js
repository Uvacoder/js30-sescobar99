
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const textArea = document.querySelector('textarea');
msg.text = document.querySelector('[name=text]').value;

function populateVoices() {
    voices = this.getVoices();
    // console.log(voices);
    const voiceOptions = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
    // console.log(voiceOptions);
    voicesDropdown.innerHTML = voiceOptions;
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name == this.value);
    // console.log(msg.voice);
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

function setOption() {
    // console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle(false);
}


function speechRecognition(e) {
    if (!speechSynthesis.speaking) {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        textArea.innerText += transcript;
        textArea.dispatchEvent(new Event('change'));
        // console.log(transcript);
    }
}


speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
recognition.addEventListener('result', e => speechRecognition(e));
recognition.addEventListener('end', recognition.start);
recognition.start();