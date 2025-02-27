import { mockup } from "../../../constants";

import emptyTransactionsIcon from "../../../assets/icons/empty-transactions-state.svg?raw";

export function EmptyTransactionsState() {
  return `
    <div class="flex flex-col w-full justify-center items-center gap-y-[18px] md:gap-y-[20px] md:pt-0 h-[83px] md:h-[207px] xl:h-[199px]">
        <div class="size-[50px]">${emptyTransactionsIcon}</div>
        <span class="text-xs md:text-base text-gray">${mockup.home.transactions.noTransactionsState}</span>
    </div>
  `;
}
