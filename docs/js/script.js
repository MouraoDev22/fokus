"use strict";
const html = document.querySelector("html");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const startPauseBtn = document.querySelector("#start-pause");
const startPauseBtnSpan = document.querySelector("#start-pause span");
const startPauseBtnImg = document.querySelector("#start-pause img");
const temporizador = document.querySelector("#timer");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;
const play = new Audio("/sons/play.wav");
const pause = new Audio("/sons/pause.mp3");
const beep = new Audio("/sons/beep.mp3");
let idTemporizador = null;
let tempoEscolhido = null;
let focoTempo = 1500;
let curtoTempo = 300;
let longoTempo = 900;
addEventListeners();
tempoEscolhido = focoTempo;
atualizarTemporizador(tempoEscolhido);
function alterarContexto(contexto, tipoTempo) {
    const html = document.querySelector("html");
    const banner = document.querySelector(".app__image");
    const titulo = document.querySelector(".app__title");
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
    if (!startPauseBtnSpan || !startPauseBtnImg) {
        throw new Error("Elementos do DOM não encontrados.");
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
    if (!startPauseBtnSpan || !startPauseBtnImg) {
        throw new Error("Elementos do DOM não encontrados.");
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
    if (!html || !startPauseBtnSpan || !startPauseBtnImg) {
        throw new Error("Elementos do DOM não encontrados.");
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
    if (!focoBtn ||
        !curtoBtn ||
        !longoBtn ||
        !musicaFocoInput ||
        !startPauseBtn) {
        throw new Error("Elementos do DOM não encontrados.");
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
