document.addEventListener('DOMContentLoaded', function () {
  // Haal de opgeslagen screenshots op uit de local storage
  const snapshot = localStorage.getItem('snapshot');
  const snapshot2 = localStorage.getItem('snapshot2');

  // Voeg de screenshots toe aan de DOM
  const snapshotImg = document.getElementById('snapshot');
  const snapshot2Img = document.getElementById('snapshot2');

  if (snapshot) {
    snapshotImg.src = snapshot;
  } else {
    snapshotImg.alt = 'Geen screenshot gevonden';
  }

  if (snapshot2) {
    snapshot2Img.src = snapshot2;
  } else {
    snapshot2Img.alt = 'Geen screenshot gevonden';
  }
});
d;
