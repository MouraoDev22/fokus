interface Task {
  description: string;
  completed: boolean;
}

interface ApplicationState {
  tasks: Task[];
  selectedTask: Task | null;
}

let initialState: ApplicationState = {
  tasks: JSON.parse(localStorage.getItem("tarefas") || "[]"),
  selectedTask: null,
};

function selectTask(state: ApplicationState, task: Task): ApplicationState {
  return {
    ...state,
    selectedTask: task === state.selectedTask ? null : task,
  };
}

updateUI();

function updateUI(): void {
  const ulTasks: HTMLUListElement | null =
    document.querySelector<HTMLUListElement>(".app__section-task-list");
  const taskDescriptionParagraph = document.querySelector<HTMLParagraphElement>(
    ".app__section-active-task-description",
  );

  if (!ulTasks) throw new Error("HTMLUListElement(ulTasks) não encontrado!");

  ulTasks.innerHTML = "";

  if (taskDescriptionParagraph) {
    taskDescriptionParagraph.textContent = initialState.selectedTask
      ? initialState.selectedTask.description
      : "";
  }

  initialState.tasks.forEach((task: Task) => {
    const li = document.createElement("li");
    li.classList.add("app__section-task-list-item");

    if (task.completed) {
      li.classList.add("app__section-task-list-item-complete");
    }

    if (task === initialState.selectedTask) {
      li.classList.add("app__section-task-list-item-active");
    }

    li.innerHTML = `
      <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
          <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
      </svg>
      <p class="app__section-task-list-item-description">${task.description}</p>
      <button class="app_button-edit" ${task.completed ? "disabled" : ""}>
          <img src="/imagens/edit.png">
      </button>
    `;

    li.addEventListener("click", () => {
      if (!task.completed) {
        initialState = selectTask(initialState, task);
        updateUI();
      }
    });

    const editButton = li.querySelector(
      ".app_button-edit",
    ) as HTMLButtonElement;
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const newDescription = prompt("Digite a nova descrição da tarefa:");
      if (newDescription && newDescription.trim() !== "") {
        task.description = newDescription;
        localStorage.setItem("tarefas", JSON.stringify(initialState.tasks));
        updateUI();
      }
    });

    ulTasks.append(li);
  });

  return;
}
