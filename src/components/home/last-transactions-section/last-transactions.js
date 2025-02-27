import { mockup } from "../../../constants";

import TransactionsService from "../../../js/transactions-service";
import { LastTransactionsPagination } from "./last-transactions-pagination";
import { EmptyTransactionsState } from "./empty-transactions-state";
import { LastTransactionsList } from "./last-transactions-list";

const transactionsService = new TransactionsService();

let isMobileDevice = window.innerWidth < 1024;
let isTabletDevice = window.innerWidth < 1440;

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
    transactionsListContainer.innerHTML = LastTransactionsList(transactions);

    transactionsPaginationContainer.innerHTML = LastTransactionsPagination({
      page: currentPage,
      of: mockup.home.transactions.of,
      total: totalTransactions,
      perPage: transactionsService.per_page
    });

    const prevBtn = transactionsPaginationContainer.querySelector(".prev-btn");
    const nextBtn = transactionsPaginationContainer.querySelector(".next-btn");
    const numberButtons = transactionsPaginationContainer.querySelectorAll(
      ".pagination-number-btn"
    );

    prevBtn?.addEventListener("click", () => {
      transactionsServiceInstance.decrementPage();
      getTransactionsData(transactionsServiceInstance.page);
    });

    nextBtn?.addEventListener("click", () => {
      transactionsServiceInstance.incrementPage();
      getTransactionsData(transactionsServiceInstance.page);
    });

    const pageHandler = (event) => {
      const newPage = parseInt(event.target.getAttribute("data-page"), 10);
      transactionsServiceInstance.setPage(newPage);
      getTransactionsData(transactionsServiceInstance.page);
    };

    numberButtons.forEach((btn) => {
      btn.removeEventListener("click", pageHandler);
      btn.addEventListener("click", pageHandler);
    });
  } else {
    transactionsListContainer.innerHTML = EmptyTransactionsState();
  }
};

export const getTransactionsData = async (page) => {
  try {
    const {
      total,
      page: currentPage,
      data
    } = await transactionsService.fetchTransactions(page);

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
    <div >
        <h2 class="text-left font-semibold mb-4">${mockup.home.transactions.lastTransactions}</h2>
       
        <div class="overflow-auto w-full mb-6 md:mb-[30px]">
          

          <div class="last-transactions-list-container"></div>
        </div>

        <div class="last-transactions-pagination-container"></div>
    </div>
  `;
}

window.addEventListener("resize", () => {
  if (isMobileDevice && window.innerWidth >= 1024 && window.innerWidth < 1440) {
    isMobileDevice = false;
    isTabletDevice = true;
    getTransactionsData();
  }

  if (isMobileDevice && window.innerWidth > 1440) {
    isMobileDevice = false;
    isTabletDevice = false;
    getTransactionsData();
  }

  if (!isMobileDevice && window.innerWidth < 1024) {
    isMobileDevice = true;
    isTabletDevice = false;
    getTransactionsData();
  }

  if (isTabletDevice && window.innerWidth >= 1440) {
    isTabletDevice = false;
    isMobileDevice = false;
    getTransactionsData();
  }

  if (
    !isTabletDevice &&
    window.innerWidth >= 1024 &&
    window.innerWidth < 1440
  ) {
    isTabletDevice = true;
    getTransactionsData();
  }
});
