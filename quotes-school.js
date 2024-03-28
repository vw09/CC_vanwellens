const frequencyData = document.getElementById('frequencyData');
const container = document.getElementById('container-school');

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
    console.log('Gemiddeld geluidsniveau overschrijdt drempelwaarde.');
    loadRandomQuote(gemiddeldGeluidsniveau);
  }

  displayFrequencyData(gemiddeldGeluidsniveau);
}

async function loadRandomQuote(decibel) {
  if (quoteCounter < 8) {
    const quotes = Array.from(container.querySelectorAll('p'));
    const randomQuote = quotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % quotes.length;

    const quoteElement = document.createElement('p');
    quoteElement.textContent = randomQuote.textContent;

    let leftPosition, topPosition;
    do {
      leftPosition =
        Math.random() * (container.offsetWidth - quoteElement.offsetWidth);
      topPosition =
        Math.random() * (container.offsetHeight - quoteElement.offsetHeight);
    } while (overlapWithExistingQuotes(leftPosition, topPosition, quotes));

    quoteElement.style.position = 'absolute';
    quoteElement.style.display = 'block';
    quoteElement.style.left = `${leftPosition}px`;
    quoteElement.style.top = `${topPosition}px`;

    quoteElement.style.color = decibelToColor(decibel);

    container.appendChild(quoteElement);

    quoteCounter++;

    if (quoteCounter === 8) {
      startNextPageTimer();
    }
  }
}

function overlapWithExistingQuotes(leftPosition, topPosition, quotes) {
  const newQuoteRect = {
    left: leftPosition,
    top: topPosition,
    right: leftPosition + 200, // Ga uit van een vaste breedte voor citaten
    bottom: topPosition + 70, // Ga uit van een vaste hoogte voor citaten
  };

  for (const quote of quotes) {
    const quoteRect = quote.getBoundingClientRect();
    if (
      newQuoteRect.left < quoteRect.right &&
      newQuoteRect.right > quoteRect.left &&
      newQuoteRect.top < quoteRect.bottom &&
      newQuoteRect.bottom > quoteRect.top
    ) {
      return true; // Overlapt met bestaand citaat
    }
  }

  return false; // Geen overlap
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
    color = '#ffffff'; // Zwart (voor decibels boven 80)
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
    window.location.href = 'snapshots.html';
  }, 7000); // 5 seconden (5000 milliseconden)
}

// Start het proces door de microfoon te activeren
document.querySelector('body').addEventListener('click', startMicrofoon);
startMicrofoon();
