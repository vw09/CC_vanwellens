/* eslint-disable no-unused-vars */
window.onload = () => {
  const welkomElement = document.getElementById('welcometekst');
  welkomElement.textContent = 'SCREAM IN SERENITY!';

  const subWelkomElement = document.getElementById('subtekst-welcome');
  subWelkomElement.textContent =
    'Ga voor het scherm staan. Kies een knop naar keuzen';

  startWebsocket();
};

function startWebsocket() {
  const ws = new WebSocket('ws://10.150.197.52:1880/websocket');

  ws.onopen = function () {
    console.log('Connected to server');
  };
  ws.onmessage = function (e) {
    const data = e.data;
    console.log(data);

    if (data === '40') {
      window.location.href = 'quotes-combined.html';
    }
    if (data === '38') {
      window.location.href = 'quotes-laugh.html';
    }

    if (data === '36') {
      window.location.href = 'quotes-school.html';
    }

    if (data === '32') {
      window.location.href = 'quotes-selflove.html';
    }
  };
}
