// Selector
const todoInput     = document.querySelector(".todo-input");
const todoButton    = document.querySelector(".todo-button");
const todoList      = document.querySelector(".todo-list");
const filterOption  = document.querySelector(".filter-todo");

// Event Listeners todo
todoButton.addEventListener('click', addTodo);

// Functions
function addTodo(event){
    event.preventDefault();
    // todo div 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // saving to local storage
    saveLocalTodos(todoInput.value);
    // submit button
    const completedButton       = document.createElement('button');
    completedButton.innerHTML   = '<i class="far fa-check-square"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // delete button
    const deleteButton       = document.createElement('button');
    deleteButton.innerHTML   = '<i class="far fa-trash-alt"></i>';
    deleteButton.classList.add("remove-btn");
    todoDiv.appendChild(deleteButton);

    // append to list
    todoList.appendChild(todoDiv);

    // clear todo input val
    todoInput.value = "";
}


// event listener delete/add 

todoList.addEventListener('click', deleteCheck);

// function 

function deleteCheck(e){
const item = e.target;

// delete button teleting 

    if(item.classList[0] === 'remove-btn'){

        const todo = item.parentElement;
        // animate
        todo.classList.add("fall");
        // local storage remove
        removeLocalTodos(todo);
        // after animate remove
        todo.addEventListener("transitioned", function(){
            todo.remove();
        });
        
    }

//  submite check button 

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

//  event listener for select options in filter 

filterOption.addEventListener("click", filterTodo);

// select list functions 

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
      }
    });
  }


//   local storage event listener 
document.addEventListener("DOMContentLoaded", getTodos);

// local storage functon 

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check-square"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;
      deleteButton.classList.add("remove-btn");
      todoDiv.appendChild(deleteButton);
      //attach final Todo
      todoList.appendChild(todoDiv);
    });
  }
