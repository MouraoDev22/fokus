"use strict";
let state = {
    tasks: JSON.parse(localStorage.getItem("tarefas") || "[]"),
    selectedTask: null,
};
let selectedTaskElement = null;
document.addEventListener("DOMContentLoaded", () => {
    updateTasks();
    crudAddEventListeners();
    return;
});
function createTaskElement(task) {
    const taskDescriptionParagraph = document.querySelector(".app__section-active-task-description");
    if (!taskDescriptionParagraph) {
        throw new Error("HTMLParagraphElement(taskDescriptionParagraph) não encontrado!");
    }
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
        <img src="./assets/imagens/edit.png">
    </button>
    `;
    if (task.completed) {
        li.classList.add("app__section-task-list-item-complete");
        const button = li.querySelector("button");
        if (button) {
            button.setAttribute("disabled", "true");
        }
    }
    else {
        li.addEventListener("click", () => {
            state = selectTask(state, task);
            console.log(state.selectedTask);
            if (state.selectedTask === task) {
                taskDescriptionParagraph.textContent = task.description;
                selectedTaskElement = li;
                document
                    .querySelectorAll(".app__section-task-list-item")
                    .forEach((element) => {
                    element.classList.remove("app__section-task-list-item-active");
                    return;
                });
                li.classList.add("app__section-task-list-item-active");
            }
            else {
                taskDescriptionParagraph.textContent = "";
                li.classList.remove("app__section-task-list-item-active");
                selectedTaskElement = null;
            }
            return;
        });
    }
    const editButton = li.querySelector(".app_button-edit");
    if (editButton) {
        editButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const newDescription = prompt("Digite a nova descrição da tarefa:");
            if (!newDescription || newDescription.trim() === "") {
                return;
            }
            const taskIndex = state.tasks.findIndex((t) => t === task);
            if (taskIndex > -1) {
                state.tasks[taskIndex].description = newDescription;
                const taskDescriptionElement = li.querySelector(".app__section-task-list-item-description");
                if (taskDescriptionElement) {
                    taskDescriptionElement.textContent = newDescription;
                }
                if (state.selectedTask === task) {
                    taskDescriptionParagraph.textContent = newDescription;
                }
                saveTasks();
            }
            return;
        });
    }
    if (state.selectedTask === task) {
        li.classList.add("app__section-task-list-item-active");
        taskDescriptionParagraph.textContent = task.description;
        selectedTaskElement = li;
    }
    return li;
}
function updateTasks() {
    const tasksList = document.querySelector(".app__section-task-list");
    if (!tasksList) {
        throw new Error("HTMLUListElement(tasksList) não encontrado!");
    }
    tasksList.innerHTML = "";
    if (state.selectedTask && !state.tasks.includes(state.selectedTask)) {
        state.selectedTask = null;
        selectedTaskElement = null;
        const taskDescriptionParagraph = document.querySelector(".app__section-active-task-description");
        if (taskDescriptionParagraph) {
            taskDescriptionParagraph.textContent = "";
        }
    }
    for (const task of state.tasks) {
        const taskElement = createTaskElement(task);
        tasksList.append(taskElement);
    }
    return;
}
function saveTasks() {
    localStorage.setItem("tarefas", JSON.stringify(state.tasks));
    return;
}
function removeTasks(onlyCompleted) {
    const selector = onlyCompleted
        ? ".app__section-task-list-item-complete"
        : ".app__section-task-list-item";
    document.querySelectorAll(selector).forEach((element) => {
        element.remove();
        return;
    });
    state.tasks = onlyCompleted
        ? state.tasks.filter((task) => !task.completed)
        : [];
    if (state.selectedTask && !state.tasks.includes(state.selectedTask)) {
        state.selectedTask = null;
        selectedTaskElement = null;
        const taskDescriptionParagraph = document.querySelector(".app__section-active-task-description");
        if (taskDescriptionParagraph) {
            taskDescriptionParagraph.textContent = "";
        }
    }
    saveTasks();
    updateTasks();
    return;
}
function crudAddEventListeners() {
    const addTaskButton = document.querySelector(".app__button--add-task");
    const addTaskForm = document.querySelector(".app__form-add-task");
    const textarea = document.querySelector(".app__form-textarea");
    const tasksList = document.querySelector(".app__section-task-list");
    const removeCompletedTasksButton = document.querySelector("#btn-remover-concluidas");
    const removeAllTasksButton = document.querySelector("#btn-remover-todas");
    if (!addTaskButton) {
        throw new Error("HTMLButtonElement(addTaskButton) não encontrado.");
    }
    if (!addTaskForm) {
        throw new Error("HTMLFormElement(addTaskForm) não encontrado.");
    }
    if (!textarea) {
        throw new Error("HTMLTextAreaElement(textarea) não encontrado.");
    }
    if (!tasksList) {
        throw new Error("HTMLUListElement(tasksList) não encontrado.");
    }
    if (!removeCompletedTasksButton) {
        throw new Error("HTMLButtonElement(removeCompletedTasksButton) não encontrado.");
    }
    if (!removeAllTasksButton) {
        throw new Error("HTMLButtonElement(removeAllTasksButton) não encontrado.");
    }
    addTaskButton.addEventListener("click", () => {
        addTaskForm.reset();
        addTaskForm.classList.toggle("hidden");
        return;
    });
    addTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        state = addTask(state, textarea.value);
        updateTasks();
        saveTasks();
        addTaskForm.reset();
        addTaskForm.classList.add("hidden");
        return;
    });
    removeCompletedTasksButton.addEventListener("click", () => {
        removeTasks(true);
        return;
    });
    removeAllTasksButton.addEventListener("click", () => {
        removeTasks(false);
        return;
    });
    document.addEventListener("FocoFinalizado", () => {
        if (state.selectedTask && selectedTaskElement) {
            selectedTaskElement.classList.remove("app__section-task-list-item-active");
            selectedTaskElement.classList.add("app__section-task-list-item-complete");
            const button = selectedTaskElement.querySelector("button");
            if (button) {
                button.setAttribute("disabled", "true");
            }
            const taskIndex = state.tasks.findIndex((t) => t === state.selectedTask);
            if (taskIndex > -1) {
                state.tasks[taskIndex].completed = true;
            }
            saveTasks();
            state = { ...state, selectedTask: null };
            const taskDescriptionParagraph = document.querySelector(".app__section-active-task-description");
            if (taskDescriptionParagraph) {
                taskDescriptionParagraph.textContent = "";
            }
            selectedTaskElement = null;
        }
        return;
    });
    return;
}
function selectTask(state, task) {
    return {
        ...state,
        selectedTask: task === state.selectedTask ? null : task,
    };
}
function addTask(state, description) {
    const newTask = {
        description,
        completed: false,
    };
    return {
        ...state,
        tasks: [...state.tasks, newTask],
    };
}
