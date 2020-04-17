const countries = [];
let date_fetched;
let summary;
const api = 'https://api.covid19api.com/summary';

fetch(api)
  .then(blob => blob.json())
  .then(data => {
    // console.log(data.Countries);
    // console.log(data.Date);
    countries.push(...data.Countries);
    date_fetched = new Date(data.Date);
    document.getElementById('summaryTable').innerHTML = objToHtmlTable(data.Global);
    document.getElementById('dataDate').innerText = date_fetched;

  });

function displayMatches() {
  const matchArray = findMatches(this.value, countries);

  let sortParameter = getSelectedSort();

  matchArray.sort((a, b) => sortBy(a, b, sortParameter));

  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');

    const countryName = place.Country.replace(regex, `<span class="hl">${this.value}</span>`);

    const countryCode = place.CountryCode.replace(regex, `<span class="hl">${this.value}</span>`);

    return `
            <li>
              <span class="name">${countryName}, ${countryCode} </span>      
              <span class="population">Confirmed: ${numberWithCommas(place.TotalConfirmed)}</span>
              <span class="population">Deaths: ${numberWithCommas(place.TotalDeaths)}</span>
              <span class="population">Recovered: ${numberWithCommas(place.TotalRecovered)}</span>
            </li>
          `;
  }).join('');

  suggestions.innerHTML = html;
  // console.log(html);
}

function findMatches(wordToMatch, countries) {
  return countries.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return (place.Country.match(regex) || place.CountryCode.match(regex) || place.Slug.match(regex));
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function unCamelCase(str) {
  str = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, "$1 $2");
  str = str.toLowerCase(); //add space between camelCase text
  return str;
}

function objToHtmlTable(obj) {
  let table = '';
  for (let i in obj) {
    table += `
              <tr>
                <th>${unCamelCase(i)}:</th>
                <td>${numberWithCommas(obj[i])}</td>
              </tr>          
            `
  }
  return table;
}

function sortBy(a, b, sortParameter) {
  if (a[sortParameter] > b[sortParameter]) {
    return -1;
  } else {
    return 1;
  }
}

function getSelectedSort() {
  let radioButtons = document.getElementsByName('sortRadio');
  for (let elem of radioButtons) {
    if (elem.checked) {
      return elem.value;
    }
  }
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

// const buttons = document.getElementsByName('sortRadio')

// for (let elem of buttons) {
//     elem.addEventListener('change', displayMatches(searchInput));
//   }