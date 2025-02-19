import { languages } from "../../constants/languages";
import { ChevronIcon } from "../icons";

export function LanguageSelector(currentLanguage) {
  return `<div class="relative text-textPrimary">
            <button id="language-selector" type="button" class="bg-bgElementPrimary rounded-md flex items-center justify-center gap-x-[6px] text-textPrimary font-manrope w-14 h-7 md:w-[59px] md:h-10">
              <span id="current-language">${currentLanguage}</span>

              ${ChevronIcon()}
            </button>
  
            <div id="language-dropdown" class="overflow-hidden w-full absolute right-0 mt-3 bg-bgElementPrimary shadow-md rounded-md hidden py-1">

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
  const chevronIcon = languageSelector.querySelector("svg");
  const currentLang = localStorage.getItem("language") || "ru";

  if (!dropdown || !languageSelector) return;

  if (e.target.closest("#language-selector")) {
    dropdown.classList.toggle("hidden");
    chevronIcon.classList.toggle("rotate-180");

    buttons.forEach((btn) => {
      if (btn.dataset.lang === currentLang) {
        btn.classList.add("text-textPrimary");
      } else {
        btn.classList.remove("text-textPrimary");
        btn.classList.add("text-gray");
      }
    });
  }

  if (!dropdown.contains(e.target) && !languageSelector.contains(e.target)) {
    dropdown.classList.add("hidden");
    chevronIcon.classList.add("rotate-180");
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
