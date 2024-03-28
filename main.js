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
