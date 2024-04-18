/* eslint-disable no-unused-vars */
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
    console.log('Er wordt geluid gedetecteerd!');
    loadRandomQuote(gemiddeldGeluidsniveau);
  }

  displayFrequencyData(gemiddeldGeluidsniveau);
}

async function loadRandomQuote(decibel) {
  if (quoteCounter < 7) {
    const quotes = Array.from(container.querySelectorAll('p'));
    const randomQuote = quotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % quotes.length;

    const quoteElement = document.createElement('p');
    quoteElement.textContent = randomQuote.textContent;

    const quoteWidth = quoteElement.offsetWidth;
    const quoteHeight = quoteElement.offsetHeight;

    // Bepaal minimale afstand tussen elke quote
    const minDistance = 20;

    // Bepaal de breedte en hoogte van het scherm
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let leftPosition, topPosition;

    // Bepaal willekeurige posities voor de quote
    leftPosition = Math.random() * (screenWidth - quoteWidth - minDistance);
    topPosition = Math.random() * (screenHeight - quoteHeight - minDistance);

    quoteElement.style.position = 'absolute';
    quoteElement.style.display = 'block';
    quoteElement.style.left = `${leftPosition}px`;
    quoteElement.style.top = `${topPosition}px`;

    quoteElement.style.color = decibelToColor(decibel);

    document.body.appendChild(quoteElement); // Voeg quote toe aan body

    quoteCounter++;

    if (quoteCounter === 7) {
      startNextPageTimer();
    }
  }
}

function displayFrequencyData(average) {
  frequencyData.innerText = `Gemiddelde frequentie: ${average.toFixed(2)} Hz`;
}

function decibelToColor(decibel) {
  let color;

  // Bepaal kleur op basis van decibelbereik
  if (decibel >= 0 && decibel <= 10) {
    color = '#E15554'; // Rood
  } else if (decibel > 10 && decibel <= 20) {
    color = '#E15554'; // Rood
  } else if (decibel > 20 && decibel <= 30) {
    color = '#E15554'; // Rood
  } else if (decibel > 30 && decibel <= 40) {
    color = '#C7EFCF'; // Groen
  } else if (decibel > 40 && decibel <= 50) {
    color = '#96C5F7'; // Blauw
  } else if (decibel > 50 && decibel <= 60) {
    color = '#FFBA49'; // Geel
  } else if (decibel > 60 && decibel <= 70) {
    color = '#CA7DF9'; // Paars
  } else if (decibel > 70 && decibel <= 80) {
    color = '#9D0759'; // Fuchsia
  } else {
    color = '#ffffff'; // wit (voor decibels boven 80)
  }

  // Pas de helderheid aan op basis van het geluidsniveau
  let brightness = 100; // Begin met een gemiddelde helderheid
  if (decibel >= 0 && decibel <= 30) {
    brightness = 25; // Bij zwakke geluiden wordt de helderheid sterk verlaagd
  } else if (decibel > 30 && decibel <= 50) {
    brightness = 50; // Bij gematigde geluiden wordt de helderheid verlaagd
  } else if (decibel > 50 && decibel <= 70) {
    brightness = 75; // Bij gematigde tot luide geluiden wordt de helderheid iets verhoogd
  } else if (decibel > 70 && decibel <= 90) {
    brightness = 125; // Bij luide geluiden wordt de helderheid verder verhoogd
  } else if (decibel > 90 && decibel <= 100) {
    brightness = 100; // Bij zeer luide geluiden behoud de gemiddelde helderheid
  }

  // Converteer de helderheid naar een hexadecimale waarde
  const hexBrightness = Math.min(
    255,
    Math.max(0, Math.round(brightness * 2.55)),
  )
    .toString(16)
    .padStart(2, '0');

  // Voeg de helderheid toe aan de kleurwaarde en retourneer
  return `${color}${hexBrightness}`; // Grijstint
}

function startNextPageTimer() {
  setTimeout(() => {
    console.log('Navigeren naar de volgende pagina...');
    window.location.href = 'snapshots-making.html';
  }, 7000); // 5 seconden (5000 milliseconden)
}

document.addEventListener('click', startMicrofoon);

function resetQuotesSelflove() {
  analyser = null;
  bufferLength;
  dataArray;
  quoteIndex = 0;
  quoteCounter = 0;
}
