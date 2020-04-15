const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

const checkBtn = document.querySelector('#checkAll');
const uncheckBtn = document.querySelector('#uncheckAll');
const deleteBtn = document.querySelector('#deleteAll');


function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;      
  const item = {
    text: text,
    done: false
  }

  items.push(item);
  populateAndSave();
  this.reset();
}

function populateAndSave() {
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
}

function populateList(elements = [], htmlList) {
  htmlList.innerHTML = elements.map((element, i) => {
    return `
    <li>
      <input type="checkbox" data-index=${i} id="item${i}" ${element.done ? 'checked' : ''} />
      <label for="item${i}">${element.text}</label>
    </li>
      `;
  }).join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) {
    return;
  }
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done
  localStorage.setItem('items', JSON.stringify(items));
}

function checkAll() {
  items.forEach(item => {
    item.done = true;
  });
  populateAndSave();
}
function uncheckAll() {
  items.forEach(item => {
    item.done = false;
  });
  populateAndSave();
}
function deleteAll(e) {
  items.splice(0, items.length);
  populateAndSave();
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList);

checkBtn.addEventListener('click', checkAll);
uncheckBtn.addEventListener('click', uncheckAll);
deleteBtn.addEventListener('click', deleteAll);
