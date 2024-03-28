window.onload = () => {
  const welkomElement = document.getElementById('welcometekst');
  welkomElement.textContent = 'SCREAM IN SERENITY!';

  const subWelkomElement = document.getElementById('subtekst-welcome');
  subWelkomElement.textContent = 'Ga voor het scherm staan.';

  /*setTimeout(() => {
    window.location.href = 'quotes-combined.html'; // Navigeer naar de volgende pagina na 10 seconden
  }, 5000);*/
};

let Gpio = require('onoff').Gpio;
//var pushButton = new Gpio(12, 'in')
const knopBlauw = new Gpio(21, 'in', 'rising', { debounceTimeout: 10 });
const knopRood = new Gpio(20, 'in', 'rising', { debounceTimeout: 10 });
const knopWit = new Gpio(16, 'in', 'rising', { debounceTimeout: 10 });
const knopGroen = new Gpio(12, 'in', 'rising', { debounceTimeout: 10 });

function setupButtons() {
  knopBlauw.watch(function (err, value) {
    //Watch for hardware interrupts on pushButton GPIO, specify callback function
    if (err) {
      //if an error
      console.error('There was an error', err); //output error message to console
      return;
    }
    console.log('blauw');
    lastPressed = 'blauw';
  });

  knopGeel.watch(function (err, value) {
    //Watch for hardware interrupts on pushButton GPIO, specify callback function
    if (err) {
      //if an error
      console.error('There was an error', err); //output error message to console
      return;
    }
    console.log('geel');
    lastPressed = 'geel';
  });
  knopGroen.watch(function (err, value) {
    //Watch for hardware interrupts on pushButton GPIO, specify callback function
    if (err) {
      //if an error
      console.error('There was an error', err); //output error message to console
      return;
    }
    console.log('groen');
    lastPressed = 'groen';
  });
  knopRood.watch(function (err, value) {
    //Watch for hardware interrupts on pushButton GPIO, specify callback function
    if (err) {
      //if an error
      console.error('There was an error', err); //output error message to console
      return;
    }
    console.log('rood');
    lastPressed = 'rood';
  });
}
