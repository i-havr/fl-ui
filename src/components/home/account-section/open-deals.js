import { mockup } from "../../../constants";

import { EmptyDealsState } from "./empty-deals-state";

import { formatAmount } from "../../../helpers";

export function OpenDeals(deals) {
  return `
    <div class="md:shrink-0 w-full h-[277px] min-[768px]:h-auto md:w-[326px] xl:w-[432px] md:h-[480px] p-3 md:p-0 md:py-5 md:pl-5 bg-bg-block-primary rounded-lg text-left">
      <div class="${deals.length ? "faded-bottom-container" : ""}">
        <h2 class="font-semibold md:text-lg">${mockup.home.balance.dealsText.openDeals}</h2>

        ${
          deals.length
            ? `<div id="openDealsTable" class="no-scrollbar w-full overflow-y-auto max-h-[220px] min-[768px]:max-h-[248px] md:max-h-[396px] mt-4 md:mt-5 pb-5">
                  ${renderDealsTable(deals)}                  
              </div>`
            : EmptyDealsState()
        }
      </div>
  </div>`;
}

function renderDealsTable(deals) {
  return `
    <table class="w-full text-sm">
      <thead class="sticky top-0 bg-bg-block-primary -translate-y-px">
        <tr class="text-gray">
          <th class="text-left text-sm font-normal">${mockup.home.balance.dealsText.position}</th>
          <th class="text-left text-sm font-normal">${mockup.home.balance.dealsText.asset}</th>
          <th class="text-left text-sm font-normal text-nowrap">${mockup.home.balance.dealsText.result}</th>
        </tr>
      </thead>

      <tbody class="w-full">
        ${deals
          .map(
            (deal) => `
            <tr class="w-full">
              <td class="font-medium text-sm py-[6px] w-[calc(28%)] text-left ${
                deal.position === "Long"
                  ? "text-green-100"
                  : "text-red-secondary"
              }">${deal.position}</td>
              <td class="font-medium text-sm py-[6px] w-[calc(25%)] text-left text-text-primary">${deal.asset}</td>
              <td class="font-medium text-sm py-[6px] w-[calc(47%)] text-left ${
                deal.result < 0 ? "text-red-primary" : "text-green-100"
              }">${formatAmount(deal.result)}</td>
            </tr>
          `
          )
          .join("")}
      </tbody>
    </table>
  `;
}
