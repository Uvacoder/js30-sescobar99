let artists;
const myKey = '3ebe0127cde5f85fe25a8eae5d5e9f89'; //:( 🕵️🚓👮
const api = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${myKey}&format=json`

const ul = document.querySelector('#bands');
function stripArticles(word) {
    return word.replace(/^(a |the |an )/i, '').trim();
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


fetch(api)
    .then(blob => blob.json())
    .then(data => {
        artists = data.artists.artist;
        artists.sort((a, b) => stripArticles(a.name) > stripArticles(b.name) ? 1 : -1);
        ul.innerHTML = artists.map(artist =>
            `<li><span><a href="${artist.url}" target="_blank">🔗</a>${artist.name}</span> <span>${numberWithCommas(artist.listeners)}🎧</span></li>`
        ).join('\n');
    });