document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    openModalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
    });

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = ''; 
    });

    overlay.addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    });
});