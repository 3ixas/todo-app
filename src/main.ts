import "../styles/main.scss";

// Selecting the DOM elements
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// This gets the todos from local storage so they remain after the page reloads
let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

// this function will render the todos
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.classList.add("todo__item");
        li.innerHTML = `
            <span>${todo.text}</span>
            <button data-id="${todo.id}" class="todo__delete">❌</button>
        `;
        todoList.appendChild(li);
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}