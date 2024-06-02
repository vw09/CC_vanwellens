# Scream in Serenity

## Introductie

In de huidige tijd ervaren jongeren steeds meer stress door school, sociale druk en andere verplichtingen. De toenemende druk om te presteren en de constante stroom van verwachtingen kunnen leiden tot gevoelens van overweldiging en angst. Hoewel dit project specifiek gericht is op jongeren, kan iedereen die last heeft van stress en spanning er baat bij hebben.

## Hoe werkt het

Onderzoek toont aan dat schreeuwen, roepen of krijsen een effectieve manier kan zijn om stress, frustratie en woede te verminderen. Deze fysieke uitlaatkleppen helpen niet alleen bij het loslaten van negatieve emoties, maar kunnen ook een gevoel van opluchting en kalmte bieden. Het idee dat je je emoties letterlijk kunt uitschreeuwen, is eenvoudig maar krachtig.

"Scream in Serenity" biedt een innovatieve en interactieve manier om deze uitlaatklep te gebruiken. Wanneer je de kamer binnenkomt, scant een apparaat je gezicht. Op een tafel voor je staan meerdere knoppen met woorden die verschillende gevoelens en situaties representeren, zoals 'Self Love', 'Motivatie voor school', of 'Problemen thuis'. Als je geen specifieke frustratie hebt, kun je op de '?' knop drukken, waarna er willekeurige quotes uit alle categorieën verschijnen.

Wanneer je op een knop drukt, kun je voor het scherm gaan staan dan duw je met je muis op het scherm en mag je beginnen roepen. Hoe harder je roept, hoe duidelijker de woorden op het scherm verschijnen. Hoe zachter je roept, hoe vager de woorden zijn. Als je lang achter elkaar schreeuwt, verschijnen er langere woorden of zinnen. Als je kort schreeuwt, zijn de woorden korter. Dit stelt je in staat om de intensiteit van je ervaring zelf te bepalen.

Na ongeveer 10 seconden stopt de installatie met het weergeven van woorden. Ondertussen maakt het apparaat opnieuw een scan of foto van je gezicht deze word naast de andere gezet om te zien of je gezichtsuitdrukking is veranderd."

Dit concept biedt een veilige en toegankelijke manier om je emoties te uiten en kan helpen om een gevoel van opluchting en tevredenheid te bereiken. Gebruik "Scream in Serenity" wanneer je behoefte hebt aan een uitlaatklep voor je emoties en ervaar hoe je stap voor stap een rustiger en meer gebalanceerd leven kunt leiden.

## Benodigdheden

- computer
- raspberrypi
- 1 display
- microfoon (Mag ingebouwd in je laptop zitten)
- 1 webcam
- 4 drukknoppen
- HDMI kabel
- Lan kabel

## Technische vaardigheden

- html
- css
- javascript
- node.js
- github
- netlify
- figma

## Instaleren en uitvoeren

- 1: Download en kopieër het project
- 2: Instaleer node.js in het project
- 3: In terminal -> npm install
- 4: In terminal -> npm run dev

# Constructie

Om de installatie interactief te maken, heb ik een doos gemaakt met vier knoppen. Deze doos is uitgesneden met een lasercutter, waarbij ik 3 mm dik hout heb gebruikt.

De doos dient niet alleen als behuizing voor de knoppen, maar ook voor het opbergen van de Raspberry Pi, zodat alle apparatuur netjes is weggewerkt. Het ontwerp bestaat uit vijf panelen, waarvan de onderkant open is. Aan de bovenzijde zijn er vier gaten voor de knoppen en aan de linkerzijde een groter gat voor de kabels.

Het Illustrator-bestand moet je opslaan als .ai-bestand en op een USB-stick zetten. Vervolgens steek je de USB-stick in de lasercutter, die het ontwerp uitsnijdt zoals aangegeven.

Om duidelijk te maken welke specifieke knop voor welke quote dien heb ik mini canvasen op een mini ezel gezet hierop staan de soorten motivaties die vasthangen aan de bovenstaande knop.

Ten slotte heb ik de doos geschilderd in het thema van de installatie.

### Knoppen bevestigen

