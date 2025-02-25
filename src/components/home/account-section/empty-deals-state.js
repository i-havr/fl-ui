import { mockup } from "../../../constants";

import emptyStateIcon from "../../../assets/icons/empty-deals-state.svg?raw";

export function EmptyDealsState() {
  return ` 
    <div class="flex flex-col h-full w-full justify-center items-center gap-y-[23px] min-[768px]:pt-[38px]">
        <div>${emptyStateIcon}</div>
        <span class="text-xs text-gray">${mockup.home.balance.dealsText.noDealsState}</span>
    </div>
    `;
}
