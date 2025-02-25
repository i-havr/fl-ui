import { mockup } from "../../../constants";

import emptyStateIcon from "../../../assets/icons/empty-history-state.svg?raw";

export function EmptyHistoryState() {
  return `
    <div class="flex flex-col h-full w-full justify-center items-center gap-y-[18px]">
        <div>${emptyStateIcon}</div>
        <span class="text-xs text-gray">${mockup.home.balance.noHistoryState}</span>
    </div>
  `;
}
