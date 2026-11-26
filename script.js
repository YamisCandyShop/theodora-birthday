
const screens = [...document.querySelectorAll('.screen')];
const progress = document.getElementById('progressFill');

let current = 0;
let chosen = false;

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
  setTimeout(() => t.classList.remove('show'), 5000);
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
    `translate(${(Math.random() * 90 - 45)}px,${(Math.random() * 24 - 12)}px)`;
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

document.getElementById('photoUpload').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    document.getElementById('photoSlot').innerHTML =
      `<img alt="Your uploaded photo" src="${reader.result}">`;

    toast('Photo added in this browser!');
  };

  reader.readAsDataURL(file);
});

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
  go(0);
});

const editor = document.getElementById('editor');

document.getElementById('editToggle').addEventListener('click', () =>
  editor.classList.toggle('open')
);

document.getElementById('closeEditor').addEventListener('click', () =>
  editor.classList.remove('open')
);

document.getElementById('applyEdits').addEventListener('click', () => {
  document.getElementById('birthdayMessage').textContent =
    document.getElementById('editMessage').value;

  document.querySelector('.signature').textContent =
    '— ' + document.getElementById('editSignature').value;

  document.querySelector('.final-note p:nth-child(2)').textContent =
    document.getElementById('editFinal').value;

  editor.classList.remove('open');
  toast('Your edits are applied in this browser!');
});

document.getElementById('downloadSettings').addEventListener('click', () => {
  const data = {
    birthdayMessage: document.getElementById('editMessage').value,
    signature: document.getElementById('editSignature').value,
    finalNote: document.getElementById('editFinal').value
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'theodora-birthday-texts.json';
  a.click();

  URL.revokeObjectURL(a.href);
  toast('Text settings downloaded!');
});

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

        toast(
          'Error: ' + error.name + ' - ' + error.message
        );
      }
    } else {
      music.pause();
      soundOn = false;
      soundToggle.textContent = '♫ sound off';
    }
  });

  music.addEventListener('error', () => {
    console.error('Audio file error:', music.error);

    if (music.error) {
      toast('Audio file error code: ' + music.error.code);
    }
  });
} else {
  console.error('Music element or sound button not found!');
}
