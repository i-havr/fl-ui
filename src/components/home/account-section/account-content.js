import { Balance } from "./balance";
import { OpenDeals } from "./open-deals";

export function AccountContent(account) {
  return `
    <div class="flex flex-col md:flex-row gap-4 md:gap-5 xl:justify-between">
        ${Balance(account)}        
        ${OpenDeals(account.deals)}
    </div>`;
}
