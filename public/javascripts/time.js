function criaHoraSeg(seg) {
    const data = new Date(seg *1000);
    return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'UTC'
    });
}

const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');
let timer;

let seg = 0

function iniciarRelogio() {
     timer = setInterval(function() {
        seg++;
        relogio.innerHTML = criaHoraSeg(seg);

    }, 1000);
}


iniciar.addEventListener('click', function(event) {
    clearInterval(timer);
    iniciarRelogio();
});

pausar.addEventListener('click', function(event) {
    clearInterval(timer);

});

zerar.addEventListener('click', function(event) {
    clearInterval(timer);
    seg = 0
    relogio.innerHTML = '00:00:00';

});
