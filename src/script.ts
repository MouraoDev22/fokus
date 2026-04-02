const musica: HTMLAudioElement = new Audio(
  "./assets/sons/luna-rise-part-one.mp3",
);

const play: HTMLAudioElement = new Audio("./assets/sons/play.wav");
const pause: HTMLAudioElement = new Audio("./assets/sons/pause.mp3");
const beep: HTMLAudioElement = new Audio("./assets/sons/beep.mp3");

let idTemporizador: number | null = null;
let focoTempo: number = 1500;
let curtoTempo: number = 300;
let longoTempo: number = 900;

let tempoEscolhido: number | null = focoTempo;

addEventListeners();
atualizarTemporizador(tempoEscolhido);

function alterarContexto(contexto: string, tipoTempo: number): void {
  const html: HTMLElement | null = document.querySelector<HTMLElement>("html");
  const banner: HTMLImageElement | null =
    document.querySelector<HTMLImageElement>(".app__image");
  const titulo: HTMLHeadingElement | null =
    document.querySelector<HTMLHeadingElement>(".app__title");
  const botoes: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll<HTMLButtonElement>(".app__card-button");

  if (!html) {
    throw new Error("HTMLElement(html) não encontrado.");
  }

  if (!banner) {
    throw new Error("HTMLImageElement(banner) não encontrado.");
  }

  if (!titulo) {
    throw new Error("HTMLHeadingElement(titulo) não encontrado.");
  }

  if (!botoes) {
    throw new Error("NodeListOf<HTMLButtonElement>(botoes) não encontrado.");
  }

  atualizarTemporizador(tipoTempo);
  tempoEscolhido = tipoTempo;

  for (const botao of botoes) {
    botao.classList.remove("active");
  }

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      banner.setAttribute(
        "alt",
        "Arte de um homem utilizando headphones que aparenta estar debaixo da água",
      );

      titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
      break;
    case "descanso-curto":
      banner.setAttribute(
        "alt",
        "Arte de uma mulher utilizando headphones que aparenta estar debaixo da água",
      );

      titulo.innerHTML = `
            Quel tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
      break;
    case "descanso-longo":
      banner.setAttribute(
        "alt",
        "Arte de uma mulher utilizando headphones que aparenta estar debaixo da água",
      );

      titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
      break;
    default:
      break;
  }
  return;
}

function iniciar(): void {
  play.play();

  const startPauseBtnSpan: HTMLSpanElement | null =
    document.querySelector<HTMLSpanElement>("#start-pause span");
  const startPauseBtnImg: HTMLImageElement | null =
    document.querySelector<HTMLImageElement>("#start-pause img");

  if (!startPauseBtnSpan) {
    throw new Error("HTMLSpanElement(startPauseBtnSpan) não encontrado.");
  }

  if (!startPauseBtnImg) {
    throw new Error("HTMLImageElement(startPauseBtnImg) não encontrado.");
  }

  startPauseBtnSpan.textContent = "Pausar";
  startPauseBtnImg.setAttribute("src", "/imagens/pause.png");

  idTemporizador = setInterval((): void => {
    if (tempoEscolhido === null) {
      throw new Error("tempoEscolhido é null.");
    }

    tempoEscolhido -= 1;
    atualizarTemporizador(tempoEscolhido);

    if (tempoEscolhido < 0) {
      zerar();
      return;
    }
  }, 1000);
  return;
}

function pausar(): void {
  pause.play();

  const startPauseBtnSpan: HTMLSpanElement | null =
    document.querySelector<HTMLSpanElement>("#start-pause span");
  const startPauseBtnImg: HTMLImageElement | null =
    document.querySelector<HTMLImageElement>("#start-pause img");

  if (!startPauseBtnSpan) {
    throw new Error("HTMLSpanElement(startPauseBtnSpan) não encontrado.");
  }

  if (!startPauseBtnImg) {
    throw new Error("HTMLImageElement(startPauseBtnImg) não encontrado.");
  }

  startPauseBtnSpan.textContent = "Começar";
  startPauseBtnImg.setAttribute("src", "/imagens/play_arrow.png");

  clearInterval(idTemporizador as number);
  idTemporizador = null;
  return;
}

function zerar(): void {
  const html: HTMLElement | null = document.querySelector<HTMLElement>("html");
  const startPauseBtnSpan: HTMLSpanElement | null =
    document.querySelector<HTMLSpanElement>("#start-pause span");
  const startPauseBtnImg: HTMLImageElement | null =
    document.querySelector<HTMLImageElement>("#start-pause img");

  if (!html) {
    throw new Error("HTMLElement(html) não encontrado.");
  }

  if (!startPauseBtnSpan) {
    throw new Error("HTMLSpanElement(startPauseBtnSpan) não encontrado.");
  }

  if (!startPauseBtnImg) {
    throw new Error("HTMLImageElement(startPauseBtnImg) não encontrado.");
  }

  beep.play();
  alert("Tempo finalizado!");

  const focoAtivo: boolean = html.getAttribute("data-contexto") === "foco";
  const curtoAtivo: boolean =
    html.getAttribute("data-contexto") === "descanso-curto";
  const longoAtivo: boolean =
    html.getAttribute("data-contexto") === "descanso-longo";

  startPauseBtnSpan.textContent = "Começar";
  startPauseBtnImg.setAttribute("src", "/imagens/play_arrow.png");

  if (focoAtivo) {
    const evento = new CustomEvent("FocoFinalizado");
    document.dispatchEvent(evento);

    tempoEscolhido = focoTempo;
  } else if (curtoAtivo) {
    tempoEscolhido = curtoTempo;
  } else {
    tempoEscolhido = longoTempo;
  }

  clearInterval(idTemporizador as number);
  idTemporizador = null;
  atualizarTemporizador(tempoEscolhido);
  return;
}

function atualizarTemporizador(tipoTempo: number): void {
  const temporizador: HTMLDivElement | null =
    document.querySelector<HTMLDivElement>("#timer");

  if (!temporizador) {
    throw new Error("HTMLDivElement(temporizador) não encontrado!");
  }

  const tempo: Date = new Date(tipoTempo * 1000);
  const tempoFormatado: string = tempo.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  temporizador.innerHTML = `${tempoFormatado}`;
  return;
}

function addEventListeners(): void {
  const focoBtn: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>(".app__card-button--foco");
  const curtoBtn: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>(".app__card-button--curto");
  const longoBtn: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>(".app__card-button--longo");
  const musicaFocoInput: HTMLInputElement | null =
    document.querySelector<HTMLInputElement>("#alternar-musica");
  const startPauseBtn: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>("#start-pause");

  if (!focoBtn) {
    throw new Error("HTMLButtonElement(focoBtn) não encontrado.");
  }

  if (!curtoBtn) {
    throw new Error("HTMLButtonElement(curtoBtn) não encontrado.");
  }

  if (!longoBtn) {
    throw new Error("HTMLButtonElement(longoBtn) não encontrado.");
  }

  if (!musicaFocoInput) {
    throw new Error("HTMLInputElement(musicaFocoInput) não encontrado.");
  }

  if (!startPauseBtn) {
    throw new Error("HTMLButtonElement(startPauseBtn) não encontrado.");
  }

  focoBtn.addEventListener("click", (): void => {
    alterarContexto("foco", focoTempo);

    focoBtn.classList.add("active");
    return;
  });

  curtoBtn.addEventListener("click", (): void => {
    alterarContexto("descanso-curto", curtoTempo);

    curtoBtn.classList.add("active");
    return;
  });

  longoBtn.addEventListener("click", (): void => {
    alterarContexto("descanso-longo", longoTempo);

    longoBtn.classList.add("active");
    return;
  });

  musicaFocoInput.addEventListener("change", (): void => {
    if (musica.paused) {
      musica.play();
      return;
    } else {
      musica.pause();
      return;
    }
  });

  startPauseBtn.addEventListener("click", (): void => {
    if (idTemporizador) {
      pausar();
      return;
    }

    iniciar();
    return;
  });

  return;
}
