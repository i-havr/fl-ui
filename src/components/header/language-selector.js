import { languages } from "../../constants";
import chevronIcon from "../../assets/icons/chevron-icon.svg?raw";

export function LanguageSelector(currentLanguage) {
  return `<div class="relative text-text-primary">
            <button id="language-selector" type="button" class="bg-bg-element-primary rounded-md flex items-center justify-center gap-x-[6px] text-text-primary font-manrope w-14 h-7 md:w-[59px] md:h-10">
              <span id="current-language">${currentLanguage}</span>
              <span class="chevron-icon-wrapper block rotate-180 transition-transform duration-200 ease-out">${chevronIcon}</span>
            </button>
  
            <div id="language-dropdown" class="overflow-hidden w-full absolute right-0 mt-3 bg-bg-element-primary shadow-md rounded-md hidden py-1">

                <button class="lang-btn font-manrope font-medium text-sm block w-full text-left px-4 py-2 hover:bg-gray-700 leading-[1.4]" data-lang="ru">RU</button>

                <button class="lang-btn font-manrope font-medium text-sm block w-full text-left px-4 py-2 hover:bg-gray-700 leading-[1.4]" data-lang="en">EN</button>

                <button class="lang-btn font-manrope font-medium text-sm block w-full text-left px-4 py-2 hover:bg-gray-700 leading-[1.4]" data-lang="ua">UA</button>
            </div>
          </div>`;
}

document.addEventListener("click", (e) => {
  const languageSelector = document.getElementById("language-selector");
  const dropdown = document.getElementById("language-dropdown");
  const buttons = document.querySelectorAll(".lang-btn");
  const chevronIconWrapper = languageSelector.querySelector(
    ".chevron-icon-wrapper"
  );
  const currentLang = localStorage.getItem("language") || "ru";

  if (!dropdown || !languageSelector) return;

  if (e.target.closest("#language-selector")) {
    dropdown.classList.toggle("hidden");
    chevronIconWrapper.classList.toggle("rotate-180");

    buttons.forEach((btn) => {
      if (btn.dataset.lang === currentLang) {
        btn.classList.add("text-text-primary");
      } else {
        btn.classList.remove("text-text-primary");
        btn.classList.add("text-gray");
      }
    });
  }

  if (!dropdown.contains(e.target) && !languageSelector.contains(e.target)) {
    dropdown.classList.add("hidden");
    chevronIconWrapper.classList.add("rotate-180");
  }

  if (e.target.dataset.lang) {
    const newLang = e.target.dataset.lang;

    localStorage.setItem("language", newLang);

    document.getElementById("current-language").textContent =
      languages[newLang];

    document.getElementById("language-dropdown").classList.add("hidden");

    location.reload();
  }
});
