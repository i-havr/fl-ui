import cn from "classnames";

import { toggleTheme } from "../helpers/toggleTheme";
import { MoonIcon, SunIcon } from "./icons";

const isCurrentThemeLight = () => localStorage.getItem("theme") === "light";

const toggleSwitchStyle = (isSelected) => {
  return cn(
    "absolute top-1/2 -translate-y-1/2 size-8 rounded-[4px] shadow-md transition-all duration-300 ease-in-out bg-gray-secondary",
    {
      "left-[calc(100%-38px)]": isSelected,
      "left-[6px]": !isSelected
    }
  );
};

export function ToggleIconTheme() {
  return `
    <button id="theme-icon-toggle" type="button" class="relative transition-all duration-300 h-10 w-20 cursor-pointer rounded-lg ease-in-out bg-bgElementPrimary flex items-center justify-center gap-x-[5px]">

    <div id="theme-icon-toggle-switch" class="${toggleSwitchStyle(!isCurrentThemeLight())}"></div>

    <div class="relative flex justify-center items-center size-8">${SunIcon(isCurrentThemeLight() ? "text-white" : "text-gray-secondary transition-all duration-300")}</div>

    <div class="relative flex justify-center items-center size-8">${MoonIcon(!isCurrentThemeLight() ? "text-white" : "text-gray-secondary transition-all duration-300")}</div>

        
    </button>`;
}

document.addEventListener("click", (e) => {
  const toggleBtn = e.target.closest("#theme-icon-toggle");
  if (toggleBtn) {
    toggleTheme();

    document.getElementById("theme-icon-toggle-switch").className =
      toggleSwitchStyle(!isCurrentThemeLight());

    const sunIcon = document.getElementById("sun-icon");
    const moonIcon = document.getElementById("moon-icon");

    sunIcon.classList.toggle("text-white");
    sunIcon.classList.toggle("text-gray-secondary");
    moonIcon.classList.toggle("text-white");
    moonIcon.classList.toggle("text-gray-secondary");
  }
});
