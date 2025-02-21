import { mockup } from "../../constants/mockup";

import plusIcon from "../../assets/icons/plus-icon.svg?raw";

export function OpenNewAccountBtn() {
  return `
    <div class="cursor-pointer shrink-0 w-[240px] h-[125px] flex flex-col justify-center items-center gap-y-[10px] rounded-lg border border-gray-linePrimary border-dashed hover:opacity-85 active:opacity-75 transition-opacity">
        <div class="text-white flex justify-center items-center rounded-full size-[54px] border border-gray-linePrimary">
            <div class="flex justify-center items-center rounded-full border border-gray-linePrimary bg-gray-300 size-9">
                <div class="flex justify-center items-center rounded-full border border-gray-linePrimary bg-gray-400 size-6"">${plusIcon}</div>
            </div>
        </div>

        <span class="text-sm text-gray">${mockup.home.balance.openNewAccount}</span>
    </div>
    `;
}
