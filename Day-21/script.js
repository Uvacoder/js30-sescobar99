const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
const lat = document.querySelector('.lat');
const lon = document.querySelector('.lon');


window.navigator.geolocation.watchPosition((data) => {
  console.log(data);
  speed.textContent = roundTwoDec(data.coords.speed) ;
  arrow.style.transform = `rotate(${data.coords.heading}deg)`;
  lat.textContent = roundTwoDec(data.coords.latitude);
  lon.textContent = roundTwoDec(data.coords.longitude);

}, (err) => {
    console.log(err);
  alert('Please enable geolocation');
});

function roundTwoDec(number){
  return Math.round(( number + Number.EPSILON) * 100) / 100;
}