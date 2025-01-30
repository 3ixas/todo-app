import "../styles/main.scss";

// Selecting the DOM elements

// Selects the todo form from the HTML using its ID
const todoForm = document.getElementById("todo-form") as HTMLFormElement;

// Selects the input field where users type new todos
const todoInput = document.getElementById("todo-input") as HTMLInputElement;

// Selects the unordered list where the todos will be displayed
const todoList = document.getElementById("todo-list") as HTMLUListElement;

// Defines a TS interface for a todo item
interface Todo {
    id: number; // Unique identifier for each todo
    text: string; // The todo next entered by the user
    completed: boolean; // Boolean to track whether the todo is completed or not
}

// This will retireve todos from the local storage (if they are available), otherwise, an empty array will be created
// JSON.parse() converts the stored JSON string back into a JS/TS array
let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

// this function will render the todos
function renderTodos() {

    // This clears the current list to prevent duplicate entries before re-rendering anything
    todoList.innerHTML = "";

    // Loops through each todo in the todos array
    todos.forEach((todo) => {
        // Creates a new list item ('li') for the todo
        const li = document.createElement("li");
        li.classList.add("todo__item"); // Adds the SCSS styling
        // Sets the inner HTML of the list item to display the todo text and a delete button 
        li.innerHTML = `
            <span>${todo.text}</span>
            <button data-id="${todo.id}" class="todo__delete">❌</button>
        `;

        // Appends the newly created todo item to the todo list
        todoList.appendChild(li);
    });

    // Saves the updated todos array to local storage
    // JSON.stringify() converts the array into a JSON string for storage
    localStorage.setItem("todos", JSON.stringify(todos));
}

// This will handle adding a todo
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = todoInput.value.trim();
    if (text === "") return;

    const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
    };

    todos.push(newTodo);
    todoInput.value = "";
    renderTodos();
});