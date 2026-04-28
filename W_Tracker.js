let tasks = [];

function addTask() {
    const taskName = document.getElementById("taskName").value;
    const category = document.getElementById("category").value;

    tasks.push({ name: taskName, category: category });
    displayTasks();
    clearForm();
}

function displayTasks() {
    const categoryFilter = document.getElementById("categoryList").querySelector(".active").innerText;

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        if (categoryFilter === "All" || task.category === categoryFilter) {
            const li = document.createElement("li");
            li.textContent = `${task.name} - ${task.category}`;
            taskList.appendChild(li);
        }
    });
}

function clearForm() {
    document.getElementById("taskForm").reset();
}

function loadTasks(category) {
    const categoryList = document.getElementById("categoryList").querySelectorAll("li");

    categoryList.forEach(item => {
        item.classList.remove("active");
        if (item.innerText === category) {
            item.classList.add("active");
        }
    });

    displayTasks();
}

// Initial load with "All" category selected
loadTasks("All");
