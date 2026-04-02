"use strict";
const music = new Audio("./assets/sons/luna-rise-part-one.mp3");
const play = new Audio("./assets/sons/play.wav");
const pause = new Audio("./assets/sons/pause.mp3");
const beep = new Audio("./assets/sons/beep.mp3");
let timerID = null;
let focusTime = 1500;
let shortBreakTime = 300;
let longBreakTime = 900;
let chosenTime = focusTime;
addEventListeners();
updateTimer(chosenTime);
function changeContext(context, timeType) {
  const html = document.querySelector("html");
  const banner = document.querySelector(".app__image");
  const title = document.querySelector(".app__title");
  const buttons = document.querySelectorAll(".app__card-button");
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
  banner.setAttribute("src", `/imagens/${context}.png`);
  switch (context) {
    case "foco":
      banner.setAttribute(
        "alt",
        "Arte de um homem utilizando headphones que aparenta estar debaixo da água",
      );
      title.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class=\"app__title-strong\">mergulhe no que importa.</strong>
            `;
      break;
    case "descanso-curto":
      banner.setAttribute(
        "alt",
        "Arte de uma mulher utilizando headphones que aparenta estar debaixo da água",
      );
      title.innerHTML = `
            Quel tal dar uma respirada?<br>
            <strong class=\"app__title-strong\">Faça uma pausa curta!</strong>
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
function start() {
  play.play();
  const startPauseButtonSpan = document.querySelector("#start-pause span");
  const startPauseButtonImg = document.querySelector("#start-pause img");
  if (!startPauseButtonSpan) {
    throw new Error("HTMLSpanElement(startPauseButtonSpan) não encontrado.");
  }
  if (!startPauseButtonImg) {
    throw new Error("HTMLImageElement(startPauseButtonImg) não encontrado.");
  }
  startPauseButtonSpan.textContent = "Pausar";
  startPauseButtonImg.setAttribute("src", "/imagens/pause.png");
  timerID = setInterval(() => {
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
function pause() {
  pause.play();
  const startPauseButtonSpan = document.querySelector("#start-pause span");
  const startPauseButtonImg = document.querySelector("#start-pause img");
  if (!startPauseButtonSpan) {
    throw new Error("HTMLSpanElement(startPauseButtonSpan) não encontrado.");
  }
  if (!startPauseButtonImg) {
    throw new Error("HTMLImageElement(startPauseButtonImg) não encontrado.");
  }
  startPauseButtonSpan.textContent = "Começar";
  startPauseButtonImg.setAttribute("src", "/imagens/play_arrow.png");
  clearInterval(timerID);
  timerID = null;
  return;
}
function reset() {
  const html = document.querySelector("html");
  const startPauseButtonSpan = document.querySelector("#start-pause span");
  const startPauseButtonImg = document.querySelector("#start-pause img");
  if (!html) {
    throw new Error("HTMLElement(html) não encontrado.");
  }
  if (!startPauseButtonSpan) {
    throw new Error("HTMLSpanElement(startPauseButtonSpan) não encontrado.");
  }
  if (!startPauseButtonImg) {
    throw new Error("HTMLImageElement(startPauseButtonImg) não encontrado.");
  }
  beep.play();
  alert("Tempo finalizado!");
  const focusActive = html.getAttribute("data-contexto") === "foco";
  const shortBreakActive =
    html.getAttribute("data-contexto") === "descanso-curto";
  const longBreakActive =
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
  clearInterval(timerID);
  timerID = null;
  updateTimer(chosenTime);
  return;
}
function updateTimer(timeType) {
  const timer = document.querySelector("#timer");
  if (!timer) {
    throw new Error("HTMLDivElement(timer) não encontrado!");
  }
  const time = new Date(timeType * 1000);
  const formattedTime = time.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  timer.innerHTML = `${formattedTime}`;
  return;
}
function addEventListeners() {
  const focusButton = document.querySelector(".app__card-button--foco");
  const shortBreakButton = document.querySelector(".app__card-button--curto");
  const longBreakButton = document.querySelector(".app__card-button--longo");
  const focusMusicToggle = document.querySelector("#alternar-musica");
  const startPauseButton = document.querySelector("#start-pause");
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
  focusButton.addEventListener("click", () => {
    changeContext("foco", focusTime);
    focusButton.classList.add("active");
    return;
  });
  shortBreakButton.addEventListener("click", () => {
    changeContext("descanso-curto", shortBreakTime);
    shortBreakButton.classList.add("active");
    return;
  });
  longBreakButton.addEventListener("click", () => {
    changeContext("descanso-longo", longBreakTime);
    longBreakButton.classList.add("active");
    return;
  });
  focusMusicToggle.addEventListener("change", () => {
    if (music.paused) {
      music.play();
      return;
    } else {
      music.pause();
      return;
    }
  });
  startPauseButton.addEventListener("click", () => {
    if (timerID) {
      pause();
      return;
    }
    start();
    return;
  });
  return;
}
