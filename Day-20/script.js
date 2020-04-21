const songs = new Map([
    ['Himno', 'https://www.youtube.com/watch?v=UkW9oMMdHwk'],
    ['Secret', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
    ['Party', 'https://www.youtube.com/watch?v=6Zbi0XmGtMw'],
    ['Rap', 'https://www.youtube.com/watch?v=dY2sfuA1UPc'],
    ['Vampire', 'https://www.youtube.com/watch?v=3RTIXUzCr2M'],
    ['Festín', 'https://www.youtube.com/watch?v=NQNzAkBF4uw'],
    ['Rasputín', 'https://www.youtube.com/watch?v=kvDMlk3kSYg'],
    ['Rock it for me', 'https://www.youtube.com/watch?v=fBGSJ3sbivI'],
    ['Scatman', 'https://www.youtube.com/watch?v=Hy8kmNEo1i8'],
    ['Buttercup', 'https://www.youtube.com/watch?v=cCWNbYwEfdw']
]);
const table = document.getElementById('table');

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
    songs.forEach((value, key) => {
        if (aux.includes(key.toLowerCase())) {
            window.open(value, '_blank');
            recognition.abort();
        }
    });
    // console.log(transcript);
});

recognition.addEventListener('end', recognition.start);
recognition.start();

const ul = document.createElement('ul');
songs.forEach((value, key) => {
    const li = document.createElement('li');
    li.innerText = key;
    ul.appendChild(li);
});
table.appendChild(ul);