const html = document.querySelector('html');

const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');

const musicaFocoInput = document.querySelector('#alternar-musica');

const startPauseBtn = document.querySelector('#start-pause');
const startPauseBtnSpan = document.querySelector('#start-pause span');

const temporizador = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

const play = new Audio('/sons/play.wav');
const pause = new Audio('/sons/pause.mp3');
const beep = new Audio('/sons/beep.mp3');

let idTemporizador = null;

let focoTempo = 1500;
let curtoTempo = 300;
let longoTempo = 900;

focoBtn.addEventListener('click', () => {
    alterarContexto('foco');
    
    focoBtn.classList.add('active');
    return;
});

curtoBtn.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    
    curtoBtn.classList.add('active');
    return;
});

longoBtn.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    
    longoBtn.classList.add('active');
    return;
});

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    };
    return;
});

startPauseBtn.addEventListener('click', () => {
    if (idTemporizador) {
        pause.play();
        startPauseBtnSpan.textContent = 'Começar';
        clearInterval(idTemporizador);
        idTemporizador = null;
        return;
    };
    
    play.play();
    startPauseBtnSpan.textContent = 'Pausar';

    idTemporizador = setInterval(() => {
        curtoTempo -= 1;
        console.log(curtoTempo);
        
        if (curtoTempo === 250) {
            beep.play();
            startPauseBtnSpan.textContent = 'Começar';
            curtoTempo = 300;
            clearInterval(idTemporizador);
            idTemporizador = null;
            return;
        };
    }, 1000);
    return;
});

function alterarContexto(contexto) {
    for (const botao of botoes) {
        botao.classList.remove('active');
    };
    
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case 'foco':
            banner.setAttribute('alt', 'Arte de um homem utilizando headphones que aparenta estar debaixo da água');
        
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case 'descanso-curto':
            banner.setAttribute('alt', 'Arte de uma mulher utilizando headphones que aparenta estar debaixo da água');
        
            titulo.innerHTML = `
            Quel tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            break;
        case 'descanso-longo':
            banner.setAttribute('alt', 'Arte de uma mulher utilizando headphones que aparenta estar debaixo da água');
        
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            break;
        default:
            break;
    };
    return;
};