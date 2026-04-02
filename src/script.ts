const music: HTMLAudioElement = new Audio(
  "./assets/sons/luna-rise-part-one.mp3",
);

const mscPlay: HTMLAudioElement = new Audio("./assets/sons/play.wav");
const mscPause: HTMLAudioElement = new Audio("./assets/sons/pause.mp3");
const mscBeep: HTMLAudioElement = new Audio("./assets/sons/beep.mp3");

let timerID: number | null = null;
let focusTime: number = 1500;
let shortBreakTime: number = 300;
let longBreakTime: number = 900;

let chosenTime: number | null = focusTime;

addEventListeners();
updateTimer(chosenTime);

function changeContext(context: string, timeType: number): void {
  const html: HTMLElement | null = document.querySelector<HTMLElement>("html");
  const banner: HTMLImageElement | null =
    document.querySelector<HTMLImageElement>(".app__image");
  const title: HTMLHeadingElement | null =
    document.querySelector<HTMLHeadingElement>(".app__title");
  const buttons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll<HTMLButtonElement>(".app__card-button");

  if (!html) {
    throw new Error("HTMLElement(html) não encontrado.");
  }

  if (!banner) {
    throw new Error("HTMLImageElement(banner) não encontrado.");
  }

  if (!title) {
    throw new Error("HTMLHeadingElement(title) não encontrado.");
  }

  if (!buttons) {
    throw new Error("NodeListOf<HTMLButtonElement>(buttons) não encontrado.");
  }

  updateTimer(timeType);
  chosenTime = timeType;

  for (const button of buttons) {
    button.classList.remove("active");
  }

  html.setAttribute("data-contexto", context);
  banner.setAttribute("src", `./assets/imagens/${context}.png`);

  switch (context) {
    case "foco":
      banner.setAttribute(
        "alt",
        "Arte de um homem utilizando headphones que aparenta estar debaixo da água",
      );

      title.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
      break;
    case "descanso-curto":
      banner.setAttribute(
        "alt",
        "Arte de uma mulher utilizando headphones que aparenta estar debaixo da água",
      );

      title.innerHTML = `
            Quel tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
      break;
    case "descanso-longo":
      banner.setAttribute(
        "alt",
        "Arte de uma mulher utilizando headphones que aparenta estar debaixo da água",
      );

      title.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
      break;
    default:
      break;
  }
  return;
}

function start(): void {
  mscPlay.play();

  const startPauseButtonSpan: HTMLSpanElement | null =
    document.querySelector<HTMLSpanElement>("#start-pause span");
  const startPauseButtonImg: HTMLImageElement | null =
    document.querySelector<HTMLImageElement>("#start-pause img");

  if (!startPauseButtonSpan) {
    throw new Error("HTMLSpanElement(startPauseButtonSpan) não encontrado.");
  }

  if (!startPauseButtonImg) {
    throw new Error("HTMLImageElement(startPauseButtonImg) não encontrado.");
  }

  startPauseButtonSpan.textContent = "Pausar";
  startPauseButtonImg.setAttribute("src", "/imagens/pause.png");

  timerID = setInterval((): void => {
    if (chosenTime === null) {
      throw new Error("chosenTime é null.");
    }

    chosenTime -= 1;
    updateTimer(chosenTime);

    if (chosenTime < 0) {
      reset();
      return;
    }
  }, 1000);
  return;
}

function pause(): void {
  mscPause.play();

  const startPauseButtonSpan: HTMLSpanElement | null =
    document.querySelector<HTMLSpanElement>("#start-pause span");
  const startPauseButtonImg: HTMLImageElement | null =
    document.querySelector<HTMLImageElement>("#start-pause img");

  if (!startPauseButtonSpan) {
    throw new Error("HTMLSpanElement(startPauseButtonSpan) não encontrado.");
  }

  if (!startPauseButtonImg) {
    throw new Error("HTMLImageElement(startPauseButtonImg) não encontrado.");
  }

  startPauseButtonSpan.textContent = "Começar";
  startPauseButtonImg.setAttribute("src", "/imagens/play_arrow.png");

  clearInterval(timerID as number);
  timerID = null;
  return;
}

function reset(): void {
  const html: HTMLElement | null = document.querySelector<HTMLElement>("html");
  const startPauseButtonSpan: HTMLSpanElement | null =
    document.querySelector<HTMLSpanElement>("#start-pause span");
  const startPauseButtonImg: HTMLImageElement | null =
    document.querySelector<HTMLImageElement>("#start-pause img");

  if (!html) {
    throw new Error("HTMLElement(html) não encontrado.");
  }

  if (!startPauseButtonSpan) {
    throw new Error("HTMLSpanElement(startPauseButtonSpan) não encontrado.");
  }

  if (!startPauseButtonImg) {
    throw new Error("HTMLImageElement(startPauseButtonImg) não encontrado.");
  }

  mscBeep.play();
  alert("Tempo finalizado!");

  const focusActive: boolean = html.getAttribute("data-contexto") === "foco";
  const shortBreakActive: boolean =
    html.getAttribute("data-contexto") === "descanso-curto";
  const longBreakActive: boolean =
    html.getAttribute("data-contexto") === "descanso-longo";

  startPauseButtonSpan.textContent = "Começar";
  startPauseButtonImg.setAttribute("src", "/imagens/play_arrow.png");

  if (focusActive) {
    const event = new CustomEvent("FocoFinalizado");
    document.dispatchEvent(event);

    chosenTime = focusTime;
  } else if (shortBreakActive) {
    chosenTime = shortBreakTime;
  } else {
    chosenTime = longBreakTime;
  }

  clearInterval(timerID as number);
  timerID = null;
  updateTimer(chosenTime);
  return;
}

function updateTimer(timeType: number): void {
  const timer: HTMLDivElement | null =
    document.querySelector<HTMLDivElement>("#timer");

  if (!timer) {
    throw new Error("HTMLDivElement(timer) não encontrado!");
  }

  const time: Date = new Date(timeType * 1000);
  const formattedTime: string = time.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  timer.innerHTML = `${formattedTime}`;
  return;
}

function addEventListeners(): void {
  const focusButton: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>(".app__card-button--foco");
  const shortBreakButton: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>(".app__card-button--curto");
  const longBreakButton: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>(".app__card-button--longo");
  const focusMusicToggle: HTMLInputElement | null =
    document.querySelector<HTMLInputElement>("#alternar-musica");
  const startPauseButton: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>("#start-pause");

  if (!focusButton) {
    throw new Error("HTMLButtonElement(focusButton) não encontrado.");
  }

  if (!shortBreakButton) {
    throw new Error("HTMLButtonElement(shortBreakButton) não encontrado.");
  }

  if (!longBreakButton) {
    throw new Error("HTMLButtonElement(longBreakButton) não encontrado.");
  }

  if (!focusMusicToggle) {
    throw new Error("HTMLInputElement(focusMusicToggle) não encontrado.");
  }

  if (!startPauseButton) {
    throw new Error("HTMLButtonElement(startPauseButton) não encontrado.");
  }

  focusButton.addEventListener("click", (): void => {
    changeContext("foco", focusTime);

    focusButton.classList.add("active");
    return;
  });

  shortBreakButton.addEventListener("click", (): void => {
    changeContext("descanso-curto", shortBreakTime);

    shortBreakButton.classList.add("active");
    return;
  });

  longBreakButton.addEventListener("click", (): void => {
    changeContext("descanso-longo", longBreakTime);

    longBreakButton.classList.add("active");
    return;
  });

  focusMusicToggle.addEventListener("change", (): void => {
    if (music.paused) {
      music.play();
      return;
    } else {
      music.pause();
      return;
    }
  });

  startPauseButton.addEventListener("click", (): void => {
    if (timerID) {
      pause();
      return;
    }

    start();
    return;
  });

  return;
}
