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
    html.setAttribute('data-contexto', 'foco');
    
    focoBtn.classList.add('active');
    curtoBtn.classList.remove('active');
    longoBtn.classList.remove('active');
});

curtoBtn.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto');
    
    curtoBtn.classList.add('active');
    longoBtn.classList.remove('active');
    focoBtn.classList.remove('active');
});

longoBtn.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo');
    
    longoBtn.classList.add('active');
    curtoBtn.classList.remove('active');
    focoBtn.classList.remove('active');
});