const openBtn = document.getElementById('openModalBtn');
const overlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('modalCloseBtn');
const bar = document.querySelector('.bar');
const textWhite = document.querySelector('.text-white');

let currentInterval = null; 

function openModal() {
    overlay.style.display = 'flex';

    bar.style.width = '0%';
    textWhite.style.clipPath = 'inset(0 100% 0 0)';

    animateProgress();
}

function closeModal() {
    overlay.style.display = 'none';
    
    if (currentInterval) {
        clearInterval(currentInterval);
        currentInterval = null;
    }
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') {
        closeModal();
    }
});

function animateProgress() {
    let progress = 0;

    const duration = 3000;
    const fps = 60;
    const stepTime = 1000 / fps;
    const step = 100 / (duration / stepTime);

    if (currentInterval) {
        clearInterval(currentInterval);
    }

    currentInterval = setInterval(() => {
        progress += step;

        if (progress >= 100) {
            bar.style.width = '100%';
            textWhite.style.clipPath = 'inset(0 0% 0 0)';
            
            clearInterval(currentInterval);
            currentInterval = null;
            
            setTimeout(() => {
                closeModal();
            }, 50);
            return;
        }

        bar.style.width = progress + '%';
        textWhite.style.clipPath = `inset(0 ${100 - progress}% 0 0)`;

    }, stepTime);
}