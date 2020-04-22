const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
const lat = document.querySelector('.lat');
const lon = document.querySelector('.lon');
const alpha = document.querySelector('.alpha');
const originalTransition = arrow.style.transition;


window.navigator.geolocation.watchPosition((data) => {
  console.log(data);
  speed.textContent = roundTwoDec(data.coords.speed);
  // arrow.style.transform = `rotate(${data.coords.heading}deg)`;
  lat.textContent = roundTwoDec(data.coords.latitude);
  lon.textContent = roundTwoDec(data.coords.longitude);

}, (err) => {
  console.log(err);
  alert('Please enable geolocation');
});

function roundTwoDec(number) {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}


if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientationabsolute", function (event) {
  // window.addEventListener("deviceorientation", function (event) {
    // alpha: rotation around z-axis    
    console.log(event);
    var rotateDegrees = event.alpha;
    arrow.style.transform = `rotate(${rotateDegrees}deg)`;
    console.log(rotateDegrees);    
    alpha.textContent = roundTwoDec(rotateDegrees);    
    if(rotateDegrees < 1 || rotateDegrees > 359){
      arrow.style.transition = 'all 0s';
    }else{
      arrow.style.transition = originalTransition;
    }
    
  }, true);
}