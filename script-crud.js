const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

atualizarTarefas();

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
    return;
});

formAdicionarTarefa.addEventListener('submit', (event) => {
    event.preventDefault();

    const tarefa = {
        descricao: textarea.value
    };
    tarefas.push(tarefa);

    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    formAdicionarTarefa.reset();
    formAdicionarTarefa.classList.add('hidden');
    return;
});

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');
    li.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    <p class="app__section-task-list-item-description">
        ${tarefa.descricao}
    </p>
    <button class="app_button-edit">
        <img src="/imagens/edit.png">
    </button>
    `;
    return li;
};

function atualizarTarefas() {
    for (const tarefa of tarefas) {
        const elementoTarefa = criarElementoTarefa(tarefa);
        ulTarefas.append(elementoTarefa);
    };
    return; 
};