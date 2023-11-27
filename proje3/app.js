const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCard = document.querySelectorAll(".card-body")[0];
const secondCard = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();
function eventListeners() {

    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI)
    todoList.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodas);

    clearButton.addEventListener("click", clearAllTodos);

}
function clearAllTodos(e) {
    if (confirm("tümünü silmekte emin misiniz?")) {
        // Aarayüzden todoları temizleme
        // todoList.innerHTML =" ";// yavaş
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todo");
    }
}


function filterTodas(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display:none  !important");
        } else {
            listItem.setAttribute("style", "display", "block")
        }
    });

}
function deleteTodo(e) {
    // console.log(e.target);

    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        showAlert("success", "Todo başarıyla silindi...");
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    }

}

function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStroge();

    todos.forEach(function (todo, index) {

        if (todo === deletetodo) {
            todos.splice(index, 1);

        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));

}

function loadAllTodosToUI() {
    let todos = getTodosFromStroge();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}

function addTodo(e) {

    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        //showAlert(type,message)
        showAlert("danger", "Lütfen bir değer giriniz...");
    }
    else {
        addTodoToUI(newTodo);
        showAlert("success", "todoya başarıyla ekldiniz.");
        addTodoStrage(newTodo);
    }
    // addTodoToUI(newTodo);
    e.preventDefault();
}

function getTodosFromStroge() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoStrage(newTodo) {
    let todos = getTodosFromStroge();

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert -${type}`;
    alert.textContent = message;
    //  console.log(alert);
    firstCard.appendChild(alert);
    // set Timeout

    setTimeout(function () {
        alert.remove();
    }, 1000);

}
function addTodoToUI(newTodo) {
    /*
<li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
    */
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";
    // text node eklemek için 
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    console.log(listItem);
    todoInput.value = "";


}