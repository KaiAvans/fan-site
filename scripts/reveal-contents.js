window.addEventListener('DOMContentLoaded', () => {
    const row = document.querySelector('.row');
    setTimeout(() => {
        row.classList.add('revealed');
        document.body.classList.add('revealed');
    }, 1000)
});