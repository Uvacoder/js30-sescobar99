const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
const lat = document.querySelector('.lat');
const lon = document.querySelector('.lon');
const degree = document.querySelector('.degree');
const originalTransition = arrow.style.transition;
let orientation= false;


window.navigator.geolocation.watchPosition((data) => {
  // console.log(data);
  speed.textContent = roundTwoDec(data.coords.speed);  
  lat.textContent = roundTwoDec(data.coords.latitude);
  lon.textContent = roundTwoDec(data.coords.longitude);
  if(!orientation){
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;

  }

}, (err) => {
  console.log(err);
  alert('Please enable geolocation');
});

function roundTwoDec(number) {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}


if (window.DeviceOrientationEvent) {
  orientation = true;
  window.addEventListener("deviceorientationabsolute", function (event) {  
    // alpha: rotation around z-axis   
    var rotateDegrees = event.alpha;
    // console.log(rotateDegrees);   
    // console.log(event);
    degree.textContent = `${360-Math.round(rotateDegrees)}°`;
    if (rotateDegrees < 2 || rotateDegrees > 358) {
      arrow.style.transition = 'all 0s';
    } else {
      arrow.style.transition = originalTransition;
    }
    arrow.style.transform = `rotate(${rotateDegrees}deg)`;
  }, true);
}