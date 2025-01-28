document.addEventListener('DOMContentLoaded', () => {
    const moedaOrigem = document.getElementById('moedaOrigem');
    const moedaDestino = document.getElementById('moedaDestino');
    const valorInput = document.getElementById('valor');
    const resultadoDiv = document.getElementById('resultado');
    const form = document.querySelector('form');

    // Lista de códigos de moedas
    const moedas = ['USD', 'BRL', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];

    // Função para preencher os selects com as opções de moedas
    function preencherMoedas() {
        moedas.forEach(moeda => {
            const optionOrigem = document.createElement('option');
            optionOrigem.value = moeda;
            optionOrigem.textContent = moeda;
            moedaOrigem.appendChild(optionOrigem);

            const optionDestino = document.createElement('option');
            optionDestino.value = moeda;
            optionDestino.textContent = moeda;
            moedaDestino.appendChild(optionDestino);
        });
    }

    // Função para obter a taxa de câmbio
    async function obterTaxaCambio() {
        const moedaOrigemSelecionada = moedaOrigem.value;
        const moedaDestinoSelecionada = moedaDestino.value;
        const valor = parseFloat(valorInput.value);

        if (!valor || moedaOrigemSelecionada === moedaDestinoSelecionada) {
            resultadoDiv.textContent = 'Por favor, insira um valor válido e selecione moedas diferentes.';
            return;
        }

        try {
            const response = await fetch(`https://v6.exchangeratesapi.io/latest?base=${moedaOrigemSelecionada}&symbols=${moedaDestinoSelecionada}&apikey=221a8b3ae9d20af6b6ebf001`);
            const data = await response.json();

            if (data.error) {
                resultadoDiv.textContent = 'Erro ao obter a taxa de câmbio.';
                return;
            }

            const taxa = data.rates[moedaDestinoSelecionada];
            const resultado = (valor * taxa).toFixed(2);
            resultadoDiv.textContent = `${valor} ${moedaOrigemSelecionada} é igual a ${resultado} ${moedaDestinoSelecionada}`;
        } catch (error) {
            resultadoDiv.textContent = 'Erro ao obter a taxa de câmbio.';
        }
    }

    // Evento de envio do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        obterTaxaCambio();
    });

    // Preencher os selects com as opções de moedas ao carregar a página
    preencherMoedas();
});