Om de knoppen aan de box te bevestigen, schroef je het onderste wieltje van de knop los. Je steekt de knop door het gat en schroeft het wiel er weer op. Hierdoor worden de knoppen aan de doos bevestigd. De knoppen zijn bevestigd aan de raspberrypi door middel van draden.

# Stickers

Ik heb stickers gemaakt voor de mensen die mijn installatie hebben bezocht. Deze stickers zijn bedoeld om je te herinneren aan je mentale gezondheid.

Om de stickers te maken, maak je twee lagen in een Illustrator-bestand. In de eerste laag plaats je de afbeelding van de sticker, en in de tweede laag maak je de cutContour. Deze contour is 100% magenta en zorgt ervoor dat je de sticker na het printen kunt laten uitsnijden.

### Canvas

Als laatste heb ik ook nog gezorgd dat mijn kamer was aangekleed op een leuke manier. Hiervoor heb ik canvassen geschilderd, en ballonnen opgeblazen. Het waren kleine dingen maar fleurde wel direct de kamer op.

<img width="800" alt="stickers" src="https://github.com/vw09/CC_vanwellens/assets/151523107/c96f5949-6e28-4b15-a730-66fbed6b26b3">

# Code uitgelegd

## Inhoudsopgave

- Installatie
- Hoe het werkt
- Voorbeeld
- Toekomstige verbeteringen
- Licentie

## Installatie

Voordat je de code kunt uitvoeren, moet je ervoor zorgen dat je de face-api.js-bibliotheek hebt geïnstalleerd. Je kunt deze bibliotheek installeren via npm.

### Main.js

Dit project maakt gebruik van de face-api.js bibliotheek om gezichtsdetectie en expressieherkenning uit te voeren via de webcam. Het detecteert gezichten in real-time met behulp van de webcam en herkent gezichtskenmerken en -expressies. Zodra een gezicht is gedetecteerd, maakt het project een snapshot van het gedetecteerde gezicht en slaat deze lokaal op. Nadat de snapshot is genomen, verwijst de applicatie door naar een introductiepagina.

```javascript
import './style.css';
import * as faceapi from 'face-api.js';

const video = document.querySelector('video');
let snapshotTaken = false; // Variabele om bij te houden of er al een snapshot is genomen

async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
  await faceapi.nets.faceExpressionNet.loadFromUri('/models');

  startVideo();
}

async function startVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    // Maak een snapshot van het canvas als er nog geen snapshot is genomen
    if (!snapshotTaken && detections.length > 0) {
      // Maak een snapshot van het video element
      captureImage();

      console.log(detections);
      localStorage.setItem(
        'expression',
        JSON.stringify(detections[0].expressions),
      );

      location.assign('/intro.html');
    }
  }, 7000);
});
// Laad de modellen en start de video wanneer de pagina geladen is
loadModels();

function captureImage() {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  const data = canvas.toDataURL('image/png');
  localStorage.setItem('snapshot', data);
}
```

Deze HTML-pagina bevat de structuur voor een webpagina die gebruik maakt van gezichtsdetectie via de webcam. In de head-sectie worden de nodige scripts en stijlen geïmporteerd. De body-sectie bevat een welkomsttekst die de gebruiker aanspoort om op een knop te drukken om te starten. Er is ook een container die een live videostream van de webcam weergeeft, met een stijl die ervoor zorgt dat de video mooi wordt weergegeven binnen een afgeronde rechthoek. Verder zijn er secties voor het weergeven van snapshots van de videostream, een fotogalerij, en frequentiegegevens zoals het voorkomen van bepaalde gezichtsuitdrukkingen.

### Index

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Web site created using vite" />

    <script type="module" src="/main.js"></script>
    <script type="module" src="/index.js"></script>
    <script type="module" src="/style.css"></script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Titan+One&display=swap" rel="stylesheet">
  </head>
  <body>

    <div id="welcometekst">
      <p>Druk op een knop om te starten</p>
    </div>
