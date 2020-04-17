// ## Array Cardio Day 2

const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];

const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
];



console.log('People array');
console.table(people);
createTable(people, 'peopleArray');

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
const isAdult = people.some(person => {
    const currentYear = (new Date()).getFullYear();
    const age = currentYear - person.year;
    return (age >= 19);
});
console.log('1. Is at least one person 19 or older?');
console.log(isAdult);
document.getElementById('exercise1').innerText = isAdult;


// Array.prototype.every() // is everyone 19 or older?
const areAdults = people.every(person => {
    const currentYear = (new Date()).getFullYear();
    const age = currentYear - person.year;
    return (age >= 19);
});

console.log('2. Is everyone 19 or older?')
console.log(areAdults);
document.getElementById('exercise2').innerText = areAdults;


// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
const comment = comments.find(comment => comment.id === 823423);
console.log('3.Find the comment with the ID of 823423');
console.log(comment);
document.getElementById('exercise3').innerText = 'ID: ' + comment.id + '. Text: ' + comment.text;


// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423

const index = comments.findIndex(comment => comment.id === 823423);
const newComments = [...comments.slice(0, index), ...comments.slice(index + 1, comments.length)];

console.log('4.Find the comment with the ID 823423 and delete it');
console.log('Old');
console.table(comments);
console.log('New');
console.table(newComments);

createTable(comments, 'exercise4a');
createTable(newComments, 'exercise4b');

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement('th');
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function createTable(arr, elementIdToAppend) {
    let table = document.createElement('table');
    let headers = Object.keys(arr[0]);
    generateTableHead(table, headers);
    for (let object of arr) {
        table.insertRow();
        for (let cell of Object.values(object)) {
            let newCell = table.rows[table.rows.length - 1].insertCell();
            newCell.textContent = cell;
        }
    }
    document.getElementById(elementIdToAppend).appendChild(table);
}