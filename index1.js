startWebsocket();

function startWebsocket() {
  const ws = new WebSocket('ws://10.150.197.52:1880/websocket');

  ws.onopen = function () {
    console.log('Connected to server');
  };
  ws.onmessage = function (e) {
    const data = e.data;
    console.log(data);

    if (data === '40') {
      window.location.href = 'index2.html';
    }
    if (data === '38') {
      window.location.href = 'index2.html';
    }

    if (data === '36') {
      window.location.href = 'index2.html';
    }

    if (data === '32') {
      window.location.href = 'index2.html';
    }
  };
}
