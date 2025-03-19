import cn from "classnames";

import { toggleTheme } from "../../helpers";

import sunIcon from "../../assets/icons/sun-icon.svg?raw";
import moonIcon from "../../assets/icons/moon-icon.svg?raw";

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

const iconWrapperStyle = (isSelected) =>
  cn(
    "relative flex justify-center items-center size-8 transition-all duration-300",
    {
      "text-white": isSelected,
      "text-gray-secondary": !isSelected
    }
  );

export function ToggleIconTheme() {
  return `
    <button id="theme-icon-toggle" type="button" class="relative transition-all duration-300 h-10 w-20 cursor-pointer rounded-lg ease-in-out bg-bg-element-primary flex items-center justify-center gap-x-[5px]">

    <div id="theme-icon-toggle-switch" class="${toggleSwitchStyle(!isCurrentThemeLight())}"></div>

    <div id="sun-icon-wrapper" class="${iconWrapperStyle(isCurrentThemeLight())}">${sunIcon}</div>

    <div id="moon-icon-wrapper" class="${iconWrapperStyle(!isCurrentThemeLight())}">${moonIcon}</div>

        
    </button>`;
}

document.addEventListener("click", (e) => {
  const toggleBtn = e.target.closest("#theme-icon-toggle");
  if (toggleBtn) {
    toggleTheme();

    document.getElementById("theme-icon-toggle-switch").className =
      toggleSwitchStyle(!isCurrentThemeLight());

    const sunIconWrapper = document.getElementById("sun-icon-wrapper");
    const moonIconWrapper = document.getElementById("moon-icon-wrapper");

    sunIconWrapper.classList.toggle("text-white");
    sunIconWrapper.classList.toggle("text-gray-secondary");
    moonIconWrapper.classList.toggle("text-white");
    moonIconWrapper.classList.toggle("text-gray-secondary");
  }
});
