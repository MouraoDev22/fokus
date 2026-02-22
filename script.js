const html = document.querySelector('html');

const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const temporizadorBtn = document.querySelector('.app__card-primary-button');

const temporizador = document.querySelector('.app__card');

let focoTempo = 1500;
let curtoTempo = 300;
let longoTempo = 900;

focoBtn.addEventListener('click', () => {
    alterarContexto('foco');
    
    focoBtn.classList.add('active');
    curtoBtn.classList.remove('active');
    longoBtn.classList.remove('active');
});

curtoBtn.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    
    curtoBtn.classList.add('active');
    longoBtn.classList.remove('active');
    focoBtn.classList.remove('active');
});

longoBtn.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    
    longoBtn.classList.add('active');
    curtoBtn.classList.remove('active');
    focoBtn.classList.remove('active');
});

function alterarContexto(contexto) {
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
};