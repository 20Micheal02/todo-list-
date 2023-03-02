const form = document.getElementById("add-task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("tasks");

let tasks = [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.className = "my-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("click", () => {
      deleteTaskWithAnimation(index, taskElement);
    });

    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.innerText = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      deleteTask(index);
    });

    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
      editTask(index);
    });

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");
    taskActions.appendChild(editButton);

    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(taskActions);

    taskList.appendChild(taskElement);
  });
}

// Add task
function addTask(text) {
  const newTask = {
    text: text,
    completed: false,
  };

  tasks.push(newTask);
  renderTasks();
}

// delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// edit task
function editTask(index) {
  const task = tasks[index];
  const newText = prompt("Введите новый текст задачи:", task.text);

  if (newText !== null) {
    task.text = newText;
    renderTasks();
  }
}

function toggleTaskCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// animation checkbox
function deleteTaskWithAnimation(index, taskElement) {
  taskElement.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 500,
    easing: "ease-out",
    fill: "forwards",
  }).onfinish = () => {
    deleteTask(index);
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
    taskInput.focus();
  }
});

renderTasks();