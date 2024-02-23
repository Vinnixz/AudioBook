const botaoPlayPause = document.getElementById("play-pause");
const botaoAvancar = document.getElementById("proximo");
const botaoVoltar = document.getElementById("anterior");
const audioCapitulo = document.getElementById("audio-capitulo");
const nomeCapitulo = document.getElementById("capitulo");
const tempoAtual = document.getElementById("start");
const tempoTotal = document.getElementById("end");
const barraProgresso = document.querySelector('.lineChild');

const numeroCapitulos = 10;
let taTocando = false;
let capituloAtual = 1;

function tocarFaixa() {
    audioCapitulo.play();
    botaoPlayPause.classList.remove('bi-play-circle-fill');
    botaoPlayPause.classList.add('bi-pause-circle-fill');
}

function pausarFaixa() {
    audioCapitulo.pause();
    botaoPlayPause.classList.remove('bi-pause-circle-fill');
    botaoPlayPause.classList.add('bi-play-circle-fill');
}

function tocarOuPausar() {
    if (!taTocando) {
        tocarFaixa(); 
        taTocando = true;
    } else {
        pausarFaixa();
        taTocando = false;
    }
}

function trocarCapitulo() {
    nomeCapitulo.innerText = "Capítulo " + capituloAtual;
}

function atualizarTempo() {
    const percentual = (audioCapitulo.currentTime / audioCapitulo.duration) * 100;
    barraProgresso.style.width = percentual + '%';
    
    const duracaoAtual = formatarTempo(audioCapitulo.currentTime);
    const duracaoTotal = formatarTempo(audioCapitulo.duration);
    
    tempoAtual.textContent = duracaoAtual;
    tempoTotal.textContent = duracaoTotal;
}

function formatarTempo(tempoEmSegundos) {
    const minutos = Math.floor(tempoEmSegundos / 60);
    const segundos = Math.floor(tempoEmSegundos % 60);
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
}

function proximaFaixa() {
    if (capituloAtual === numeroCapitulos) {
        capituloAtual = 1;
    } else {
        capituloAtual++;
    }
    audioCapitulo.src = `./books/dom-casmurro/${capituloAtual}.mp3`;
    tocarFaixa();
    trocarCapitulo();
}

function voltarFaixa() {
    if (capituloAtual === 1) {
        capituloAtual = numeroCapitulos;
    } else {
        capituloAtual--;
    }
    audioCapitulo.src = `./books/dom-casmurro/${capituloAtual}.mp3`;
    tocarFaixa();
    trocarCapitulo();
}

audioCapitulo.addEventListener('timeupdate', atualizarTempo);
botaoPlayPause.addEventListener('click', tocarOuPausar);
botaoAvancar.addEventListener('click', proximaFaixa);
botaoVoltar.addEventListener('click', voltarFaixa);
