import { mockup } from "../../constants";

import closeIcon from "../../assets/icons/close-icon.svg?raw";
import finlabLogoIcon from "../../assets/icons/finlab-logo-icon.svg";
import moonIcon from "../../assets/icons/moon-icon.svg?raw";
import exitIcon from "../../assets/icons/exit-icon.svg?raw";

import { TogglePrimary } from "../toggle-primary";
import { Nav } from "./nav";

export function MobileMenu() {
  return `
  <div id="mobile-menu" class="fixed top-0 left-0 w-full h-full bg-bg-primary flex flex-col items-center justify-between text-text-primary transform translate-x-full transition-all px-4 pt-3 pb-16">
  <div class="w-full">
      <div class="w-full h-[43px] flex justify-between items-center mb-[31px]">
      
      <img src="${finlabLogoIcon}" alt="Finlab Logo" class="w-[96px] h-[30px] md:w-[128px] md:h-[40px]"/>

      <button id="close-menu" class="flex  items-center justify-center size-6">${closeIcon}
      </button>
      </div>   
      
      ${Nav()}

      <div class="pl-3 w-full h-[43px] flex justify-between items-center">
      <div class="flex gap-x-3 items-center opacity-75">${moonIcon}  ${mockup.common.darkThemeName}
      </div>

      ${TogglePrimary()}
      </div>  
      </div>
      <button type="button" class="hover:opacity-75 active:opacity-75 text-red-primary flex gap-x-[14px] items-center justify-center mx-auto font-medium transition-all duration-200">${exitIcon} ${mockup.common.exit}</button>
    </div>`;
}
