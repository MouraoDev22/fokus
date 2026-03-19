interface Tarefa {
    descricao: string;
    concluida: boolean;
};

interface EstadoAplicacao {
    tarefas: Tarefa[];
    tarefaSelecionada: Tarefa | null;
};

let estado: EstadoAplicacao = {
    tarefas: JSON.parse(localStorage.getItem('tarefas') || '[]'),
    tarefaSelecionada: null
};

function selecionarTarefa(estado: EstadoAplicacao, tarefa: Tarefa): EstadoAplicacao {

    return {
        ...estado,
        tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa
    };
};