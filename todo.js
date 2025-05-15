function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const tasks = getTasksFromStorage();
  const incomplete = [];
  const complete = [];

  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('completed');

    // Circle checkbox
    const checkCircle = document.createElement('span');
    checkCircle.classList.add('check-circle');
    if (task.done) checkCircle.classList.add('checked');

    // Task text
    const taskSpan = document.createElement('span');
    taskSpan.classList.add('task-text');
    taskSpan.textContent = task.text;

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.style.marginLeft = '10px';
    removeBtn.onclick = () => {
      const updatedTasks = getTasksFromStorage().filter(t => t.id !== task.id);
      saveTasksToStorage(updatedTasks);
      renderTasks();
    };

    // Toggle completion
    checkCircle.addEventListener('click', () => {
      const updatedTasks = getTasksFromStorage().map(t => {
        if (t.id === task.id) {
          return { ...t, done: !t.done };
        }
        return t;
      });
      saveTasksToStorage(updatedTasks);
      renderTasks();
    });

    li.appendChild(checkCircle);
    li.appendChild(taskSpan);
    li.appendChild(removeBtn);

    if (task.done) complete.push(li);
    else incomplete.push(li);
  });

  [...incomplete, ...complete].forEach(li => taskList.appendChild(li));
}

function addTask() {
  const taskInput = document.getElementById('newTask');
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const tasks = getTasksFromStorage();
  const newTask = {
    id: Date.now(), // <-- Unique ID
    text: taskText,
    done: false
  };
  tasks.push(newTask);
  saveTasksToStorage(tasks);
  renderTasks();
  taskInput.value = '';
}

// Load tasks on page load
window.addEventListener('DOMContentLoaded', renderTasks);
