const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const am = document.querySelector('.am');
const pm = document.querySelector('.pm');

function setDate() {
    const now = new Date();

    const offSet = 90;

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + offSet;

    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + offSet;

    const hours = now.getHours();
    const hoursDegrees = ((hours / 12) * 360) + ((mins / 60) * 30) + offSet;

    const meridian = Math.floor((hours / 12));


    // console.log('meridian: ' + meridian);
    // console.log('hour: ' + hours);
    // console.log('hourdegress: ' + hoursDegrees);
    // console.log('mins: ' + mins);
    // console.log('minsDegrees: ' + minsDegrees);
    // console.log('sec: ' + seconds);
    // console.log('secDegrees: ' + secondsDegrees);

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minHand.style.transform = `rotate(${minsDegrees}deg)`;
    hourHand.style.transform = `translateX(70%) rotate(${hoursDegrees}deg)`;

    if (meridian === 1) {//pm
        pm.style.boxShadow = "0 0 10px greenyellow";
        am.style.boxShadow = "none";

    } else {
        am.style.boxShadow = "0 0 10px greenyellow";
        pm.style.boxShadow = "none";

    }

}

setInterval(setDate, 1000);