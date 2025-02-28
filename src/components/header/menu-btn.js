import menuIcon from "../../assets/icons/menu-icon.svg?raw";

export function MenuBtn() {
  return `
    <button id="menu-btn" class="ml-[7px] mr-[15px] flex justify-center items-center h-fit">
    <span class="w-[19px] h-[15px] text-text-primary">${menuIcon}<span/>
    </button>
  `;
}
