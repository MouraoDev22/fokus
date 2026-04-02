const html: HTMLElement | null = document.querySelector<HTMLElement>("html");

const banner: HTMLImageElement | null =
  document.querySelector<HTMLImageElement>(".app__image");
const titulo: HTMLHeadingElement | null =
  document.querySelector<HTMLHeadingElement>(".app__title");

const focoBtn: HTMLButtonElement | null =
  document.querySelector<HTMLButtonElement>(".app__card-button--foco");
const curtoBtn: HTMLButtonElement | null =
  document.querySelector<HTMLButtonElement>(".app__card-button--curto");
const longoBtn: HTMLButtonElement | null =
  document.querySelector<HTMLButtonElement>(".app__card-button--longo");
const botoes: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll<HTMLButtonElement>(".app__card-button");

const musicaFocoInput: HTMLInputElement | null =
  document.querySelector<HTMLInputElement>("#alternar-musica");

const startPauseBtn: HTMLButtonElement | null =
  document.querySelector<HTMLButtonElement>("#start-pause");
const startPauseBtnSpan: HTMLSpanElement | null =
  document.querySelector<HTMLSpanElement>("#start-pause span");
const startPauseBtnImg: HTMLImageElement | null =
  document.querySelector<HTMLImageElement>("#start-pause img");

const temporizador: HTMLDivElement | null =
  document.querySelector<HTMLDivElement>("#timer");

const musica: HTMLAudioElement = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;

const play: HTMLAudioElement = new Audio("/sons/play.wav");
const pause: HTMLAudioElement = new Audio("/sons/pause.mp3");
const beep: HTMLAudioElement = new Audio("/sons/beep.mp3");

let idTemporizador: number | null = null;

let tempoEscolhido: number | null = null;
let focoTempo: number = 1500;
let curtoTempo: number = 300;
let longoTempo: number = 900;

addEventListeners();
tempoEscolhido = focoTempo;
atualizarTemporizador(tempoEscolhido);

function alterarContexto(contexto: string, tipoTempo: number): void {
  const html: HTMLElement | null = document.querySelector<HTMLElement>("html");

  const banner: HTMLImageElement | null =
    document.querySelector<HTMLImageElement>(".app__image");
  const titulo: HTMLHeadingElement | null =
    document.querySelector<HTMLHeadingElement>(".app__title");

  if (!html || !banner || !titulo) {
    throw new Error("Elementos do DOM não encontrados.");
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

  if (!startPauseBtnSpan || !startPauseBtnImg) {
    throw new Error("Elementos do DOM não encontrados.");
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

  if (!startPauseBtnSpan || !startPauseBtnImg) {
    throw new Error("Elementos do DOM não encontrados.");
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

  if (!html || !startPauseBtnSpan || !startPauseBtnImg) {
    throw new Error("Elementos do DOM não encontrados.");
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

  if (
    !focoBtn ||
    !curtoBtn ||
    !longoBtn ||
    !musicaFocoInput ||
    !startPauseBtn
  ) {
    throw new Error("Elementos do DOM não encontrados.");
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