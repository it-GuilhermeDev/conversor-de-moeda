function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    // Verifica se o valor inserido é válido
    if (amount === "" || isNaN(amount) || amount <= 0) {
        alert("Por favor, insira um valor válido para conversão.");
        return;
    }

    const apiKey = 221a8b3ae9d20af6b6ebf001;  // Substitua pela sua chave da API
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    // Faz a requisição para obter a taxa de câmbio
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                const conversionRate = data.conversion_rates[toCurrency];
                const result = (amount * conversionRate).toFixed(2);
                document.getElementById('conversionResult').textContent = result;
            } else {
                alert("Erro ao buscar taxas de câmbio.");
            }
        })
        .catch(error => {
            alert("Erro ao acessar a API: " + error);
        });
}
