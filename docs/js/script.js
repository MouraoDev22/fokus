"use strict";
const musica = new Audio("./assets/sons/luna-rise-part-one.mp3");
const play = new Audio("./assets/sons/play.wav");
const pause = new Audio("./assets/sons/pause.mp3");
const beep = new Audio("./assets/sons/beep.mp3");
let idTemporizador = null;
let focoTempo = 1500;
let curtoTempo = 300;
let longoTempo = 900;
let tempoEscolhido = focoTempo;
addEventListeners();
atualizarTemporizador(tempoEscolhido);
function alterarContexto(contexto, tipoTempo) {
    const html = document.querySelector("html");
    const banner = document.querySelector(".app__image");
    const titulo = document.querySelector(".app__title");
    const botoes = document.querySelectorAll(".app__card-button");
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
            banner.setAttribute("alt", "Arte de um homem utilizando headphones que aparenta estar debaixo da água");
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case "descanso-curto":
            banner.setAttribute("alt", "Arte de uma mulher utilizando headphones que aparenta estar debaixo da água");
            titulo.innerHTML = `
            Quel tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            break;
        case "descanso-longo":
            banner.setAttribute("alt", "Arte de uma mulher utilizando headphones que aparenta estar debaixo da água");
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
function iniciar() {
    play.play();
    const startPauseBtnSpan = document.querySelector("#start-pause span");
    const startPauseBtnImg = document.querySelector("#start-pause img");
    if (!startPauseBtnSpan) {
        throw new Error("HTMLSpanElement(startPauseBtnSpan) não encontrado.");
    }
    if (!startPauseBtnImg) {
        throw new Error("HTMLImageElement(startPauseBtnImg) não encontrado.");
    }
    startPauseBtnSpan.textContent = "Pausar";
    startPauseBtnImg.setAttribute("src", "/imagens/pause.png");
    idTemporizador = setInterval(() => {
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
function pausar() {
    pause.play();
    const startPauseBtnSpan = document.querySelector("#start-pause span");
    const startPauseBtnImg = document.querySelector("#start-pause img");
    if (!startPauseBtnSpan) {
        throw new Error("HTMLSpanElement(startPauseBtnSpan) não encontrado.");
    }
    if (!startPauseBtnImg) {
        throw new Error("HTMLImageElement(startPauseBtnImg) não encontrado.");
    }
    startPauseBtnSpan.textContent = "Começar";
    startPauseBtnImg.setAttribute("src", "/imagens/play_arrow.png");
    clearInterval(idTemporizador);
    idTemporizador = null;
    return;
}
function zerar() {
    const html = document.querySelector("html");
    const startPauseBtnSpan = document.querySelector("#start-pause span");
    const startPauseBtnImg = document.querySelector("#start-pause img");
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
    const focoAtivo = html.getAttribute("data-contexto") === "foco";
    const curtoAtivo = html.getAttribute("data-contexto") === "descanso-curto";
    const longoAtivo = html.getAttribute("data-contexto") === "descanso-longo";
    startPauseBtnSpan.textContent = "Começar";
    startPauseBtnImg.setAttribute("src", "/imagens/play_arrow.png");
    if (focoAtivo) {
        const evento = new CustomEvent("FocoFinalizado");
        document.dispatchEvent(evento);
        tempoEscolhido = focoTempo;
    }
    else if (curtoAtivo) {
        tempoEscolhido = curtoTempo;
    }
    else {
        tempoEscolhido = longoTempo;
    }
    clearInterval(idTemporizador);
    idTemporizador = null;
    atualizarTemporizador(tempoEscolhido);
    return;
}
function atualizarTemporizador(tipoTempo) {
    const temporizador = document.querySelector("#timer");
    if (!temporizador) {
        throw new Error("HTMLDivElement(temporizador) não encontrado!");
    }
    const tempo = new Date(tipoTempo * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-BR", {
        minute: "2-digit",
        second: "2-digit",
    });
    temporizador.innerHTML = `${tempoFormatado}`;
    return;
}
function addEventListeners() {
    const focoBtn = document.querySelector(".app__card-button--foco");
    const curtoBtn = document.querySelector(".app__card-button--curto");
    const longoBtn = document.querySelector(".app__card-button--longo");
    const musicaFocoInput = document.querySelector("#alternar-musica");
    const startPauseBtn = document.querySelector("#start-pause");
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
    focoBtn.addEventListener("click", () => {
        alterarContexto("foco", focoTempo);
        focoBtn.classList.add("active");
        return;
    });
    curtoBtn.addEventListener("click", () => {
        alterarContexto("descanso-curto", curtoTempo);
        curtoBtn.classList.add("active");
        return;
    });
    longoBtn.addEventListener("click", () => {
        alterarContexto("descanso-longo", longoTempo);
        longoBtn.classList.add("active");
        return;
    });
    musicaFocoInput.addEventListener("change", () => {
        if (musica.paused) {
            musica.play();
            return;
        }
        else {
            musica.pause();
            return;
        }
    });
    startPauseBtn.addEventListener("click", () => {
        if (idTemporizador) {
            pausar();
            return;
        }
        iniciar();
        return;
    });
    return;
}
