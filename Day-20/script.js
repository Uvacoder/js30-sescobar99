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
    if (transcript.includes('rasputin')) window.open('https://www.youtube.com/watch?v=kvDMlk3kSYg', '_blank');
    if (transcript.includes('scatman')) window.open('https://www.youtube.com/watch?v=Hy8kmNEo1i8', '_blank');
    if (transcript.includes('rock it for me')) window.open('https://www.youtube.com/watch?v=fBGSJ3sbivI', '_blank');
    if (transcript.includes('vampire')) window.open('https://www.youtube.com/watch?v=3RTIXUzCr2M', '_blank');
    if (transcript.includes('party')) window.open('https://www.youtube.com/watch?v=6Zbi0XmGtMw', '_blank');
    if (transcript.includes('himno')) window.open('https://www.youtube.com/watch?v=UkW9oMMdHwk', '_blank');
    if (transcript.includes('secret')) window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    
   
    console.log(transcript);

});


recognition.addEventListener('end', recognition.start);

recognition.start();

