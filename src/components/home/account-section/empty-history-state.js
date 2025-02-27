import { mockup } from "../../../constants";

import emptyStateIcon from "../../../assets/icons/empty-history-state.svg?raw";

export function EmptyHistoryState() {
  return `
    <div class="flex flex-col h-full w-full justify-center items-center gap-y-[18px] md:gap-y-[23px] md:pb-10">
        <div class="md:w-[227px] md:h-[100px]">${emptyStateIcon}</div>
        <span class="text-xs md:text-base text-gray">${mockup.home.balance.noHistoryState}</span>
    </div>
  `;
}
