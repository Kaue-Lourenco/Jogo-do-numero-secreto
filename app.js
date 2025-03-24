let numeroMaximo = 4;
let rodada = 'true';
let tentativa = 0;
let listaNumeros = [];
let numeroSecreto = gerarNumero();

function exibirTextoInicial() {
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
    exibirTextoNaTela('p', `Escolha um numero entre 1 e ${numeroMaximo}`);
};

exibirTextoInicial();

function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    if (listaNumeros.length == numeroMaximo) {
        listaNumeros = [];
    };
    while (listaNumeros.includes(numeroEscolhido)) {
        numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
        console.log(numeroEscolhido)
    }
    console.log(numeroEscolhido)
    listaNumeros.push(numeroEscolhido)
    return numeroEscolhido;
};

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
};

function verificarChute() {
    tentativa++
    console.log('chute varificado');
    let chute = document.querySelector('input').value;
    if (rodada == 'true') {
        if (numeroSecreto == chute) {
            rodada = 'folse';
            palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
            exibirTextoNaTela('h1', 'Parabems!')
            exibirTextoNaTela('p', `Você acertou o numero secreto ${numeroSecreto} com ${tentativa} ${palavraTentativa}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            let palavraMaiorMenor = numeroSecreto > chute ? 'maior' : 'menor';
            exibirTextoNaTela('h1', 'Você errou!')
            exibirTextoNaTela('p', `O numero secreto é ${palavraMaiorMenor} que ${chute}`);
        };
    };
    limparCampo(chute);
};

function eventoEnter() {
    verificarChute();
};

document.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        eventoEnter();
    }
});

function novoJogo() {
    console.log(listaNumeros);
    rodada = 'true';
    console.log(numeroSecreto);
    tentativa = 0;
    exibirTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    numeroSecreto = gerarNumero();
}

function limparCampo(x) {
    x = document.querySelector('input');
    x.value = '';
};