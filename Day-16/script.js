const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 300;

function shadow(e) {
    // console.log(e);

    const width = hero.offsetWidth;
    const height = hero.offsetHeight;

    let x = e.offsetX;
    let y = e.offsetY;

    // console.log(this, e.target);
    if (this !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    text.style.textShadow = `${xWalk}px ${yWalk}px 0 rgb(243,34,09,0.9) ,${xWalk * -1}px ${yWalk}px 0 rgb(158,254,100,0.6) , ${yWalk}px ${xWalk * -1}px 0 rgb(300,80,100,0.8)`;

    console.log(x, y);
}

hero.addEventListener('mousemove', shadow);