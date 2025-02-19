import { MenuIcon } from "../icons";

export function MenuBtn() {
  return `
    <button id="menu-btn" class="ml-[7px] mr-[15px] flex justify-center items-center h-fit">
    ${MenuIcon()}
    </button>
  `;
}
