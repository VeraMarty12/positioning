document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const progressBar = document.getElementById('progressBar');

  openModalBtn.addEventListener('click', function () {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    startProgressAnimation();
  });

  closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });

  function startProgressAnimation() {
    let progress = 0;
    progressFill.style.width = '0';
    progressText.textContent = 'Loading...';
    progressText.style.color = '#000';

    const text = progressText.textContent;
    progressText.textContent = '';

    const letters = [];
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.position = 'relative';
      span.style.zIndex = '2';
      progressText.appendChild(span);
      letters.push(span);
    }

    const duration = 3000;
    const startTime = performance.now();

    function updateProgress(currentTime) {
      const elapsedTime = currentTime - startTime;
      progress = Math.min((elapsedTime / duration) * 100, 100);
      progressFill.style.width = `${progress}%`;

      const barRect = progressBar.getBoundingClientRect();
      const fillWidth = barRect.width * (progress / 100);

      letters.forEach((letter) => {
        const letterRect = letter.getBoundingClientRect();
        const letterLeft = letterRect.left - barRect.left;

        if (letterLeft < fillWidth) {
          letter.style.color = '#fff';
        } else {
          letter.style.color = '#000';
        }
      });

      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          modal.style.display = 'none';
          overlay.style.display = 'none';
        }, 500);
      }
    }

    requestAnimationFrame(updateProgress);
  }
});