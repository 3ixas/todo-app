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

// This gets the todos from local storage so they persist after the page reloads
let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");