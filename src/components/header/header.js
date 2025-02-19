import { text } from "../../constants/text";
import { languages } from "../../constants/languages";

import { Nav } from "./nav";
import { MenuBtn } from "./menu-btn";
import { LanguageSelector } from "./language-selector";
import { HeaderTitle } from "./header-title";
import { MobileMenu } from "./mobile-menu";

import { FinlabLogoIcon, VerificationStarIcon } from "../icons";

import { navigateTo } from "../../router";
import { ToggleIconTheme } from "../toggle-icon-theme";

const userName = "Diana S.";

const currentLanguage = localStorage.getItem("language") || "ru";

const getPageName = () => {
  const route = window.location.pathname;

  switch (route) {
    case text.market.route:
      return text.market.pageName;

    case text.profile.route:
      return text.profile.pageName;

    default:
      return text.home.pageName;
  }
};

export function Header() {
  return `
    <header class="flex justify-between items-center text-white py-[7px] h-10">

    <div class="flex items-center md:hidden">
    ${MenuBtn()}
    ${HeaderTitle(getPageName())}
    </div>

    <div class="hidden items-center md:flex md:gap-x-16">
    ${FinlabLogoIcon()}
    ${Nav()}
    </div>

    <div class="flex gap-x-3 items-center">
    <div class="hidden md:flex md:items-center">${ToggleIconTheme()}</div>

    ${LanguageSelector(languages[currentLanguage])}

    <button id="go-to-profile" type="button" class="bg-bgElementPrimary rounded-[6px] flex justify-center items-center gap-x-[6px] h-7 px-2 md:h-10">    
    ${VerificationStarIcon()}
    <span class="text-sm leading-[1.71]">${userName}</span>
    </button>
    </div>

    <div id="menu-container" class="fixed"></div>
    </header>
  `;
}

const closeMobileMenu = () => {
  const menu = document.getElementById("mobile-menu");
  if (menu && !menu.classList.contains("translate-x-full")) {
    menu.classList.add("translate-x-full");
    setTimeout(() => {
      document.getElementById("menu-container").innerHTML = "";
    }, 300);
  }
};

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    closeMobileMenu();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest("#go-to-profile")) {
    navigateTo("/profile");
  }

  if (e.target.closest("#menu-btn")) {
    document.getElementById("menu-container").innerHTML = MobileMenu();
    setTimeout(() => {
      document
        .getElementById("mobile-menu")
        .classList.remove("translate-x-full");
    }, 10);
  }

  if (e.target.closest("#close-menu")) {
    closeMobileMenu();
  }
});
