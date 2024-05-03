/* eslint-disable no-unused-vars */
const frequencyData = document.getElementById('frequencyData');
const container = document.getElementById('container-selflove');

let analyser;
let bufferLength;
let dataArray;
let quoteIndex = 0;
let quoteCounter = 0;

// Array met quotes
const quotes = [
  'You carry so mutch love in your heart. Give some to yourself.',
  'You have always been enough!',
  'You owe it to youreself to become everything you were born with.',
  "Don't let insecurity ruin the beauty you were born with.",
  'You are magic, own that shit!',
  'Life is too short to spend it at war with your self.',
  'Is not selfish to make your happines your main priority.',
  'Your commitment to being authentic has to be greater than your desire to approvel.',
  "Don't compare your life to others. There's no comparison between the sun and the moon they shine when it's their time.",
  "Your life isn't yours if you always care what others think",
  'If you focus in the hurt, you will continue to suffer. If you focus on the lesson, you will continue to grow.',
  'Reminder: You can be a good person with a kind heart and still tell people to fuck off when needed.',
  'To the world, you may be one person, but to one persone you may be the world.',
];

// Vaste posities voor de eerste 5 quotes
const fixedPositions = [
  { x: '50vw', y: '50vh' },
  { x: '20vw', y: '80vh' },
  { x: '80vw', y: '20vh' },
  { x: '80vw', y: '80vh' },
  { x: '20vw', y: '20vh' },
];

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
  if (quoteCounter < 5) {
    // We want only 5 quotes at fixed positions
    const position = fixedPositions[quoteCounter]; // Get the fixed position for this quote

    // Check if the position is available (not overlapping with existing quotes)
    const randomQuotes = selectRandomQuotes();
    const quote = randomQuotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % randomQuotes.length;

    const quoteElement = document.createElement('p');
    quoteElement.textContent = quote;

    quoteElement.style.position = 'absolute';
    quoteElement.style.display = 'block';
    quoteElement.style.textAlign = 'center';
    quoteElement.style.width = '500px';
    quoteElement.style.margin = '0';
    quoteElement.style.transform = `translate(-250px, -75px) rotate(${Math.random() * 6 - 3}deg) scale(${Math.random() * 0.5 + 0.5})`;
    quoteElement.style.left = `${position.x}`; // Use the x-coordinate of the fixed position
    quoteElement.style.top = `${position.y}`; // Use the y-coordinate of the fixed position

    quoteElement.style.color = decibelToColor(decibel);

    document.body.appendChild(quoteElement); // Add quote to the body

    quoteCounter++;

    if (quoteCounter === 5) {
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
    color = '#A4FFF9'; // Rood
  } else if (decibel > 10 && decibel <= 20) {
    color = '#00DDFF'; // Rood
  } else if (decibel > 20 && decibel <= 30) {
    color = '#05C7F2'; // Rood
  } else if (decibel > 30 && decibel <= 40) {
    color = '#2CAAF1'; // Groen
  } else if (decibel > 40 && decibel <= 50) {
    color = '#B07ABF'; // Blauw
  } else if (decibel > 50 && decibel <= 60) {
    color = '#F26DC0'; //
  } else if (decibel > 60 && decibel <= 70) {
    color = '#F25CAF'; //
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

function resetQuotesCombined() {
  analyser = null;
  bufferLength = null;
  dataArray = null;
  quoteIndex = 0;
  quoteCounter = 0;
}

function selectRandomQuotes() {
  const selectedQuotes = [];
  while (selectedQuotes.length < 7) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    if (!selectedQuotes.includes(randomQuote)) {
      selectedQuotes.push(randomQuote);
    }
  }
  return selectedQuotes;
}
