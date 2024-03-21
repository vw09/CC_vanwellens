const frequencyData = document.getElementById('frequencyData');
const container = document.getElementById('container-combined');

let analyser;
let bufferLength;
let dataArray;
let quoteIndex = 0;
let quoteCounter = 0;

async function startMicrofoon() {
  try {
    const audioContext = new AudioContext();

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
  }

  displayFrequencyData(gemiddeldGeluidsniveau);
}

async function loadRandomQuote() {
  if (quoteCounter < 5) {
    const quotes = Array.from(container.querySelectorAll('p'));
    const randomQuote = quotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % quotes.length;

    const quoteElement = document.createElement('p');
    quoteElement.textContent = randomQuote.textContent;

    // Genereer willekeurige posities binnen het container-element
    const leftPosition =
      Math.random() * (container.offsetWidth - quoteElement.offsetWidth);
    const topPosition =
      Math.random() * (container.offsetHeight - quoteElement.offsetHeight);

    // Stel de positie van het quote-element in
    quoteElement.style.position = 'absolute';
    quoteElement.style.display = 'block';
    quoteElement.style.left = `${leftPosition}px`;
    quoteElement.style.top = `${topPosition}px`;

    container.appendChild(quoteElement);

    quoteCounter++;
  }
}

function displayFrequencyData(average) {
  frequencyData.innerText = `Gemiddelde frequentie: ${average.toFixed(2)} Hz`;
}

document.querySelector('body').addEventListener('click', startMicrofoon);