</html>
```

### Index.js

deze code maakt verbinding met een WebSocket-server, logt een bericht wanneer de verbinding tot stand is gebracht, en controleert inkomende berichten om de gebruiker door te sturen naar een andere pagina (index2.html) als aan bepaalde voorwaarden wordt voldaan.

```javascript
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
```

### Index2

Deze variant van de indexpagina bevat een vergelijkbare structuur met enkele aanpassingen. De container voor de live videostream is opnieuw opgenomen, maar zonder een initiële welkomsttekst. Er zijn ook secties voor het weergeven van snapshots van de videostream, een fotogalerij, en frequentiegegevens zoals het voorkomen van gezichtsuitdrukkingen, maar deze zijn momenteel leeg en kunnen dynamisch worden gevuld door het JavaScript.

```html
  <body>
    <div
      style="border-radius: 10px; overflow: hidden; width: 720px; height: 560px"
    >
      <video width="100%" height="100%" autoplay muted></video>
    </div>

    <div id="welcometekst"></div>

    <div id="snapshots"></div>

    <div id="foto-galerij"></div>

    <div id="frequencyData"></div>
  </body>
</html>
```

### Intro

Deze HTML-pagina is bedoeld voor een introductiepagina die gebruikers aanmoedigt om deel te nemen aan een activiteit. De canvas en video elementen zijn beide ingesteld om de live videostream weer te geven, met een afgeronde rechthoekstijl. De welkomsttekst sectie bevat een oproep om in sereniteit te schreeuwen, gevolgd door een subtekst die de gebruikers instrueert om een knop te kiezen, diep adem te halen en zo hard mogelijk te roepen. Er zijn ook secties voor het weergeven van snapshots van de videostream, een fotogalerij, en frequentiegegevens zoals het voorkomen van gezichtsuitdrukkingen. Deze secties kunnen worden gevuld met dynamische inhoud door het JavaScript.

```html
  <body>

    <canvas
    id="video-canvas"
    width="720"
    height="560"
    style="border-radius: 10px"
  ></canvas>


    <video
      width="720"
      height="560"
      autoplay
      muted
      style="border-radius: 10px"
    ></video>

    <div id="welcometekst">
    <p>SCREAM IN SERENITY!</p></div>

    <div id="subtekst-welcome">
    <p>Kies een knop naar keuze.
      Neem nu diep adem en roep zo hard je kan.</p>

    <div id="snapshots"></div>

    <div id="foto-galerij"></div>

    <div id="frequencyData"></div>
  </body>
```

## Welkom.js

Deze functie maakt verbinding met een WebSocket-server op het opgegeven adres ('ws://10.150.197.52:1880/websocket'). Het luistert naar verschillende berichten die van de server worden ontvangen en reageert op basis van de inhoud van elk bericht door de gebruiker door te sturen naar verschillende pagina's.

```javascript
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
```

## De 4 quote pages

Deze 4 paginas zijn allemaal het zelfde opgebouwd maar hebben een andere inhoud namelijk de naamgeving en de quotes die er in staan voor de rest is het allemaal de zelfde code.

Alle stappen BUITEN STAP1 worden gebruikt in de quotes pagina's.

### Quotes-combined.html

```html
<body>
  <div id="frequencyData"></div>
  <div id="container-combined"></div>
</body>
```

### Quotes-combined.js

### Deel1:

Het definieert variabelen zoals frequencyData en container om elementen op een webpagina te vinden.
Daarna is er een array met de quotes in.
Daarnaast, het legt vaste posities vast voor de eerste vijf quotes in de array fixedPositions, wat betekent dat deze quotes altijd op dezelfde plek op de webpagina zullen verschijnen.

```javascript
const frequencyData = document.getElementById('frequencyData');
const container = document.getElementById('container-combined');

let analyser;
let bufferLength;
let dataArray;
let quoteIndex = 0;
let quoteCounter = 0;

