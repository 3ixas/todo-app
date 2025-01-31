import "../styles/main.scss";

// ---------- SELECTING THE DOM ELEMENTS ----------

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

// --------- RENDERING TODOS ----------

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

// ------- ADDING NEW TODOS --------

// This will handle adding a todo
todoForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents the default form submission behaviour of refreshing the page

    // Gets the value from the input field and trims any extra spaces
    const text = todoInput.value.trim();

    // Exits the function to prevent adding blank todos if the todo input is empty
    if (text === "") return;

    // Creates a new todo object based on the defined interface for Todo
    const newTodo: Todo = {
        id: Date.now(), // Creates a unique ID using the current time
        text, // Adds the input text from the user to the todo
        completed: false, // Setting a default value, not using it just yet
    };

    // This will add the new todo to the todo array
    todos.push(newTodo);

    // After the todo has been added, this will reset the input back to blank for the next todo to be added
    todoInput.value = "";

    // Re-renders the todo list to be updated with the newly added todo
    renderTodos();
});

// --------- DELETING TODOS ---------

todoList.addEventListener("click", (event) => {
    const target = event.target as HTMLElement; // Gets the clicked element and casts it as a HTML element

    // Checks if the clicked element is the delete button
    if (target.classList.contains("todo__delete")) {
        // Gets the ID of the todo from the button's data-id attribute
        const id = Number(target.getAttribute("data-id"));

        // Removes the todo from the array by filtering out the one with the matching ID
        todos = todos.filter(todo => todo.id !== id);

        // Re-rendering the todo list with the deleted todo removed
        renderTodos();
    }
});
