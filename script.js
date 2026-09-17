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
