
const screens = [...document.querySelectorAll('.screen')];
const progress = document.getElementById('progressFill');

let current = 0;
let noCount = 0;
let qCount = 0;
let soundOn = false;

function go(n) {
  if (!screens[n]) return;

  screens.forEach(screen => screen.classList.remove('active'));

  current = n;
  screens[current].classList.add('active');

  if (progress) {
    progress.style.width =
      ((current + 1) / screens.length * 100) + '%';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;

  t.textContent = msg;
  t.classList.add('show');

  setTimeout(() => {
    t.classList.remove('show');
  }, 2200);
}

// FIRST SCREEN - NO THANKS

const noLines = [
  'Nice try. The YES button is right there. 😌',
  'The penguin has reviewed your decision. It disagrees.',
  'Error 404: “No” not found. Try again.',
  'You really thought you had a choice? 😂'
];

const noBtn = document.getElementById('noBtn');

if (noBtn) {
  noBtn.addEventListener('click', () => {
    const message = document.getElementById('noMessage');

    if (message) {
      message.textContent = noLines[noCount % noLines.length];
    }

    noCount++;

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
      message.textContent =
        choiceTexts[Number(card.dataset.penguin)] || choiceTexts[0];
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

// OKAY, NEXT SURPRISE

const toQuestion = document.getElementById('toQuestion');

if (toQuestion) {
  toQuestion.addEventListener('click', () => go(3));
}

// QUESTION - NO BUTTON

const qMessages = [
  'Incorrect. Please consult your heart and retry.',
  'The penguin has filed a formal complaint.',
  'That button is decorative. Obviously.',
  'One more try… for science.'
];

const qNo = document.getElementById('questionNo');

if (qNo) {
  qNo.addEventListener('click', () => {
    const message = document.getElementById('questionMessage');

    if (message) {
      message.textContent = qMessages[qCount % qMessages.length];
    }

    qCount++;

    qNo.style.transform =
      `translate(${Math.random() * 110 - 55}px, ${Math.random() * 24 - 12}px)`;
  });
}

// QUESTION - YES BUTTON

const questionYes = document.getElementById('questionYes');

if (questionYes) {
  questionYes.addEventListener('click', () => {
    toast('Correct answer. Excellent taste. 💗');

    setTimeout(() => {
      go(4);
    }, 650);
  });
}

// RESTART

const restartBtn = document.getElementById('restartBtn');

if (restartBtn) {
  restartBtn.addEventListener('click', () => {
    const message = document.getElementById('noMessage');

    if (message) {
      message.textContent =
        '(there is a correct answer, just saying)';
    }

    noCount = 0;
    qCount = 0;

    go(0);
  });
}

// BACKGROUND MUSIC

const music = document.getElementById('bgMusic');
const soundToggle = document.getElementById('soundToggle');

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

        toast('Music error: ' + error.message);
      }
    } else {
      music.pause();

      soundOn = false;
      soundToggle.textContent = '♫ sound off';
    }
  });

  music.addEventListener('error', () => {
    console.error('Audio file could not load:', music.error);
    toast('Audio file could not load. Check assets/birthday.mp3');
  });
}

// INITIAL PROGRESS

go(0);
