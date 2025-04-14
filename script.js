const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => createTaskElement(task.text, task.completed));
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);
  taskInput.value = "";
  saveTasks();
}

loadTasks();
