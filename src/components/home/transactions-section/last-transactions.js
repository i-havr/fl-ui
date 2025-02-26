import { mockup } from "../../../constants";

import TransactionsService from "../../../js/transactions-service";
import { formatAmount } from "../../../helpers";
import { LastTransactionsPagination } from "./last-transactions-pagination";

const transactionsService = new TransactionsService();

let isMobileDevice = window.innerWidth < 1024;

const renderTransactions = (
  transactions,
  currentPage,
  totalTransactions,
  transactionsServiceInstance
) => {
  const transactionsListContainer = document.querySelector(
    ".last-transactions-list-container"
  );
  const transactionsPaginationContainer = document.querySelector(
    ".last-transactions-pagination-container"
  );

  if (!transactionsListContainer) {
    console.error("Element .last-transactions-list-container was not found");
    return;
  }

  if (!transactionsPaginationContainer) {
    console.error(
      "Element .last-transactions-pagination-container was not found"
    );
    return;
  }

  if (transactions.length) {
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

    transactionsListContainer.innerHTML = `
    <ul class="last-transactions-list">${transactions
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

    transactionsPaginationContainer.innerHTML = LastTransactionsPagination({
      page: currentPage,
      of: mockup.home.transactions.of,
      total: totalTransactions,
      perPage: transactionsService.per_page
    });

    const prevBtn = transactionsPaginationContainer.querySelector(".prev-btn");
    const nextBtn = transactionsPaginationContainer.querySelector(".next-btn");

    prevBtn?.addEventListener("click", () => {
      transactionsServiceInstance.decrementPage();
      getTransactionsData(
        transactionsServiceInstance.page,
        transactionsServiceInstance.per_page
      );
    });

    nextBtn?.addEventListener("click", () => {
      transactionsServiceInstance.incrementPage();
      getTransactionsData(
        transactionsServiceInstance.page,
        transactionsServiceInstance.per_page
      );
    });
  } else {
    transactionsListContainer.innerHTML = `
    <p>No transactions yet</p>
    `;
  }
};

export const getTransactionsData = async (page, perPage) => {
  try {
    const {
      total,
      page: currentPage,
      data
    } = await transactionsService.fetchTransactions(page, perPage);

    renderTransactions(data, currentPage, total, transactionsService);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    const transactionsListContainer = document.querySelector(
      ".last-transactions-list-container"
    );
    if (transactionsListContainer) {
      transactionsListContainer.innerHTML = `
      <p>Error loading transactions</p>`;
    }
  }
};

export function LastTransactions() {
  return `
    <div>
        <h2 class="text-left font-semibold mb-4">${mockup.home.transactions.lastTransactions}</h2>

        <div class="overflow-auto w-full mb-6 md:mb-[30px]">
          <div class="transactions-table-row min-w-fit md:w-full h-[30px] md:h-10 xl:h-[50px] text-[13px] md:text-sm xl:text-base text-gray-primary md:text-textPrimary font-medium md:rounded-[10px] md:bg-bgElementPrimary md:px-[15px] border-b border-b-gray-linePrimary md:border-none">
            <h3 class="transactions-table-cell">${mockup.home.transactions.id}</h3>
            <h3 class="md:hidden transactions-table-cell">${mockup.home.transactions.amount}</h3>
            <h3 class="md:hidden transactions-table-cell">${mockup.home.transactions.status}</h3>
            <h3 class="transactions-table-cell !w-[120px] md:!w-[160px] xl:!w-[190px]">${mockup.home.transactions.date}</h3>
            <h3 class="transactions-table-cell">${mockup.home.transactions.type}</h3>
            <h3 class="hidden md:block transactions-table-cell">${mockup.home.transactions.amount}</h3>
            <h3 class="hidden md:block transactions-table-cell">${mockup.home.transactions.status}</h3>
          </div>

          <div class="last-transactions-list-container"></div>
        </div>

        <div class="last-transactions-pagination-container"></div>
    </div>
  `;
}

window.addEventListener("resize", () => {
  if (isMobileDevice && window.innerWidth >= 1024) {
    isMobileDevice = false;
    getTransactionsData();
  }

  if (!isMobileDevice && window.innerWidth < 1024) {
    isMobileDevice = true;
    getTransactionsData();
  }
});
