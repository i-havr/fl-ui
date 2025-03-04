import { mockup } from "../../../constants";

import chevronIconRight from "../../../assets/icons/chevron-icon-right.svg?raw";

export function LastTransactionsPagination({ page, of, total, perPage }) {
  const totalPages = Math.ceil(total / perPage);

  const startRange = (page - 1) * perPage + 1;
  const endRange = Math.min(page * perPage, total);
  const range = `${startRange}-${endRange}`;

  const renderPageButtons = () => {
    const maxVisibleButtons = 7;
    let buttons = "";

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons += `
          <button 
            class="pagination-number-btn ${i === page ? "bg-bg-element-primary pointer-events-none" : "bg-transparent"}" 
            data-page="${i}" 
            ${i === page ? "disabled" : ""}
          >${i}</button>
        `;
      }
    } else {
      const halfVisible = Math.floor(maxVisibleButtons / 2);
      let startPage = Math.max(1, page - halfVisible);
      const endPage = Math.min(totalPages, page + halfVisible);

      if (endPage - startPage < maxVisibleButtons - 1) {
        startPage = Math.max(1, endPage - (maxVisibleButtons - 1));
      }

      if (startPage > 2) {
        buttons += `
          <button 
            class="pagination-number-btn"
            data-page="1">
            1
            </button>
          <span class="pointer-events-none">...</span>
        `;
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons += `
          <button
            class="pagination-number-btn ${i === page ? "bg-bg-element-primary pointer-events-none" : "bg-transparent"}" 
            data-page="${i}" ${i === page ? "disabled" : ""}>
            ${i}
          </button>
        `;
      }

      if (endPage < totalPages - 1) {
        buttons += `
          <span class="pointer-events-none">...</span>
          <button 
            class="pagination-number-btn"
            data-page="${totalPages}">
            ${totalPages}
            </button>
        `;
      }
    }

    return buttons;
  };

  if (window.innerWidth < 768) {
    return `
  <div class="flex justify-between items-center mx-auto max-w-[500px] text-gray-primary">
    <button class="prev-btn min-w-[84px] flex justify-center items-center gap-x-1 active:opacity-75 disabled:pointer-events-none disabled:opacity-0 disabled:appearance-none"
    ${page === 1 ? "disabled" : ""}>
    <div class="size-5 rotate-180">${chevronIconRight}</div>
    <span class="text-sm font-medium">${mockup.home.transactions.buttons.prev}</span>
    </button>

    <span class="text-[13px] font-medium">${range} ${of} ${total}</span>

    <button class="next-btn min-w-[84px] flex justify-center items-center gap-x-1 active:opacity-75 disabled:pointer-events-none disabled:opacity-0 disabled:appearance-none"
    ${page === totalPages ? "disabled" : ""}>
    <span class="text-sm font-medium">${mockup.home.transactions.buttons.next}</span>
    <div class="size-5">${chevronIconRight}</div>
    </button>
  </div>`;
  } else {
    return `
    <div class="flex justify-between items-center h-[50px] mx-auto px-2 text-gray-primary">
    

    <div class="w-[120px] text-left text-sm font-medium text-gray-primary opacity-60">${range} ${of} ${total}</div>

    <div class="number-pagination-buttons flex items-center gap-x-px text-gray-primary font-medium">
          ${renderPageButtons()}
        </div>

    <div class="flex justify-center items-center gap-x-px rounded-lg overflow-hidden border border-gray-line-primary bg-gray-line-primary">
      <button class="prev-btn bg-bg-element-primary w-[43px] h-[30px] flex justify-center items-center hover:opacity-85 active:opacity-75 disabled:pointer-events-none disabled:opacity-50 pb-[2px]"
      ${page === 1 ? "disabled" : ""}>
      <div class="size-[18px] -scale-x-100">${chevronIconRight}</div>
      </button>

      <button class="next-btn bg-bg-element-primary w-[43px] h-[30px] flex justify-center items-center hover:opacity-85 active:opacity-75 disabled:pointer-events-none disabled:opacity-50 pb-[2px]"
      ${page === totalPages ? "disabled" : ""}>      
      <div class="size-[18px]">${chevronIconRight}</div>
      </button>
    </div>
  </div>`;
  }
}
