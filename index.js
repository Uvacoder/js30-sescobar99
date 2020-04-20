const daysFinished = 19;
const taskName = ['Drum Kit', 'JS and CSS Clock', 'CSS Variables', 'Array Cardio Day 1', 'Flex Panel Gallery', 'Type Ahead', 'Array Cardio Day 2', 'Fun with HTML5 Canvas', 'Dev Tools Domination', 'Hold Shift and Check Checkboxes', 'Custom Video Player', 'Key Sequence Detection', 'Slide in on Scroll', 'JavaScript References VS Copying', 'LocalStorage', 'Mouse Move Shadow', 'Sort Without Articles', 'Adding Up Times with Reduce', 'Webcam Fun', 'Speech Detection', 'Geolocation', 'Follow Along Link Highlighter', 'Speech Synthesis', 'Sticky Nav', 'Event Capture, Propagation, Bubbling and Once', 'Stripe Follow Along Nav', 'Click and Drag', 'Video Speed Controller', 'Countdown Timer', 'Whack A Mole']

// Change style of navbar on scroll
window.onscroll = function () { myFunction() };
function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    }
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function updateProgressBar() {
    let nmb_days = document.getElementsByClassName('day').length;
    let percent_completed = (nmb_days * 100 / 30).toFixed(2);
    const progressBar = document.getElementById('progressBar');

    progressBar.style.width = percent_completed + '%';
    progressBar.innerText = percent_completed + '%';

    if (nmb_days <= 4) { progressBar.classList.add('w3-red'); }
    else if (nmb_days <= 8) { progressBar.classList.add('w3-deep-orange'); }
    else if (nmb_days <= 12) { progressBar.classList.add('w3-orange'); }
    else if (nmb_days <= 16) { progressBar.classList.add('w3-amber'); }
    else if (nmb_days <= 20) { progressBar.classList.add('w3-yellow'); }
    else if (nmb_days <= 24) { progressBar.classList.add('w3-lime'); }
    else if (nmb_days <= 29) { progressBar.classList.add('w3-light-green'); }
    else { progressBar.classList.add('w3-green'); }

    document.getElementById('progressBarText').appendChild(document.createTextNode(` Current progress: ${nmb_days}/30`));

}


function makePortfolio() {
    for (let i = 1; i <= daysFinished; i += 2) {
        const row = document.createElement('div');
        row.classList.add('w3-row-padding');
        row.classList.add('w3-center');
        row.classList.add('w3-section');
        for (let j = 0; j < 2; j++) {
            const child = document.createElement('div');
            let dayNumber = (i + j).toString();
            dayNumber.length < 2 ? dayNumber = '0' + dayNumber : '';
            row.appendChild(child);
            child.classList.add('w3-half');
            child.classList.add('day');
            const link = document.createElement('a');
            child.appendChild(link);
            link.href = `Day-${dayNumber}/`;
            link.innerHTML = `<img src="images/Day${dayNumber}preview.jpg" width=100% height=100% class="w3-hover-opacity" alt="Day-${dayNumber}">`;
            const p = document.createElement('p');
            child.appendChild(p);
            p.innerText = `Day ${dayNumber}: ${taskName[dayNumber - 1]}`;
            if (dayNumber === daysFinished.toString()) {
                break;
            }
        }
        document.getElementById('portfolio').append(row);
    }
    updateProgressBar();
}
makePortfolio();