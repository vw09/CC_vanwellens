window.onload = () => {
  const welkomElement = document.getElementById('welcometekst');
  welkomElement.textContent = 'SCREAM IN SERENITY!';

  const subWelkomElement = document.getElementById('subtekst-welcome');
  subWelkomElement.textContent = 'Ga voor het scherm staan.';

  setTimeout(() => {
    window.location.href = 'quotes-combined.html'; // Navigeer naar de volgende pagina na 10 seconden
  }, 5000);
};
