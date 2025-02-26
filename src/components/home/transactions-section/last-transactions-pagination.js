import { mockup } from "../../../constants";

import chevronIconRight from "../../../assets/icons/chevron-icon-right.svg?raw";

export function LastTransactionsPagination({ page, of, total, perPage }) {
  const totalPages = Math.ceil(total / perPage);

  const startRange = (page - 1) * perPage + 1;
  const endRange = Math.min(page * perPage, total);
  const range = `${startRange}-${endRange}`;

  if (window.innerWidth < 1024) {
    return `
  <div class="flex justify-between items-center mx-auto max-w-[420px] text-gray-primary">
    <button class="prev-btn min-w-[84px] flex justify-center items-center gap-x-1 active:opacity-75 disabled:pointer-events-none disabled:opacity-50"
    ${page === 1 ? "disabled" : ""}>
    <div class="size-5 rotate-180">${chevronIconRight}</div>
    <span class="text-sm font-medium">${mockup.home.transactions.buttons.prev}</span>
    </button>

    <span class="text-[13px] font-medium">${range} ${of} ${total}</span>

    <button class="next-btn min-w-[84px] flex justify-center items-center gap-x-1 active:opacity-75 disabled:pointer-events-none disabled:opacity-50"
    ${page === totalPages ? "disabled" : ""}>
    <span class="text-sm font-medium">${mockup.home.transactions.buttons.next}</span>
    <div class="size-5">${chevronIconRight}</div>
    </button>
  </div>`;
  } else {
    return `
    <div>Big screen pagination</div>`;
  }
}
