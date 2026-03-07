const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

atualizarTarefas();

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.reset();
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
    
    salvarTarefas();
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

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        li.querySelector('button').setAttribute('disabled', 'true');
    } else {
        li.addEventListener('click', () => {
            if (tarefaSelecionada === tarefa) {
                li.classList.remove('app__section-task-list-item-active');
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            };
            
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            
            document.querySelectorAll('.app__section-task-list-item').forEach((elemento) => {
                elemento.classList.remove('app__section-task-list-item-active');
            });
    
            li.classList.add('app__section-task-list-item-active');
            return;
        });
    };

    li.querySelector('.app_button-edit').addEventListener('click', () => {
        const novaDescricao = prompt('Digite a nova descrição da tarefa:');
        
        if (!novaDescricao || novaDescricao.trim() === '') {
            return;
        };

        tarefa.descricao = novaDescricao;
        li.querySelector('.app__section-task-list-item-description').textContent = novaDescricao;
        salvarTarefas();
        return; 
    });
    return li;
};

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'true');

        tarefaSelecionada.completa = true;
        salvarTarefas();
    };
    return;
});

function atualizarTarefas() {
    for (const tarefa of tarefas) {
        const elementoTarefa = criarElementoTarefa(tarefa);
        ulTarefas.append(elementoTarefa);
    };
    return; 
};

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    return;
};