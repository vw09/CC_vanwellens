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
  "Success is no accident. It's hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do.",
  'Your mindset is everything. It shapes your world and your reality, choose wisely!',
  "Success does not lie in the 'results' but in 'efforts', 'being' the best is not so important, 'doing' the best is all that matters...",
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
  "Don't compare your life to others. There's no comparison between the sun and the moon; they shine when it's their time.",
  "Your life isn't yours if you always care what others think.",
  'If you focus on the hurt, you will continue to suffer. If you focus on the lesson, you will continue to grow.',
  'Reminder: You can be a good person with a kind heart and still tell people to fuck off when needed.',
  'To the world, you may be one person, but to one person you may be the world.',
];

function generateRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

window.onload = function () {
  if (window.location.pathname === '/endquote.html') {
    const quote = generateRandomQuote();
    // Display the quote on the page
    const quoteElement = document.createElement('p');
    quoteElement.textContent = quote;
    document.body.appendChild(quoteElement);
  }
};

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
