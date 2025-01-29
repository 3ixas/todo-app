# Pseudocode for the Todo List App

## 1. Starting up The App

-   **Load** todos from local storage (if any exist).
-   **Display** greeting based on the time of day.
-   **Fetch and display** a welcome message.
-   **Fetch and display** a random fact.
-   **Render** existing todos to the UI.

## 2. Handle Adding a New Todo

-   **Get** the input value from the user.
-   **If input is empty, prevent adding a new todo.**
-   **Create** a new todo object with:
    -   A unique **ID**.
    -   The **todo text**.
    -   A **completed status**.
-   **Append** the new todo object to the todos array.
-   **Save** the updated array to local storage.
-   **Update** the UI to display the new todo.
-   **Clear** the input field after adding.

## 3. Handle Deleting (Completing) a Todo

-   **Identify** the selected todo based on its **ID**.
-   **Remove** the todo from the array.
-   **Save** the updated array to local storage.
-   **Update** the UI to remove the deleted todo.

## 4. Generate Greeting Based on Time of Day

-   **Get** the current hour using the `Date` object.
-   **Determine** time of day:
    -   **Morning**: 5 AM - 11:59 AM
    -   **Afternoon**: 12 PM - 5:59 PM
    -   **Evening**: 6 PM - 9:59 PM
    -   **Night**: 10 PM - 4:59 AM
-   **Set** a greeting message accordingly:
    -   _"Good morning!"_
    -   _"Good afternoon!"_
    -   _"Good evening!"_
    -   _"Good night!"_
-   **Display** the greeting message in the UI.

## 5. Fetch and Display a Welcome Message

-   **Define** a list of predefined welcome messages.
-   **Select** a random message from the list.
-   **Display** the selected message in the UI.

## 6. Fetch and Display a Random Fact

-   **Choose** an API endpoint.
-   **Make** an API request using `fetch`.
-   **Extract** the relevant text from the API response.
-   **Display** the fact in the UI.

## 7. Update UI Functionality

-   **Function to render todos dynamically:**
    -   **Loop** through the todos array.
    -   **Create** HTML elements for each todo.
    -   **Append** them to the DOM.
    -   **Add** event listeners for deleting/completing todos.
-   **Function to clear and re-render the UI after updates.**

## 8. Save and Retrieve from Local Storage

-   **Function to save** the todos array as a JSON string.
-   **Function to retrieve** stored todos and parse them back into an array.
-   **Call retrieval function** on page load to restore todos.

## 9. Event Listeners

-   **Add** event listener for form submission (adding todos).
-   **Add** event listener for clicking delete/complete buttons.
-   **Add** event listener for window load to initialize the application.