// Array met quotes
const quotes = [
  "Don't let idiots ruin your day.",
  'Why be moody when you can shake yo booty.',
  "Never do the same mistake twice. Unless he's hot!",
  'Be like the sun keep on shining and let them burn.',
  'An apple a day keeps anyone away if you throw it hard enough.',
  'Whatever you must do today... Do it with the confidence of a 4-year old in a batman cape.',
  'If life give you lemons... add Vodka.',
  "When life shuts a door... open it again. It's a door. That's how they work.",
  'Knowledge is knowing a tomato is a fruit. Wisdom is not putting it in a fruit salad.',
  'Life is short. Smile while you still have teeth.',
  'After Tuesday, even the calendar goes W T F',
  "When something goes wrong in your life, just yell, 'PLOT TWIST!' and move on.",
  'Slow progress is better than no progress. Stay positive and never give up.',
  'The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.',
  'Your mindset is everything. It shapes your world and your reality, choose wisely!',
  "If the plan doesn't work, change the plan but never the goal.",
  'Focus on the step in front of you, not the whole staircase.',
  'Your direction is more important than your speed.',
  "Don't stop until you're proud.",
  'A negative mind will never give you a positive life.',
  'You carry so much love in your heart. Give some to yourself.',
  'You have always been enough!',
  'You owe it to yourself to become everything you were born with.',
  "Don't let insecurity ruin the beauty you were born with.",
  'You are magic, own that shit!',
  'Life is too short to spend it at war with yourself.',
  "It's not selfish to make your happiness your main priority.",
  'Your commitment to being authentic has to be greater than your desire for approval.',
  "Your life isn't yours if you always care what others think.",
  'If you focus on the hurt, you will continue to suffer. If you focus on the lesson, you will continue to grow.',
  'Reminder: You can be a good person with a kind heart and still tell people to fuck off when needed.',
  'To the world, you may be one person, but to one person you may be the world.',
];

// Vaste posities voor de eerste 5 quotes
const fixedPositions = [
  { x: '50vw', y: '50vh' },
  { x: '20vw', y: '80vh' },
  { x: '80vw', y: '20vh' },
  { x: '80vw', y: '80vh' },
  { x: '20vw', y: '20vh' },
];
```

## Deel2

Deze asynchrone functie start de microfoon van de gebruiker en begint met het detecteren van geluidsniveaus.
De volgende functie analyseert het geluidsniveau dat wordt ontvangen van de microfoon en neemt actie op basis van dat niveau.

```javascript
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
```

### deel3

De functie async function loadRandomQuote(decibel) laadt een willekeurige quote op basis van het geluidsniveau en positioneert deze op de webpagina. Het controleert eerst of er minder dan 5 quotes zijn geladen. Als dat het geval is, wordt een nieuwe quote toegevoegd op een vaste positie op de pagina. De kleur van de tekst wordt aangepast op basis van het geluidsniveau. Als er 5 quotes zijn geladen, wordt een timer gestart voor het volgende gedeelte van de pagina.

En de functie displayFrequencyData(average) wordt gebruikt om het gemiddelde geluidsniveau weer te geven op de webpagina. Het neemt het gemiddelde geluidsniveau als parameter en update vervolgens een HTML-element met de bijbehorende frequentie-informatie. Zo kunnen de mensen zien hoe luid ze geroepen hebben.

```javascript
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
```

### Deel 4

Deze functie neemt het geluidsniveau in decibels als invoer en geeft een bijpassende kleur terug. Het doet dit door te kijken naar hoe luid het geluid is en vervolgens een kleur te kiezen op basis van dat volume.

De variiabele hexBrightness berekent de helderheid van een kleur op een schaal van 0 tot 255, converteert het naar een hexadecimale waarde en zorgt ervoor dat het altijd uit twee tekens bestaat. Deze hexadecimale waarde wordt vervolgens toegevoegd aan de kleurwaarde en geretourneerd als een grijstint.

```javascript
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
```

### Deel5

De functie startNextPageTimer start een timer die na 7 seconden de gebruiker naar de volgende pagina navigeert door de window.location.href te wijzigen.

De document.addEventListener voegt een event listener toe aan het document. Wanneer er op de pagina wordt geklikt, wordt de functie startMicrofoon uitgevoerd.

De functie resetQuotesCombined reset variabelen die worden gebruikt voor het bijhouden van quotes naar hun oorspronkelijke staat.

De functie selectRandomQuotes selecteert willekeurige quotes uit de quotes array en retourneert een array van 7 unieke quotes.

```javascript
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
```

### Quotes-laugh.html

```html
<body>
  <div id="frequencyData"></div>
  <div id="container-laugh"></div>
