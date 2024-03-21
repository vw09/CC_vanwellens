const frequencyData = document.getElementById('frequencyData');
const container = document.getElementById('container-combined');
const audioContext = new AudioContext();

let analyser;
let bufferLength;
let dataArray;

async function startMicrofoon() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);

    microphone.connect(analyser);
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    setInterval(detecteerGeluidsniveau, 1000);
  } catch (err) {
    console.error(
      'Er is een fout opgetreden bij het starten van de microfoon:',
      err,
    );
  }
}

function detecteerGeluidsniveau() {
  analyser.getByteFrequencyData(dataArray);
  const gemiddeldGeluidsniveau =
    dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;

  const drempelWaarde = 10;

  if (gemiddeldGeluidsniveau > drempelWaarde) {
    loadRandomQuote();
    applyColorToQuotes(decibelToColor(gemiddeldGeluidsniveau));
  }

  displayFrequencyData(gemiddeldGeluidsniveau);
}

async function loadRandomQuote() {
  const quotes = Array.from(container.querySelectorAll('p')); // Gebruik 'container' om de paragrafen te selecteren
  const randomQuote =
    quotes[Math.floor(Math.random() * quotes.length)].textContent; // Selecteer een willekeurige quote
}

function applyColorToQuotes(color) {
  const quotes = container.querySelectorAll('p'); // Gebruik 'container' om de paragrafen te selecteren
  quotes.forEach((quote) => {
    quote.style.color = color;
  });
}

function displayFrequencyData(average) {
  frequencyData.innerText = `Gemiddelde frequentie: ${average.toFixed(2)} Hz`; // Gebruik 'frequencyData' om de gemiddelde frequentie weer te geven
}

function decibelToColor(decibel) {
  if (decibel >= 0 && decibel <= 30) {
    return '#E15554';
  } else if (decibel > 30 && decibel <= 50) {
    return '#C7EFCF';
  } else if (decibel > 50 && decibel <= 70) {
    return '#96C5F7';
  } else if (decibel > 70 && decibel <= 90) {
    return '#FFBA49';
  } else if (decibel > 90 && decibel <= 100) {
    return '#CA7DF9';
  } else {
    return '#FFFFFF'; // Wit
  }
}

window.addEventListener('click', startMicrofoon);
