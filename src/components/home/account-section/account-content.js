import { Balance } from "./balance";
import { OpenDeals } from "./open-deals";

export function AccountContent(account) {
  return `
    <div class="flex flex-col min-[768px]:flex-row gap-4 md:gap-5">
        ${Balance(account)}        
        ${OpenDeals(account.deals)}
    </div>`;
}