</body>
```

### Quotes-laugh.js

Deel 2-5 zijn het zelfde als bij quotes-combined.js (Ga daar kijken voor aanvulling van je code.)

Het definieert variabelen zoals frequencyData en container om elementen op een webpagina te vinden.
Daarna is er een array met de quotes in.
Daarnaast, het legt vaste posities vast voor de eerste vijf quotes in de array fixedPositions, wat betekent dat deze quotes altijd op dezelfde plek op de webpagina zullen verschijnen.

```javascript
const frequencyData = document.getElementById('frequencyData');
const container = document.getElementById('container-laugh');

let analyser;
let bufferLength;
let dataArray;
let quoteIndex = 0;
let quoteCounter = 0;

// Array met quotes
const quotes = [
  "Don't let idiots ruin your day.",
  'Why be moody when you can shake yo booty.',
  "Never do the same mistake twice. Unless he's hot!",
  'Be like the sun keep on shining and let them burn.',
  'An apple a day keeps anyone away if you trow it hard enough.',
  'whatever you must do today... Do it with the confidence of a 4-year old in a batman cape',
  'If life give you lemons... add Vodka.',
  "When life shuts a door... open it again. It's a door. That's how they work.",
  'Knowledge is knowing a tomato is a fruit. Wisdom is not putting it in a fruit salad.',
  'Life is short. Smile while you still have teeth.',
  'After Tuesday, even the calender goes W T F',
  'When something goes wrong in your life, just yell,PLOT TWIST! and move on.',
];

// Vaste posities voor de eerste 5 quotes
const fixedPositions = [
  { x: '50vw', y: '50vh' },
  { x: '20vw', y: '80vh' },
  { x: '80vw', y: '20vh' },
  { x: '80vw', y: '80vh' },
  { x: '20vw', y: '20vh' },
];
```

### Quotes-school.html

```html
<body>
  <div id="frequencyData"></div>
  <div id="container-school"></div>
</body>
```

### Quotes-laugh.js

Deel 2-5 zijn het zelfde als bij quotes-combined.js (Ga daar kijken voor aanvulling van je code.)

Het definieert variabelen zoals frequencyData en container om elementen op een webpagina te vinden.
Daarna is er een array met de quotes in.
Daarnaast, het legt vaste posities vast voor de eerste vijf quotes in de array fixedPositions, wat betekent dat deze quotes altijd op dezelfde plek op de webpagina zullen verschijnen.

```javascript
const frequencyData = document.getElementById('frequencyData');
const container = document.getElementById('container-school');

let analyser;
let bufferLength;
let dataArray;
let quoteIndex = 0;
let quoteCounter = 0;

// Array met quotes
const quotes = [
  'Slow progress is better than no progress. Stay positive and never give up.',
  'The capacity to learn is a gift; the abilty to learn is a skill; the willing to learn is a choice.',
  'Succes is ni accident. Its hard work, perseverance, learning, studying,sacrifice and teh most of all, love of what you are doing or learning to do.',
  'Your mindset is everyting. It shapes your world and your reality, choose wisely!',
  'Succes does not lie in the results buut in efforts, being the best is nit so important, doing the best is al that matters...',
  "If the plan doesn't work, change the plan but never the goal.",
  'Focus on the step in front of you, not the whole staircase.',
  'Your direction is more important than your speed.',
  "Don't stop until you're proud.",
  'A negative mind will never give you a positive life.',
];

// Vaste posities voor de eerste 5 quotes
const fixedPositions = [
  { x: '50vw', y: '50vh' },
  { x: '20vw', y: '80vh' },
  { x: '80vw', y: '20vh' },
  { x: '80vw', y: '80vh' },
  { x: '20vw', y: '20vh' },
];
```

### Quotes-selflove.html

```html
<body>
  <div id="frequencyData"></div>
  <div id="container-selflove"></div>
</body>
```

### Quotes-selflove.js

Deel 2-5 zijn het zelfde als bij quotes-combined.js (Ga daar kijken voor aanvulling van je code.)

Het definieert variabelen zoals frequencyData en container om elementen op een webpagina te vinden.
Daarna is er een array met de quotes in.
Daarnaast, het legt vaste posities vast voor de eerste vijf quotes in de array fixedPositions, wat betekent dat deze quotes altijd op dezelfde plek op de webpagina zullen verschijnen.

```javascript
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
```
