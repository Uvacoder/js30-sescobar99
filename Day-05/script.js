const panels = document.querySelectorAll('.panel');


function toggleOpen() {
  this.classList.toggle('open');
}

function toggleActive(e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));


fetch('https://api.covid19api.com/summary')
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    let string = 'Global : \n';
    let global_summary = myJson.Global;

    for (i in global_summary) {
      string += i + ': ' + global_summary[i] + '\n';
    }
    // console.log(string);
    document.getElementById('data1').innerText = string;

    let date = new Date(myJson.Date);
    // console.log(date);
    document.getElementById('data2').innerHTML = '<a target="_blank" href="https://covid19api.com/">Data retrieved from.</a>' + '  At ' + date.toTimeString();

  });