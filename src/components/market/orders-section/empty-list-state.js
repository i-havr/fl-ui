import { mockup } from "../../../constants";

import emptyStateIcon from "../../../assets/icons/empty-positions-orders-state.svg?raw";

export function EmptyListState(category) {
  return ` 
    <div class="rounded-lg bg-bg-block-primary md:bg-transparent flex flex-col h-[220px] md:h-[415px] xl:h-[550px] w-full justify-center items-center gap-y-[23px] md:pt-0 md:pb-10">
        <div>${emptyStateIcon}</div>
        <span class="text-xs md:text-base text-gray">${mockup.market.ordersSection.emptyState[category]}</span>
    </div>
    `;
}
