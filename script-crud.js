const addTaskButton = document.querySelector(".app__button--add-task");
const addTaskForm = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const tasksList = document.querySelector(".app__section-task-list");
const taskDescriptionParagraph = document.querySelector(
  ".app__section-active-task-description",
);

const removeCompletedTasksButton = document.querySelector(
  "#btn-remover-concluidas",
);
const removeAllTasksButton = document.querySelector("#btn-remover-todas");

let tasks = JSON.parse(localStorage.getItem("tarefas")) || [];
let selectedTask = null;
let selectedTaskElement = null;

updateTasks();

addTaskButton.addEventListener("click", () => {
  addTaskForm.reset();
  addTaskForm.classList.toggle("hidden");
  return;
});

addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = {
    description: textarea.value,
  };
  tasks.push(task);

  const taskElement = createTaskElement(task);
  tasksList.append(taskElement);

  saveTasks();
  addTaskForm.reset();
  addTaskForm.classList.add("hidden");
  return;
});

removeCompletedTasksButton.addEventListener("click", () => {
  removeTasks(true);
});

removeAllTasksButton.addEventListener("click", () => {
  removeTasks(false);
});

document.addEventListener("FocoFinalizado", () => {
  if (selectedTask && selectedTaskElement) {
    selectedTaskElement.classList.remove("app__section-task-list-item-active");
    selectedTaskElement.classList.add("app__section-task-list-item-complete");
    selectedTaskElement
      .querySelector("button")
      .setAttribute("disabled", "true");

    selectedTask.completed = true;
    saveTasks();
  }
  return;
});

function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");
  li.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    <p class="app__section-task-list-item-description">
        ${task.description}
    </p>
    <button class="app_button-edit">
        <img src="/imagens/edit.png">
    </button>
    `;

  if (task.completed) {
    li.classList.add("app__section-task-list-item-complete");
    li.querySelector("button").setAttribute("disabled", "true");
  } else {
    li.addEventListener("click", () => {
      if (selectedTask === task) {
        li.classList.remove("app__section-task-list-item-active");
        taskDescriptionParagraph.textContent = "";
        selectedTask = null;
        selectedTaskElement = null;
        return;
      }

      taskDescriptionParagraph.textContent = task.description;
      selectedTask = task;
      selectedTaskElement = li;

      document
        .querySelectorAll(".app__section-task-list-item")
        .forEach((element) => {
          element.classList.remove("app__section-task-list-item-active");
        });

      li.classList.add("app__section-task-list-item-active");
      return;
    });
  }

  li.querySelector(".app_button-edit").addEventListener("click", () => {
    const newDescription = prompt("Digite a nova descrição da tarefa:");

    if (!newDescription || newDescription.trim() === "") {
      return;
    }

    task.description = newDescription;
    li.querySelector(".app__section-task-list-item-description").textContent =
      newDescription;
    saveTasks();
    return;
  });
  return li;
}

function updateTasks() {
  for (const task of tasks) {
    const taskElement = createTaskElement(task);
    tasksList.append(taskElement);
  }
  return;
}

function saveTasks() {
  localStorage.setItem("tarefas", JSON.stringify(tasks));
  return;
}

function removeTasks(onlyCompleted) {
  const selector = onlyCompleted
    ? ".app__section-task-list-item-complete"
    : ".app__section-task-list-item";
  document.querySelectorAll(selector).forEach((element) => {
    element.remove();
  });

  tasks = onlyCompleted ? tasks.filter((task) => !task.completed) : [];
  saveTasks();

  return;
}
