import cn from "classnames";

import { toggleTheme } from "../helpers";

const isCurrentThemeLight = () => localStorage.getItem("theme") === "light";

const buttonStyle = (isSelected) => {
  return cn(
    "relative transition-all duration-200 h-[26px] w-[44px] cursor-pointer rounded-[100px] ease-in-out",
    {
      "bg-green-100": isSelected,
      "bg-gray-200": !isSelected
    }
  );
};

const toggleSwitchStyle = (isSelected) => {
  return cn(
    "absolute top-1/2 -translate-y-1/2 size-[22px] rounded-full shadow-md transition-all duration-200 ease-in-out",
    {
      "left-[calc(100%-24px)] bg-white-100": isSelected,
      "left-[2px] bg-gray-100": !isSelected
    }
  );
};

export function TogglePrimary() {
  const isSelected = !isCurrentThemeLight();

  return `
    <button id="theme-toggle" type="button" class="${buttonStyle(isSelected)}">
        <div id="theme-toggle-switch" class="${toggleSwitchStyle(isSelected)}"></div>
    </button>`;
}

document.addEventListener("click", (e) => {
  const toggleBtn = e.target.closest("#theme-toggle");
  if (toggleBtn) {
    toggleTheme();

    const isSelected = !isCurrentThemeLight();

    toggleBtn.className = buttonStyle(isSelected);
    document.getElementById("theme-toggle-switch").className =
      toggleSwitchStyle(isSelected);
  }
});
