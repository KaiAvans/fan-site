function setLanguage(language) {
    var elements = document.querySelectorAll("[data-en]");

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        var englishText = element.getAttribute("data-en");
        var japaneseText = element.getAttribute("data-ja");

        if (language === "ja" && japaneseText !== "" && japaneseText !== null) {
            element.innerHTML = japaneseText;
        } else {
            element.innerHTML = englishText;
        }
    }
    document.documentElement.setAttribute("lang", language);
    updateButton(language);
    updateNowPlayingText();
}

function updateButton(language) {
    var buttons = document.querySelectorAll(".lang-toggle");
    buttons.forEach(function (button) {
        if (button !== null) {
            if (language === "en") {
                button.textContent = "JP";
                button.style.color = "black";
                button.style.backgroundColor = "white";
            } else {
                button.textContent = "EN";
                button.style.backgroundColor = "black";
                button.style.color = "white";
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".lang-toggle");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var currentLanguage = document.documentElement.getAttribute("lang");
            if (currentLanguage === "en") {
                setLanguage("ja");
            } else if (currentLanguage === "ja") {
                setLanguage("en");
            }
        });
    });
});
