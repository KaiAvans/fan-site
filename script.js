function setLanguage(language) {
    var elements = document.querySelectorAll("[data-en]");

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        var englishText = element.getAttribute("data-en");
        var japaneseText = element.getAttribute("data-ja");

        // only switch to japanese if a translation exists, otherwise just default to english (some albums/text are always displayed in english)
        if (language === "ja" && japaneseText !== "" && japaneseText !== null) {
            element.innerHTML = japaneseText;
        } else {
            element.innerHTML = englishText;
        }
    }
    document.documentElement.setAttribute("lang", language);
    updateButton(language);
}

function updateButton(language) {
    var button = document.getElementById("lang-toggle");
    if (button !== null) {
        if (language === "en") {
            button.textContent = "JP";
        } else {
            button.textContent = "EN";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("lang-toggle");
    if (button !== null) {
        button.addEventListener("click", function () {
            var currentLanguage = document.documentElement.getAttribute("lang");
            if (currentLanguage === "en") {
                setLanguage("ja");
            } 
            else if (currentLanguage === "ja") {
                setLanguage("en");
            }
        });
    }
});

const albumAudio = document.getElementById('album-audio');
const albumContainers = document.querySelectorAll('.album-container');

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

const casettePlayer = document.getElementById('casette-player');
const volumeSlider = document.getElementById('volume-slider');

albumAudio.addEventListener('play', () => {
    casettePlayer.classList.add('playing');
});
albumAudio.addEventListener('pause', () => {
    casettePlayer.classList.remove('playing');
});
albumAudio.addEventListener('ended', () => {
    casettePlayer.classList.remove('playing');
});
albumAudio.volume = volumeSlider.value;

volumeSlider.addEventListener('input', () => {
    albumAudio.volume = volumeSlider.value;
    localStorage.setItem('albumVolume', volumeSlider.value);
    if (isMuted && volumeSlider.value > 0) {
        isMuted = false;
        casettePlayer.classList.remove('muted');
    }
});

volumeSlider.addEventListener('click', (e) => e.stopPropagation());

let previousVolume = volumeSlider.value;
let isMuted = false;

casettePlayer.addEventListener('click', () => {
    if (!isMuted) {
        previousVolume = volumeSlider.value
        volumeSlider.value = 0;
        albumAudio.volume = 0;
        isMuted = true;
        casettePlayer.classList.add('muted');
    } else {
        volumeSlider.value = previousVolume;
        albumAudio.volume = previousVolume;
        isMuted = false;
        casettePlayer.classList.remove('muted');
    }
});
