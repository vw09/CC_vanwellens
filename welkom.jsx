window.onload = () => {
  const welkomElement = document.getElementById('welcometekst');
  welkomElement.textContent = 'SCREAM IN SERENITY!';

  const subWelkomElement = document.getElementById('subtekst-welcome');
  subWelkomElement.textContent =
    'Ga voor het scherm staan. Kies een knop naar keuzen';

  setTimeout(() => {
    window.location.href = 'quotes-combined.html'; // Navigeer naar de volgende pagina na 10 seconden
  }, 5000);
};

const Gpio = require('onoff').Gpio; // Importeer de GPIO-bibliotheek
const exec = require('child_process').exec; // Importeer de exec-functie om commando's uit te voeren

// Definieer de GPIO-pinnen die zijn verbonden met de knoppen
const buttonPins = [21, 20, 16, 12];

// Maak een array met de URL's die overeenkomen met elke knop
const urls = [
  'http://quotes-combined.html',
  'http://quotes-laugh.html',
  'http://quotes-school.html',
  'http://quotes-selflove.html',
];

// Initialiseer elke knop als een invoer en voeg een event handler toe voor wanneer de knop wordt ingedrukt
buttonPins.forEach((pin) => {
  const button = new Gpio(pin, 'in', 'both');

  button.watch((err, value) => {
    if (err) {
      console.error(
        'Er is een fout opgetreden bij het lezen van de knop:',
        err,
      );
      return;
    }

    if (value === 0) {
      const url = urls[buttonPins.indexOf(pin)];
      openWebpage(url);
    }
  });
});

// Functie om een webpagina te openen
function openWebpage(url) {
  exec(`chromium-browser ${url}`); // Open de webpagina in de standaard webbrowser
}
