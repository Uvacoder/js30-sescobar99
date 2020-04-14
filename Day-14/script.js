console.warn('First element will be the original and the second one the copy');
// start with strings, numbers and booleans
console.warn('The booleans, string and numbers are copied');

let bool1 = true;
let bool2 = bool1;
console.log('Before :', bool1, bool2);
bool1 = false;
console.log('After :', bool1, bool2);

let age = 150;
let age2 = age;
console.log('Before :', age, age2);
age = 300;
console.log('After :', age, age2);

let name = 'Santiago';
let name2 = name;
console.log('Before :', name, name2);
name = 'Escobar';
console.log('After :', name, name2);

// Let's say we have an array

const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
// and we want to make a copy of it.
const team = players;

console.warn('While arrays are referenced');
console.log('Oh nooo');
console.log('Before :', players, team);
// You might think we can just do something like this:
team[3] = 'Lux';
// however what happens when we update that array?
console.log('After :', players, team);
// now here is the problem!
// oh no - we have edited the original array too!
// Why? It's because that is an array reference, not an array copy. They both point to the same array!
// So, how do we fix this? We take a copy instead!

const team2 = players.slice();
console.log('Solve it with Array.slice()');
console.log('Before :', players, team2);
team2[3] = 'team2';
console.log('After :', players, team2);

// or create a new array and concat the old one in
const team3 = [].concat(players);
console.log('Solve it concating the old one to an empty array');
console.log('Before :', players, team3);
team3[3] = 'team3';
console.log('After :', players, team3);

// one way
const team4 = Array.from(players);
console.log('Solve it with Array.from()');
console.log('Before :', players, team4);
team4[3] = 'team4';
console.log('After :', players, team4);

// or use the new ES6 Spread
const team5 = [...players];
console.log('Solve it spreading the array');
console.log('Before :', players, team5);
team5[3] = 'team5';
console.log('After :', players, team5);

// now when we update it, the original one isn't changed

console.warn('Same goes for Objects');
// The same thing goes for objects, let's say we have a person object
// with Objects
const person = {
    name: 'Santiago Escobar',
    age: 12
};

// and think we make a copy:
const cap1 = person;
console.log('Before :', person, cap1);
cap1.age = 40;
console.log('After :', person, cap1);


// how do we take a copy instead?
console.log('Copy made using Object.assing({}, oldObject,{new/changed properties})');
const cap2 = Object.assign({}, person, { age: 99 })
console.log('After :', person, cap2);

// We will hopefully soon see the object ...spread
console.log('Copy made using Object spread');
const cap3 = { ...person };
console.log('Before :', person, cap3);
cap3.name = 'spread'
console.log('After :', person, cap3);


// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.

console.warn('Sadly this is a shallow copy, it only makes a 1 level deep copy');

const sec = {
    name: 'Santiago',
    age: 50,
    social: {
        twitter: '@sec',
        facebook: 'sec.developer'
    }
};

// console.clear();
console.log('Before copy', sec);

const dev = Object.assign({}, sec, { name: 'New name' });

console.log('After copy', sec, dev);
console.log('A deeper level', sec.social, dev.social);
dev.social.twitter = '@new';
console.log('After changing only one of the objects', sec.social, dev.social);
console.log(sec, dev);

console.warn('A solution is the "Poor man´s deep clone" although is not really recommended');
const dev2 = JSON.parse(JSON.stringify(sec));
dev2.social.twitter = '@poorman´s';
dev2.name = 'Poor man´s'
console.log('After changing only one of the objects', sec.social, dev2.social);
console.log(sec, dev2);