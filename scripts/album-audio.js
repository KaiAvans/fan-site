
const albumAudio = document.getElementById('album-audio');
const albumContainers = document.querySelectorAll('.album-container');
const casettePlayer = document.getElementById('casette-player');
const volumeSlider = document.getElementById('volume-slider');

function updatePlayingStateForEachAlbum() {
    albumContainers.forEach(container => {
        const src = container.dataset.audio;
        const isThisPlaying = src && albumAudio.src.endsWith(src) && !albumAudio.paused;
        container.classList.toggle('playing', isThisPlaying);
    });
}

albumContainers.forEach(container => {
    container.addEventListener('click', () => {
        const src = container.dataset.audio;
        if (!src) return;

        if (albumAudio.src.endsWith(src) && !albumAudio.paused) {
            albumAudio.pause();
        } else {
            albumAudio.src = src;
            albumAudio.play();
        }
    });
});

albumAudio.addEventListener('play', () => {
    document.body.classList.add('music-playing');
    updatePlayingStateForEachAlbum();
});

albumAudio.addEventListener('pause', () => {
    document.body.classList.remove('music-playing');
    updatePlayingStateForEachAlbum();
});

albumAudio.addEventListener('ended', () => {
    document.body.classList.remove('music-playing');
    updatePlayingStateForEachAlbum();
});

albumAudio.volume = volumeSlider.value;
volumeSlider.addEventListener('input', (e) => updateVolumeSlider(e.target));
volumeSlider.addEventListener('click', (e) => e.stopPropagation());

let previousVolume = volumeSlider.value;
let isMuted = false;

casettePlayer.addEventListener('click', () => {
    if (!isMuted) {
        previousVolume = volumeSlider.value
        volumeSlider.value = 0;
        albumAudio.volume = 0;
        isMuted = true;
        document.body.classList.add('muted');
    } else {
        volumeSlider.value = previousVolume;
        albumAudio.volume = previousVolume;
        isMuted = false;
        document.body.classList.remove('muted');
    }
    updateVolumeSlider(volumeSlider);
});

const updateVolumeSlider = (el) => {
    const min = el.min || 0;
    const max = el.max || 100;
    const pct = (el.value - min) / (max - min) * 100;
    el.style.setProperty('--range-pct', pct + '%');
    albumAudio.volume = volumeSlider.value;
    if (isMuted && volumeSlider.value > 0) {
        isMuted = false;
        casettePlayer.classList.remove('muted');
    }
};

updateVolumeSlider(volumeSlider);