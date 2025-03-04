import { mockup } from "../../../constants";

import emptyStateIcon from "../../../assets/icons/empty-deals-state.svg?raw";

export function EmptyDealsState() {
  return ` 
    <div class="flex flex-col h-[220px] md:h-[500px] w-full justify-center items-center gap-y-[23px] md:pt-0 md:pb-10">
        <div>${emptyStateIcon}</div>
        <span class="text-xs md:text-base text-gray">${mockup.home.balance.dealsText.noDealsState}</span>
    </div>
    `;
}
