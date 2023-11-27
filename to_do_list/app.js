const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
eventListener();
function eventListener() {
  //Submit event
  form.addEventListener("submit", addNewItem);
  //delete an item
  taskList.addEventListener("click", deleteItem);
  //delete an items
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function addNewItem(e) {
  // console.log("submit");
  // console.log(input.value);

  if (input.value === "") {
    alert("add new item");
  } else {
    createItem(input.value);
    setItemToLS(input.value);
  }

  //   const li = document.createElement("li");
  //   li.className = "list-group-item list-group-item-secondary";
  //   li.appendChild(document.createTextNode(input.value));

  //   const a = document.createElement("a");
  //   a.classList = "delete-item float-right";
  //   a.setAttribute("href", "#");
  //   a.innerHTML = '<i class="fas fa-times"></i>';

  //   // add a to li
  //   li.appendChild(a);

  //   //add li to ul
  //   taskList.appendChild(li);
  //   console.log(li);

  input.value = ""; //  yazdırdıktan sonra boş bırakması için
  //save to local storage

  e.preventDefault();
}

//DELETE AN İTEM
function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    if (confirm("emin misiniz ?")) {
      e.target.parentElement.parentElement.remove();
      
    }
  }
  e.preventDefault();
}
//delete all items
function deleteAllItems(e) {

  if (confirm("emin misiniz ?")) {
    taskList.innerHTML='';

    localStorage.clear();

  }
  e.preventDefault();
}

//delete item from localStorage
function deleteItemFromLS(text){
    items=getItemsFromLS();
    
    items.forEach(function(item,index){
        if(item==text){
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));//localStorage de silmek için

}

function createItem(text) {
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  // li.appendChild(document.createTextNode(input.value));
  li.appendChild(document.createTextNode(text));

  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  // add a to li
  li.appendChild(a);

  //add li to ul
  taskList.appendChild(li);
  console.log(li);
//   input.value = ""; //  yazdırdıktan sonra boş bırakması için
}
// burdn bilgileri girerek direk gelmesini sağlama
// const items = ["item 1", "item 2", "item 3"];
// //load items
// loadItems();
// function loadItems() {
//   items.forEach(function (item) {
//     createItem(item);
//   });
// }

let items;
loadItems();
function loadItems() {
  items = getItemsFromLS();
  items.forEach(function (item) {
    createItem(item);
  });
}
// get items from local storage
function getItemsFromLS() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}
// set item from local storage
function setItemToLS(text) {
  items = getItemsFromLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}
