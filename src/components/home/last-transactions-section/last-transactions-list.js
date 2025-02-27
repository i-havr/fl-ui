import { formatAmount } from "../../../helpers";
import { LastTransactionsHeader } from "./last-transactions-header";

export function LastTransactionsList(transactions) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "done":
        return "text-green-300 bg-green-300/15";

      case "created":
        return "text-blue-200 bg-blue-200/15";

      default:
        return "text-red-100 bg-red-100/15";
    }
  };

  return `
    ${LastTransactionsHeader()}
      
      <ul class="last-transactions-list min-h-[372px] md:min-h-[640px] xl:min-h-[910px]">${transactions
        .map((transaction) => {
          return `
          <li class="transactions-table-row transactions-list-row">            
            <div class="transactions-table-cell overflow-ellipsis overflow-hidden whitespace-nowrap">${transaction.id}</div>
  
            <div class="md:hidden transactions-table-cell text-gray-primary">${formatAmount(transaction.amount)}</div>
  
            <div class="md:hidden transactions-table-cell text-left">
              <span class="inline-flex justify-center items-center text-[11px] h-6 px-[6px] py-[2px] rounded-md ${getStatusStyle(transaction.status)}">${transaction.statusTitle}</span>
            </div>
  
            <div class="transactions-table-cell flex flex-col text-[11px] md:text-sm xl:text-base !w-[120px] md:!w-[160px] xl:!w-[190px] md:pt-[18px] xl:pt-[23px]">
                <div>${transaction.date}</div>
                <div class="text-gray-500">${transaction.time}</div>
            </div>
  
            <div class="transactions-table-cell">${transaction.type}</div>
  
            <div class="hidden md:block transactions-table-cell">${formatAmount(transaction.amount)}</div>
  
            <div class="hidden md:block transactions-table-cell text-left">
              <span class="inline-flex justify-center items-center text-xs xl:text-sm h-7 px-[10px] xl:px-3 py-1 rounded-md ${getStatusStyle(transaction.status)}">${transaction.statusTitle}
              </span>
            </div>
          </li>`;
        })
        .join("")}
        </ul>`;
}
