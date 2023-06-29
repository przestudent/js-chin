import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();

function StartConfetti() {
  jsConfetti.addConfetti({
    confettiColors: [
      '#ff0a54',
      '#ff477e',
      '#ff7096',
      '#ff85a1',
      '#fbb1bd',
      '#f9bec7',
    ],
  });
}

export default StartConfetti;
