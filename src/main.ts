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

// ---------- DYNAMIC GREETING FUNCTION -----------

function updateGreeting() {
    const greetingElement = document.querySelector(".header__greeting") as HTMLHeadingElement | null;

    if (!greetingElement) {
        console.error("Error: .header__greeting not found in the DOM.");
        return;
    }

    console.log("Greeting Element Found:", greetingElement); // Debugging

    const hour = new Date().getHours();
    console.log("Current Hour:", hour); // Debugging

    let greeting = "Good Morning!";

    if (hour >= 12 && hour < 18) {
        greeting = "Good Afternoon!";
    } else if (hour >= 18 || hour < 5) {
        greeting = "Good Evening!";
    }

    greetingElement.textContent = greeting;
}

// Run this function only after DOM is fully loaded
document.addEventListener("DOMContentLoaded", updateGreeting);

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

        // Applies completed styling if the todo is marked as completed
        if (todo.completed) {
            li.classList.add("todo__item--completed")
        }

        // Sets the inner HTML of the list item to display the todo text and a delete button 
        li.innerHTML = `
            <input type="checkbox" class="todo__checkbox" data-id="${todo.id}" ${todo.completed ? "checked" : ""}>
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

// Event listener to mark todos as completed
todoList.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    // Check if the clicked element is a checkbox
    if (target.classList.contains("todo__checkbox")) {
        const id = Number(target.getAttribute("data-id"));
        const todo = todos.find((t) => t.id === id);
        if (todo) {
            todo.completed = !todo.completed; // toggles the completed status
            renderTodos();
        }
    }
})

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

// Now that todos can be added and deleted, this will create the up to date list when the page loads
renderTodos();

// Updates the greeting when the page loads
updateGreeting();
