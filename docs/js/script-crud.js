"use strict";
let estadoInicial = {
    tarefas: JSON.parse(localStorage.getItem("tarefas") || "[]"),
    tarefaSelecionada: null,
};
function selecionarTarefa(estado, tarefa) {
    return {
        ...estado,
        tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa,
    };
}
atualizarUI();
function atualizarUI() {
    const ulTarefas = document.querySelector(".app__section-task-list");
    const paragrafoDescricaoTarefa = document.querySelector(".app__section-active-task-description");
    if (!ulTarefas)
        throw new Error("HTMLUListElement(ulTarefas) não encontrado!");
    ulTarefas.innerHTML = "";
    if (paragrafoDescricaoTarefa) {
        paragrafoDescricaoTarefa.textContent = estadoInicial.tarefaSelecionada
            ? estadoInicial.tarefaSelecionada.descricao
            : "";
    }
    estadoInicial.tarefas.forEach((tarefa) => {
        const li = document.createElement("li");
        li.classList.add("app__section-task-list-item");
        if (tarefa.concluida) {
            li.classList.add("app__section-task-list-item-complete");
        }
        if (tarefa === estadoInicial.tarefaSelecionada) {
            li.classList.add("app__section-task-list-item-active");
        }
        li.innerHTML = `
      <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
          <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
      </svg>
      <p class="app__section-task-list-item-description">${tarefa.descricao}</p>
      <button class="app_button-edit" ${tarefa.concluida ? "disabled" : ""}>
          <img src="/imagens/edit.png">
      </button>
    `;
        li.addEventListener("click", () => {
            if (!tarefa.concluida) {
                estadoInicial = selecionarTarefa(estadoInicial, tarefa);
                atualizarUI();
            }
        });
        const btnEdit = li.querySelector(".app_button-edit");
        btnEdit.addEventListener("click", (event) => {
            event.stopPropagation();
            const novaDescricao = prompt("Digite a nova descrição da tarefa:");
            if (novaDescricao && novaDescricao.trim() !== "") {
                tarefa.descricao = novaDescricao;
                localStorage.setItem("tarefas", JSON.stringify(estadoInicial.tarefas));
                atualizarUI();
            }
        });
        ulTarefas.append(li);
    });
    return;
}
