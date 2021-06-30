function meuEscopo() {
    const form = document.querySelector('.form');
    const resposta = document.querySelector('.resposta');

    function recebeEventoForm(evento) {
        evento.preventDefault();

        let peso = form.querySelector('.Peso');

        let altura = form.querySelector('.Altura');

        let imc = peso.value / (altura.value * altura.value);

        console.log(typeof peso, typeof altura);
        console.log(peso.value, altura.value);

        function DefiImc(imc) {

            let definition = 'Indefinido'

            if (imc <= 18.5) {
                definition = 'Abaixo do peso';
            }
            else if (imc > 18.5 && imc <= 24.9) {
                definition = 'Peso normal';
            }
            else if (imc >= 25 && imc <= 29.9) {
                definition = 'Sobrepeso';
            }
            else if (imc >= 30 && imc <= 34.9) {
                definition = 'Obesidade grau 1';
            }
            else if (imc >= 35 && imc <= 39.9) {
                definition = 'Obesidade grau 2';
            }
            else {
                definition = 'Obesidade grau 3';
            }

            resposta.innerHTML = (`Seu IMC é ${imc.toFixed(2)} (${definition})`);
        };

        if (!peso.value) {
            resposta.innerHTML = (`Peso não definido`);
            return
        }

        else if (!altura.value) {
            resposta.innerHTML = (`Altura não definida`);
            return
        }

        else {
            DefiImc(imc);
        }

    }

    form.addEventListener('submit', recebeEventoForm)
}

meuEscopo();
