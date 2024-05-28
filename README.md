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

### Installatie

Voordat je de code kunt uitvoeren, moet je ervoor zorgen dat je de face-api.js-bibliotheek hebt geïnstalleerd. Je kunt deze bibliotheek installeren via npm.

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
