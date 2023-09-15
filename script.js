let completedCount = 0; // Counter for completed todos
const checkboxes = []; // Array to hold all checkboxes

// Function to check or uncheck all checkboxes
function checkUncheckAll(checked) {
    checkboxes.forEach(checkbox => {
        checkbox.checked = checked;
        if (checked) {
            completedCount = checkboxes.length; // Update completedCount for all checked
        } else {
            completedCount = 0; // Reset completedCount for all unchecked
        }
    });

    // Check if 5 todos are completed after checking/unchecking all
    if (completedCount === 5) {
        showCongratsAlert(completedCount);
    }
}

// Event listener for the Check/Uncheck All button
document.getElementById('checkUncheckButton').addEventListener('click', function () {
    const firstCheckbox = checkboxes[0]; // Get the first checkbox to determine the state

    // Determine whether to check or uncheck based on the state of the first checkbox
    const isChecked = firstCheckbox.checked;
    checkUncheckAll(!isChecked);
});


// validation 
function validate() {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
    
        // Check if username and password are correct
        if (username === 'admin' && password === '12345') {
            location.replace("./home.html");
        } else {
            document.getElementById("loginError").innerHTML = 'Invalid credentials. Please try again.';
        }
    });
}

// Fetch Todo List from API using Promises
function fetchTodoList() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            // Display todos
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = '<h2>Tasks</h2>';
            data.forEach(todo => {
                const todoItem = document.createElement('div');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.completed;
                checkbox.addEventListener('change', function () {
                    if (checkbox.checked) {
                        completedCount++;
                    } else {
                        completedCount--;
                    }

                    // Check if 5 todos are completed
                    if (completedCount === 5) {
                        showCongratsAlert(completedCount); 
                    }
                });
                checkboxes.push(checkbox);
                const label = document.createElement('label');
                label.textContent = todo.title;

                todoItem.appendChild(checkbox);
                todoItem.appendChild(label);
                todoList.appendChild(todoItem);
            });
        })
        .catch(error => console.error('Error fetching todo list:', error));
}


// Function to show congrats alert
function showCongratsAlert(completedCount) {
    alert(`Congrats. ${completedCount} Tasks have been Successfully Completed`);
}











