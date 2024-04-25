/* eslint-disable no-unused-vars */
window.onload = () => {
  const welkomElement = document.getElementById('welcometekst');
  welkomElement.textContent = 'SCREAM IN SERENITY!';

  const subWelkomElement = document.getElementById('subtekst-welcome');
  subWelkomElement.textContent =
    'Ga voor het scherm staan. Kies een knop naar keuzen';
};
function startWebsocket() {
  const ws = new WebSocket('ws://192.168.100.1:1880/websocket');

  ws.onmessage = function (e) {
    const data = e.data;
    console.log(data);

    if (data === 'white') {
      window.location.href = 'quotes-combined.html';
    }
    if (data === 'green') {
      window.location.href = 'quotes-laugh.html';
    }

    if (data === 'red') {
      window.location.href = 'quotes-school.html';
    }

    if (data === 'blue') {
      window.location.href = 'quotes-selflove.html';
    }
  };
}
