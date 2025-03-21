import { mockup, languages } from "../../constants";

import { Nav } from "./nav";
import { MenuBtn } from "./menu-btn";
import { LanguageSelector } from "./language-selector";
import { HeaderTitle } from "./header-title";
import { MobileMenu } from "./mobile-menu";

import finlabLogoIcon from "../../assets/icons/finlab-logo-icon.svg?raw";

import { navigateTo } from "../../router";
import { ToggleIconTheme } from "./toggle-icon-theme";

import verificationStarIcon from "../../assets/icons/verification-start-icon.svg?raw";

const currentLanguage = localStorage.getItem("language") || "ru";

const getPageName = () => {
  const route = window.location.pathname;

  switch (route) {
    case mockup.market.route:
      return mockup.market.pageName;

    case mockup.profile.route:
      return mockup.profile.pageName;

    default:
      return mockup.home.pageName;
  }
};

export function Header() {
  Alpine.store("market").balanceUSDT = mockup.user.balanceUSDT;

  return `
    <header class="custom-container flex justify-between items-center text-white py-[7px] h-10">

    <div class="flex items-center md:hidden">
    ${MenuBtn()}
    ${HeaderTitle(getPageName())}
    </div>

    <div class="hidden items-center md:flex md:gap-x-5 lg:gap-x-16">
    ${finlabLogoIcon}
    ${Nav()}
    </div>

    <div class="flex gap-x-2 lg:gap-x-3 items-center">
    <div class="hidden md:flex md:items-center">
        ${ToggleIconTheme()}
    </div>

    ${LanguageSelector(languages[currentLanguage])}

    <button id="go-to-profile" type="button" class="bg-bg-element-primary rounded-[6px] flex justify-center items-center gap-x-[6px] h-7 px-2 md:h-10 max-w-[128px] lg:max-w-auto">    
        <span class="shrink-0 w-[18px] h-[19px] md:w-6 md:h-6">${verificationStarIcon}</span>
        <span class="text-sm truncate">
          ${mockup.user.name}
        </span>
    </button>
    </div>

    </header>
  `;
}

document.body.insertAdjacentHTML(
  "beforeend",
  `
  <div id="menu-container" class="fixed inset-0 z-10 pointer-events-none"></div>
  `
);

const menuContainer = document.getElementById("menu-container");

const closeMobileMenu = () => {
  const menu = document.getElementById("mobile-menu");
  if (menu && !menu.classList.contains("translate-x-full")) {
    menu.classList.add("translate-x-full");

    menuContainer.classList.add("pointer-events-none");

    document.body.classList.remove("no-scroll");

    setTimeout(() => {
      document.getElementById("menu-container").innerHTML = "";
    }, 300);
  }
};

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeMobileMenu();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest("#go-to-profile")) {
    navigateTo("/profile");
  }

  if (e.target.closest("#menu-btn")) {
    document.getElementById("menu-container").innerHTML = MobileMenu();
    document.body.classList.add("no-scroll");

    setTimeout(() => {
      const menu = document.getElementById("mobile-menu");
      menu.classList.remove("translate-x-full");
    }, 10);
    menuContainer.classList.remove("pointer-events-none");
  }

  if (e.target.closest("#close-menu")) {
    closeMobileMenu();
  }
});
