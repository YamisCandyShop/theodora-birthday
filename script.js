
const screens = [...document.querySelectorAll('.screen')];
const progress = document.getElementById('progressFill');
let current = 0;

function go(n) {
  if (!screens[n]) return;

  screens[current].classList.remove('active');
  current = n;
  screens[current].classList.add('active');

  if (progress) {
    progress.style.width = ((n + 1) / screens.length * 100) + '%';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;

  t.textContent = msg;
  t.classList.add('show');

  setTimeout(() => t.classList.remove('show'), 2200);
}

// NO THANKS BUTTON
const noLines = [
  'Nice try. The YES button is right there. 😌',
  'The penguin has reviewed your decision. It disagrees.',
  'Error 404: “No” not found. Try again.',
  'You really thought you had a choice? 😂'
];

let noCount = 0;

const noBtn = document.getElementById('noBtn');

if (noBtn) {
  noBtn.addEventListener('click', () => {
    document.getElementById('noMessage').textContent =
      noLines[noCount++ % noLines.length];

    noBtn.style.transform =
      `translate(${Math.random() * 90 - 45}px, ${Math.random() * 24 - 12}px)`;
  });
}

// ACCEPT BUTTON
const acceptBtn = document.getElementById('acceptBtn');

if (acceptBtn) {
  acceptBtn.addEventListener('click', () => go(1));
}

// PENGUIN SELECTION
const choiceTexts = [
  'Awww. This one says you deserve the whole cake. Not just a slice. 🍰',
  'Chaotic bestie energy detected. This penguin has definitely eaten glitter.',
  'This one wrote you a 14-page poem. It is mostly about fish.'
];

document.querySelectorAll('.penguin-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.penguin-card').forEach(c => {
      c.classList.remove('selected');
    });

    card.classList.add('selected');

    const message = document.getElementById('choiceMessage');
    if (message) {
      message.textContent = choiceTexts[Number(card.dataset.penguin)];
    }

    const nextButton = document.getElementById('toBirthday');
    if (nextButton) {
      nextButton.classList.remove('hidden');
    }
  });
});

// CONTINUE TO BIRTHDAY
const toBirthday = document.getElementById('toBirthday');

if (toBirthday) {
  toBirthday.addEventListener('click', () => go(2));
}

// CONTINUE TO QUESTION
const toQuestion = document.getElementById('toQuestion');

if (toQuestion) {
  toQuestion.addEventListener('click', () => go(3));
}

// QUESTION NO BUTTON
const qNo = document.getElementById('questionNo');

let qCount = 0;

const qMessages = [
  'Incorrect. Please consult your heart and retry.',
  'The penguin has filed a formal complaint.',
  'That button is decorative. Obviously.',
  'One more try… for science.'
];

if (qNo) {
  qNo.addEventListener('click', () => {
    document.getElementById('questionMessage').textContent =
      qMessages[qCount++ % qMessages.length];

    qNo.style.transform =
      `translate(${Math.random() * 110 - 55}px, ${Math.random() * 24 - 12}px)`;
  });
}

// QUESTION YES BUTTON
const questionYes = document.getElementById('questionYes');

if (questionYes) {
  questionYes.addEventListener('click', () => {
    toast('Correct answer. Excellent taste. 💗');

    setTimeout(() => go(4), 650);
  });
}

// RESTART BUTTON
const restartBtn = document.getElementById('restartBtn');

if (restartBtn) {
  restartBtn.addEventListener('click', () => {
    document.getElementById('noMessage').textContent =
      '(there is a correct answer, just saying)';

    noCount = 0;
    qCount = 0;

    go(0);
  });
}

// BACKGROUND MUSIC
const music = document.getElementById('bgMusic');
const soundToggle = document.getElementById('soundToggle');

let soundOn = false;

if (music && soundToggle) {
  soundToggle.addEventListener('click', async () => {
    if (!soundOn) {
      try {
        music.volume = 1;
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
