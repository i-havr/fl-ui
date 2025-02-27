import { mockup } from "../../../constants";

export function LastTransactionsHeader() {
  return `
    <div class="transactions-table-row min-w-fit md:w-full h-[30px] md:h-10 xl:h-[50px] text-[13px] md:text-sm xl:text-base text-gray-primary md:text-textPrimary font-medium md:rounded-[10px] md:bg-bgElementPrimary md:px-[15px] border-b border-b-gray-linePrimary md:border-none">
              <h3 class="transactions-table-cell">${mockup.home.transactions.id}</h3>
              <h3 class="md:hidden transactions-table-cell">${mockup.home.transactions.amount}</h3>
              <h3 class="md:hidden transactions-table-cell">${mockup.home.transactions.status}</h3>
              <h3 class="transactions-table-cell !w-[120px] md:!w-[160px] xl:!w-[190px]">${mockup.home.transactions.date}</h3>
              <h3 class="transactions-table-cell">${mockup.home.transactions.type}</h3>
              <h3 class="hidden md:block transactions-table-cell">${mockup.home.transactions.amount}</h3>
              <h3 class="hidden md:block transactions-table-cell">${mockup.home.transactions.status}</h3>
      </div>`;
}
