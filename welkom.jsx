window.onload = () => {
  const welkomElement = document.getElementById('welcometekst');
  welkomElement.textContent = 'SCREAM IN SERENITY!';

  const subWelkomElement = document.getElementById('subtekst-welcome');
  subWelkomElement.textContent = 'Ga voor het scherm staan.';

  setTimeout(() => {
    window.location.href = 'quotes-combined.html'; // Navigeer naar de volgende pagina na 10 seconden
  }, 5000);
};

let Gpio = require('onoff').Gpio;

const knopBlauw = new Gpio(21, 'in', 'rising', { debounceTimeout: 10 });
const knopRood = new Gpio(20, 'in', 'rising', { debounceTimeout: 10 });
const knopWit = new Gpio(16, 'in', 'rising', { debounceTimeout: 10 });
const knopGroen = new Gpio(12, 'in', 'rising', { debounceTimeout: 10 });

// Definieer een variabele om de laatst ingedrukte knop bij te houden
let lastPressed = '';

function setupButtons() {
  knopBlauw.watch(function (err) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
    console.log('blauw');
    lastPressed = 'blauw';
    openMapBasedOnButton();
  });

  knopWit.watch(function (err) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
    console.log('wit');
    lastPressed = 'wit';
    openMapBasedOnButton();
  });

  knopGroen.watch(function (err) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
    console.log('groen');
    lastPressed = 'groen';
    openMapBasedOnButton();
  });

  knopRood.watch(function (err) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
    console.log('rood');
    lastPressed = 'rood';
    openMapBasedOnButton();
  });
}

// Functie om de map te openen op basis van de laatst ingedrukte knop
function openMapBasedOnButton() {
  switch (lastPressed) {
    case 'blauw':
      openMap('quotes-selflove');
      break;
    case 'wit':
      openMap('quotes-school');
      break;
    case 'groen':
      openMap('quotes-laugh');
      break;
    case 'rood':
      openMap('quotes-combined');
      break;
    default:
      console.log('Geen actie uitgevoerd. Onbekende knop.');
  }
}

// Functie om de map te openen
function openMap(mapName) {
  // Hier zou je code moeten plaatsen om de map te openen
  // Bijvoorbeeld met behulp van 'fs' module
  console.log(`Opening ${mapName}...`);
  // Voorbeeld: fs.mkdirSync(mapName, { recursive: true });
}

// Roep de setupButtons functie aan om de knoppen in te stellen
setupButtons();
