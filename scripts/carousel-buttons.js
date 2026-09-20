const track = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

function getScrollAmount() {
    return window.innerWidth * 0.6;
}

prevBtn.addEventListener('click', () => {
  track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
});