
const screens = [...document.querySelectorAll('.screen')];
const progress = document.getElementById('progressFill');
let current = 0, chosen = false;

function go(n) {
  screens[current].classList.remove('active');
  current = n;
  screens[current].classList.add('active');
  progress.style.width = ((n + 1) / screens.length * 100) + '%';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

const noLines = [
  'Nice try. The YES button is right there. 😌',
  'The penguin has reviewed your decision. It disagrees.',
  'Error 404: “No” not found. Try again.',
  'You really thought you had a choice? 😂'
];

let noCount = 0;

document.getElementById('noBtn').addEventListener('click', () => {
  document.getElementById('noMessage').textContent =
    noLines[noCount++ % noLines.length];

  const b = document.getElementById('noBtn');
  b.style.transform =
    `translate(${Math.random() * 90 - 45}px,${Math.random() * 24 - 12}px)`;
});

document.getElementById('acceptBtn').addEventListener('click', () => go(1));

const choiceTexts = [
  'Awww. This one says you deserve the whole cake. Not just a slice. 🍰',
  'Chaotic bestie energy detected. This penguin has definitely eaten glitter.',
  'This one wrote you a 14-page poem. It is mostly about fish.'
];

document.querySelectorAll('.penguin-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.penguin-card').forEach(c =>
      c.classList.remove('selected')
    );

    card.classList.add('selected');

    document.getElementById('choiceMessage').textContent =
      choiceTexts[+card.dataset.penguin];

    document.getElementById('toBirthday').classList.remove('hidden');
    chosen = true;
  });
});

document.getElementById('toBirthday').addEventListener('click', () => go(2));

document.getElementById('toQuestion').addEventListener('click', () => go(3));

const qNo = document.getElementById('questionNo');
let qCount = 0;

const qMessages = [
  'Incorrect. Please consult your heart and retry.',
  'The penguin has filed a formal complaint.',
  'That button is decorative. Obviously.',
  'One more try… for science.'
];

qNo.addEventListener('click', () => {
  document.getElementById('questionMessage').textContent =
    qMessages[qCount++ % qMessages.length];

  qNo.style.transform =
    `translate(${Math.random() * 110 - 55}px,${Math.random() * 24 - 12}px)`;
});

document.getElementById('questionYes').addEventListener('click', () => {
  toast('Correct answer. Excellent taste. 💗');
  setTimeout(() => go(4), 650);
});

document.getElementById('restartBtn').addEventListener('click', () => {
  document.getElementById('noMessage').textContent =
    '(there is a correct answer, just saying)';

  noCount = 0;
  qCount = 0;
  go(0);
});

// Background music
const music = document.getElementById('bgMusic');
const soundToggle = document.getElementById('soundToggle');

let soundOn = false;

if (music && soundToggle) {
  soundToggle.addEventListener('click', async () => {
    if (!soundOn) {
      try {
        await music.play();
        soundOn = true;
        soundToggle.textContent = '♫ sound on';
      } catch (error) {
        console.error('Music playback error:', error);
        toast('Could not play music. Check the MP3 file.');
      }
    } else {
      music.pause();
      soundOn = false;
      soundToggle.textContent = '♫ sound off';
    }
  });
}
