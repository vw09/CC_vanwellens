const container = document.getElementById('confetti-container');

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = Math.random() * window.innerWidth + 'px';
  confetti.style.backgroundColor = getRandomColor();
  container.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 20000); // Remove confetti after 2 seconds
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

setInterval(createConfetti, 100); // Create confetti every 100 milliseconds
