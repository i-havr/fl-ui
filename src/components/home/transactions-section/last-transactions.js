import { mockup } from "../../../constants";

export function LastTransactions() {
  return `
    <div class="h-[500px]">
        <h2 class="text-left font-semibold">${mockup.home.transactions.lastTransactions}</h2>
    </div>
  `;
}
