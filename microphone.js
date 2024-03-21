// Functie om de microfoon te starten
/*async function startMicrofoon() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);
    javascriptNode.onaudioprocess = function () {
      let array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      let average = calculateAverage(array);

      // Weergave van de frequentiegegevens op de pagina
      displayFrequencyData(average);
    };
  } catch (err) {
    console.error(
      'Er is een fout opgetreden bij het starten van de microfoon:',
      err,
    );
  }
}

// Functie om het gemiddelde van een array te berekenen
function calculateAverage(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
}

// Functie om de frequentiegegevens weer te geven op de pagina
function displayFrequencyData(average) {
  const frequencyDataDiv = document.getElementById('frequencyData');
  frequencyDataDiv.innerText = `Gemiddelde frequentie: ${average}`;
}

// Start de microfoon automatisch zodra de pagina is geladen
window.addEventListener('load', startMicrofoon);

// Functie om decibels om te zetten naar een kleur
function decibelToColor(decibel, minDecibel, maxDecibel) {
  // Definieer de kleuren die overeenkomen met de minimum- en maximumwaarden
  const minColor = [0, 0, 255]; // Blauw bij laag geluidsniveau
  const maxColor = [255, 0, 0]; // Rood bij hoog geluidsniveau

  // Bereken de interpolatiefactor op basis van het geluidsniveau
  const interpolationFactor =
    (decibel - minDecibel) / (maxDecibel - minDecibel);

  // Bereken de RGB-waarden op basis van de interpolatiefactor
  const r = interpolate(minColor[0], maxColor[0], interpolationFactor);
  const g = interpolate(minColor[1], maxColor[1], interpolationFactor);
  const b = interpolate(minColor[2], maxColor[2], interpolationFactor);

  // Geef de resulterende kleur terug als een RGB-string
  return `rgb(${r}, ${g}, ${b})`;
}

// Hulpmethode om tussenwaarden te interpoleren
function interpolate(minValue, maxValue, interpolationFactor) {
  return Math.round((maxValue - minValue) * interpolationFactor + minValue);
}

// Test de functie met een bepaald geluidsniveau (in decibels)
const decibelLevel = 75; // Geluidsniveau
const minDecibel = 0; // Minimaal geluidsniveau
const maxDecibel = 100; // Maximaal geluidsniveau
const color = decibelToColor(decibelLevel, minDecibel, maxDecibel);
console.log('Kleur bij', decibelLevel, 'dB:', color);*/
