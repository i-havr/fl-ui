import { mockup } from "../../../constants";

import { AccountChart } from "./account-chart";
import { ButtonPrimary } from "../../buttons/button-primary";

import { calculateBalanceChange } from "../../../helpers";

import arrowRightIcon from "../../../assets/icons/arrow-right.svg?raw";
import { EmptyHistoryState } from "./empty-history-state";

export function Balance(account) {
  const amountChange = calculateBalanceChange(
    account.amountLastPeriod,
    account.amount
  );

  const getIncreaseSign = () => {
    if (account.amount > account.amountLastPeriod) {
      return "+";
    } else if (account.amount < account.amountLastPeriod) {
      return "-";
    } else {
      return "";
    }
  };

  return `<div class="w-full p-3 md:p-0 md:py-5 md:pl-8 bg-bg-block-primary rounded-lg text-left">
            <p class="text-xl font-semibold mb-2 md:mb-[10px]">${mockup.home.balance.balance}: $${account.amount.toLocaleString()}</p>

            <p class="text-text-secondary text-sm mb-5 md:mb-8 xl:mb-9">
                ${mockup.home.balance.PnL}

                ${
                  account.history.length
                    ? `<span class="text-base ${amountChange.includes("-") ? "text-red-primary" : "text-green-100"}">${getIncreaseSign()}$${(account.amount - account.amountLastPeriod).toLocaleString().replace("-", "")} (${getIncreaseSign()}${amountChange.replace("-", "")}%)
                </span>`
                    : `<span class="text-base text-green-100">$0</span>
                    `
                }
                
            </p>

            <div class="w-full h-[215px] md:h-[346px] xl:h-[342px]">${account.history.length ? AccountChart(account) : EmptyHistoryState()}</div>

            <div class="mt-5 min-[768px]:hidden">
            ${ButtonPrimary(
              `
              <span>
                ${mockup.home.balance.buttons.openMarket}
              </span>
              
              ${arrowRightIcon}
              `,
              "blue-gradient h-[34px] px-[10px] rounded-lg text-xs gap-x-1 w-fit",
              "/market"
            )}
            </div>
        </div>`;
}
