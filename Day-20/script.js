window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    p.textContent = transcript;
    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }

    let aux = transcript.toLowerCase();

    if (aux.includes('rasputin') || aux.includes('rasputín')) {
        window.open('https://www.youtube.com/watch?v=kvDMlk3kSYg', '_blank');
        recognition.abort();
    } else if (aux.includes('scatman')) {
        window.open('https://www.youtube.com/watch?v=Hy8kmNEo1i8', '_blank');
        recognition.abort();
    } else if (aux.includes('rock it for me')) {
        window.open('https://www.youtube.com/watch?v=fBGSJ3sbivI', '_blank');
        recognition.abort();
    } else if (aux.includes('vampire')) {
        window.open('https://www.youtube.com/watch?v=3RTIXUzCr2M', '_blank');
        recognition.abort();
    } else if (aux.includes('party')) {
        window.open('https://www.youtube.com/watch?v=6Zbi0XmGtMw', '_blank');
        recognition.abort();
    } else if (aux.includes('himno')) {
        window.open('https://www.youtube.com/watch?v=UkW9oMMdHwk', '_blank');
        recognition.abort();
    } else if (aux.includes('secret')) {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        recognition.abort();
    } else if (aux.includes('rap')) {
        window.open('https://www.youtube.com/watch?v=dY2sfuA1UPc', '_blank');
        recognition.abort();
    } else if (aux.includes('festin') || aux.includes('festín')) {
        window.open('https://www.youtube.com/watch?v=NQNzAkBF4uw', '_blank');
        recognition.abort();
    }
    // console.log(transcript);

});


recognition.addEventListener('end', recognition.start);

recognition.start();

