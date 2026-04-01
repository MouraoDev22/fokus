interface Tarefa {
  descricao: string;
  concluida: boolean;
}

interface EstadoAplicacao {
  tarefas: Tarefa[];
  tarefaSelecionada: Tarefa | null;
}

let estadoInicial: EstadoAplicacao = {
  tarefas: JSON.parse(localStorage.getItem("tarefas") || "[]"),
  tarefaSelecionada: null,
};

function selecionarTarefa(
  estado: EstadoAplicacao,
  tarefa: Tarefa,
): EstadoAplicacao {
  return {
    ...estado,
    tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa,
  };
}

function atualizarUI(): void {
  const ulTarefas: HTMLUListElement | null =
    document.querySelector<HTMLUListElement>(".app__section-task-list");
  if (!ulTarefas)
    throw new Error("HTMLUListElement(ulTarefas) não encontrado!");

  ulTarefas.innerHTML = "";
  estadoInicial.tarefas.forEach((tarefa: Tarefa) => {});

  return;
}
