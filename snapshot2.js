import './style.css';
import * as faceapi from 'face-api.js';

const video = document.querySelector('video');
let snapshotTaken = false; // Variabele om bij te houden of er al een snapshot is genomen
let snapshotTaken2 = false; // Variabele om bij te houden of er al een tweede snapshot is genomen

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
      .withFaceExpressions();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    console.log('Detections:', detections.length);

    // Maak een snapshot van het canvas als er nog geen snapshot is genomen
    if (!snapshotTaken && detections.length > 0) {
      const snapshot = canvas.toDataURL('image/png');

      console.log(' snapshot2 genomen:', snapshot);
      snapshotTaken = true; // Markeer dat er een snapshot is genomen

      localStorage.setItem('snapshot2', snapshot);
      console.log(detections);
      localStorage.setItem(
        'expression',
        JSON.stringify(detections[0].expressions),
      );

      //location.assign('/'); nog locatie toe te voegen
    }

    // Maak een tweede snapshot als er nog geen tweede snapshot is genomen en er gezichtsdetectie heeft plaatsgevonden
    if (!snapshotTaken2 && detections.length > 0) {
      const snapshot2 = canvas.toDataURL('image/png');

      console.log('Tweede snapshot genomen:', snapshot2);
      snapshotTaken2 = true; // Markeer dat er een tweede snapshot is genomen

      localStorage.setItem('snapshot2', snapshot2);
    }
    location.assign('/snapshots');
  }, 7000);
});

// Laad de modellen en start de video wanneer de pagina geladen is
loadModels();
