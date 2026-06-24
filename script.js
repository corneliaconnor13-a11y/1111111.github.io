(() => {
  const opening = document.getElementById('opening');
  const enterSite = document.getElementById('enterSite');
  const toast = document.getElementById('toast');
  const soundToggle = document.getElementById('soundToggle');
  const soundText = document.getElementById('soundText');
  const helpButton = document.getElementById('helpButton');
  const helpDialog = document.getElementById('helpDialog');
  const closeHelp = document.getElementById('closeHelp');
  const closeHelpButton = document.getElementById('closeHelpButton');
  const year = document.getElementById('year');
  const scene = document.querySelector('.scene');
  const floatObjects = [...document.querySelectorAll('.float-object')];
  const tiltCards = [...document.querySelectorAll('.tilt-card')];
  let toastTimer;
  let audioCtx;
  let soundOn = false;

  year.textContent = new Date().getFullYear();

  const dismissOpening = () => {
    opening.classList.add('is-hidden');
    opening.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.body.style.overflow = 'hidden';
  enterSite.addEventListener('click', dismissOpening);
  opening.addEventListener('click', (event) => {
    if (event.target === opening) dismissOpening();
  });

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('show');
    if (soundOn) playChime();
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3600);
  }

  document.querySelectorAll('[data-toast]').forEach((element) => {
    element.addEventListener('click', () => showToast(element.dataset.toast));
  });

  function createAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }

  function playChime() {
    try {
      const ctx = createAudio();
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      gain.connect(ctx.destination);
      [523.25, 659.25].forEach((frequency, index) => {
        const oscillator = ctx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, now + index * 0.04);
        oscillator.connect(gain);
        oscillator.start(now + index * 0.04);
        oscillator.stop(now + .24);
      });
    } catch (_) {
      // Sound is optional; the page still works if browsers block Web Audio.
    }
  }

  soundToggle.addEventListener('click', () => {
    soundOn = !soundOn;
    soundToggle.setAttribute('aria-pressed', String(soundOn));
    soundText.textContent = soundOn ? '提示音开启' : '安静模式';
    showToast(soundOn ? '叮！小提示音已开启。' : '已回到安静模式。');
  });

  helpButton.addEventListener('click', () => helpDialog.showModal());
  closeHelp.addEventListener('click', () => helpDialog.close());
  closeHelpButton.addEventListener('click', () => helpDialog.close());
  helpDialog.addEventListener('click', (event) => {
    const bounds = helpDialog.getBoundingClientRect();
    const isOutside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (isOutside) helpDialog.close();
  });

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isReducedMotion && scene) {
    let rafId = null;
    let pointerX = 0;
    let pointerY = 0;

    scene.addEventListener('pointermove', (event) => {
      const rect = scene.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - .5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - .5) * 2;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        floatObjects.forEach((item) => {
          const depth = Number(item.dataset.depth || .2);
          item.style.translate = `${pointerX * depth * 11}px ${pointerY * depth * 9}px`;
        });
        rafId = null;
      });
    });

    scene.addEventListener('pointerleave', () => {
      floatObjects.forEach((item) => { item.style.translate = '0 0'; });
    });

    tiltCards.forEach((card) => {
      const maxTilt = Number(card.dataset.tilt || 2);
      card.addEventListener('pointermove', (event) => {
        if (window.matchMedia('(max-width: 760px)').matches) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.rotate = `${x * maxTilt}deg`;
        card.style.translate = `${x * 4}px ${y * 4}px`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.rotate = '';
        card.style.translate = '';
      });
    });
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !opening.classList.contains('is-hidden')) dismissOpening();
  });
})();
