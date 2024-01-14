const buttonAddInputItem = document.getElementById('buttonAddInputItem');
buttonAddInputItem.addEventListener('click', getItemValueInput);

let arrayItemsToDo = [];
let newArrayItemsToDo = [];

document.addEventListener('keypress', (event) => {
  if (event.charCode === 13) {
    getItemValueInput();
  }
})

function getItemValueInput() {
  let itemInput = document.getElementById('itemInputList');
  if(itemInput.value.length > 0) {
    createItemsElmentsList(itemInput);
    emptyInput(itemInput);
  }
  updateArray();
}

function emptyInput(item) {
  item.value = "";
}

function createItemsElmentsList(itemInput) {
  const itemElementInput = itemInput;
  const containerItemsList = document.getElementById('containerItemsList');

  const div = document.createElement('div');
  const buttonValid = document.createElement('span');
  const newItemToDo = document.createElement('span');
  const buttonRemove = document.createElement('span');

  buttonValid.innerHTML = '';
  buttonValid.title = "Check Done"
  newItemToDo.innerText = itemElementInput.value;
  buttonRemove.innerHTML = '&#x274C;';
  buttonRemove.title = "Delete";

  showItemsElementsList(div, buttonValid, buttonRemove, newItemToDo, containerItemsList);
}

function showItemsElementsList(div, buttonValid, buttonRemove, newItemToDo, containerItemsList) {
  div.classList.add('containerItem');
  buttonValid.classList.add('buttonValid');
  newItemToDo.classList.add('newItemToDo');
  buttonRemove.classList.add('buttonRemove');

  containerItemsList.appendChild(div);
  div.appendChild(buttonValid);
  div.appendChild(newItemToDo);
  div.appendChild(buttonRemove);

  const objectItemList = {
    div,
    buttonValid,
    newItemToDo,
    buttonRemove
  };

  arrayItemsToDo.push(objectItemList);
}

function itemsDone() {
  arrayItemsToDo.filter((item) => {
    item.buttonValid.addEventListener('click', function() {
      item.buttonValid.innerHTML = '&#x2714;';
      item.newItemToDo.style.color = 'black';
      item.newItemToDo.style.textDecoration = 'line-through';
      item.buttonValid.style.backgroundColor = '#0080005e';
    })
    return item;
  })
}

function removeItems() {
  arrayItemsToDo.filter((item, index) => {
    if (item != 0) {
      item.buttonRemove.addEventListener('click', function() {
        item.div.style.display = 'none';
        arrayItemsToDo[index].item = 0;
      })
    }
  })
}

function verificationRemoveItems() {
  arrayItemsToDo.filter((item) => {
    item.buttonRemove.addEventListener('click', function() {
      removeItems();
    })
  })
}

function updateArray() {
  newArrayItemsToDo = arrayItemsToDo.filter((item, index) => {
    return arrayItemsToDo[index].item != 0;
  })
  arrayItemsToDo = newArrayItemsToDo
  if(arrayItemsToDo.length > 0) {
    itemsDone();
    verificationRemoveItems();
  }
}