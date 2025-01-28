document.getElementById('convert-btn').addEventListener('click', function() {
    const amount = document.getElementById('amount').value;
    const result = document.getElementById('result');

    // Vamos converter para uma moeda fictícia (exemplo)
    const conversionRate = 5.5; // 1 moeda local = 5.5 fictícias
    const convertedAmount = amount * conversionRate;

    result.textContent = `Valor convertido: ${convertedAmount} (moeda fictícia)`;
});
