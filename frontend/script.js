const API_URL = "http://localhost:8080/api/tasks";
let currentFilter = "all";
let allTasks = [];

const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-btn");

// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

async function loadTasks() {
    const res = await fetch(API_URL);
    allTasks = await res.json();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    let filtered = allTasks;
    if (currentFilter === "pending") {
        filtered = allTasks.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
        filtered = allTasks.filter(t => t.completed);
    }

    // Sort by deadline, soonest first
    filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    if (filtered.length === 0) {
        taskList.innerHTML = "<p>No tasks here.</p>";
        return;
    }

    filtered.forEach(task => {
        const div = document.createElement("div");
        div.className = `task priority-${task.priority} ${task.completed ? "completed" : ""}`;

        div.innerHTML = `
            <div class="task-info">
                <h3>${task.title}</h3>
                <p><strong>${task.subject}</strong> — due ${task.deadline}</p>
                <p>${task.description || ""}</p>
            </div>
            <div class="task-actions">
                <button onclick="toggleComplete(${task.id}, ${task.completed})">
                    ${task.completed ? "Undo" : "Done"}
                </button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(div);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newTask = {
        title: document.getElementById("title").value,
        subject: document.getElementById("subject").value,
        description: document.getElementById("description").value,
        deadline: document.getElementById("deadline").value,
        priority: document.getElementById("priority").value,
        completed: false
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
    });

    form.reset();
    loadTasks();
});

async function toggleComplete(id, currentStatus) {
    const task = allTasks.find(t => t.id === id);
    task.completed = !currentStatus;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });

    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadTasks();
}

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});