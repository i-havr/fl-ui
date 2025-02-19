import { text } from "../../constants/text";

import { CloseIcon, FinlabLogoIcon, MoonIcon, ExitIcon } from "../icons";
import { TogglePrimary } from "../toggle-primary";
import { Nav } from "./nav";

export function MobileMenu() {
  return `
  <div id="mobile-menu" class="fixed top-0 left-0 w-full h-full bg-bgPrimary flex flex-col items-center justify-between text-textPrimary transform translate-x-full transition-all px-4 pt-3 pb-16">
  <div class="w-full">
      <div class="w-full h-[43px] flex justify-between items-center mb-[31px]">
      ${FinlabLogoIcon()}

      <button id="close-menu" class="flex  items-center justify-center size-6">${CloseIcon()}
      </button>
      </div>   
      
      ${Nav()}

      <div class="pl-3 w-full h-[43px] flex justify-between items-center">
      <div class="flex gap-x-3 items-center opacity-75">${MoonIcon()}  ${text.common.darkThemeName}
      </div>

      ${TogglePrimary()}
      </div>  
      </div>
      <button type="button" class="hover:opacity-75 active:opacity-75 text-red-primary flex gap-x-[14px] items-center justify-center mx-auto font-medium">${ExitIcon()} ${text.common.exit}</button>
    </div>`;
}
