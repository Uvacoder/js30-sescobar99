const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
const totalTime = document.getElementById('totalTime');


timeNodes.forEach(node => {
    node.innerHTML += `<span>${node.dataset.time}</span>`;
})

const seconds = timeNodes.map(node => node.dataset.time)
    .map(timeCode => {
        const [mins, secs] = timeCode.split(':').map(num => parseFloat(num));
        return (mins * 60) + secs;
    })
    .reduce((total, aux) => total + aux);


totalTime.innerText = secondsToString(seconds);

function secondsToString(seconds) {
    let hours = Math.floor(seconds / 3600);
    seconds -= (hours * 3600);
    let minutes = Math.floor(seconds / 60);
    seconds -= (minutes * 60);

    console.log(hours, 'hours', minutes, 'minutes', seconds, 'seconds')

    return hours > 0 ?
        (str_pad_left(hours, '0', 2) + ':' + str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2))
        :
        (str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2));
}

function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}