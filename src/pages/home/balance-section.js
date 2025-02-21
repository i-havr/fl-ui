import { mockup } from "../../constants/mockup";

import depositIcon from "../../assets/icons/deposit-icon.svg?raw";
import withdrawalIcon from "../../assets/icons/withdrawal-icon.svg?raw";

import { AccountsContainer } from "./accounts-container";

import verificationStarIcon from "../../assets/icons/verification-start-icon.svg?raw";
import usdRoundedIcon from "../../assets/icons/usd-rounded.svg?raw";
import chevronIcon from "../../assets/icons/chevron-icon-right.svg?raw";

export default function BalanceSection() {
  return `
    <section class="mx-auto text-center">
        <div class="container">

            <div class="flex flex-col bg-bgSecondary pt-4 pb-4 md:pt-5 md:pb-6 xl:pt-6 xl:pb-[30px] pl-4 md:pl-[26px] xl:pl-8 rounded-xl">

                <div class="mb-4 md:mb-[30px] pr-4 md:pr-[26px] xl:pr-8 w-full h-[26px] md:h-[29px] flex justify-between items-center">
                    <span class="font-semibold md:text-lg">${mockup.home.balance.balance}</span>

                    <div class="flex items-center gap-x-2 text-sm md:text-base">
                        <span class="text-gray">${mockup.home.balance.accNumberTitle} <span class="text-textPrimary">${mockup.home.balance.accNumber}</span></span>
                        <span class="w-[18px] h-[19px] md:w-[22px] md:h-[22px]">${verificationStarIcon}</span>
                    </div>                
                </div> 

            <div class="flex flex-col md:flex-row items-start md:items-center gap-y-[10px] md:gap-y-0 md:gap-x-[55px] mb-4 md:mb-[30px]">
                <div class="flex items-center gap-x-2">
                    <span class="size-6 md:size-[30px] xl:size-8">${usdRoundedIcon}</span>
                    <span class="text-[26px] md:text-4xl font-bold leading-[1.38]">${mockup.home.balance.amount.toLocaleString()}</span>
                </div>

                <button type="button" class="flex items-center gap-x-1 bg-gray-bgButton px-[10px] py-[10px] md:px-[14px] rounded-lg text-xs md:text-xs transition-opacity hover:opacity-85 active:bg-opacity-75">
                <span>${mockup.home.balance.takeLoan}</span>
                <span class="size-[14px]">${chevronIcon}</span>                
                </button>
            </div>

            <div class="flex flex-col pr-4 md:pr-[26px] xl:pr-8 gap-y-[10px] md:max-w-72 mb-4 md:mb-[30px]">
                <div class="flex justify-between items-center">
                    <span class="pr-[10px] text-gray text-sm">${mockup.home.balance.credit}</span>
                    <span class="block flex-1 h-[1px] bg-gray-linePrimary"></span>
                    <span class="pl-[10px] font-medium md:text-lg">$${mockup.home.balance.creditAmount.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 2
                      }
                    )}</span>
                </div>

                <div class="flex justify-between items-center">
                    <span class="pr-[10px] text-gray text-sm">${mockup.home.balance.bonuses}</span>
                    <span class="block flex-1 h-[1px] bg-gray-linePrimary"></span>
                    <span class="pl-[10px] font-medium">$${mockup.home.balance.bonusesAmount.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 2
                      }
                    )}</span>
                </div>
            </div>

                <div class="mb-3 md:mb-1">${AccountsContainer()}</div>
                
                <div class="flex gap-x-[10px] md:gap-x-5 h-10 md:h-16 text-sm md:text-xl">
                  <button type="button" class="bg-blue-gradient shrink-0 w-[150px] md:w-[444px] h-full flex justify-center items-center gap-x-3 rounded-[100px] hover:opacity-85 active:opacity-75 transition-opacity">

                  <span class="block size-6">${depositIcon}</span>
                  ${mockup.home.balance.buttons.deposit}</button>

                  <button type="button" class="shrink-0 w-[150px] md:w-[444px] h-full flex justify-center items-center gap-x-3 rounded-[100px] border border-blue-100 hover:opacity-85 active:opacity-75 transition-opacity">
                  
                  <span class="block size-6">${withdrawalIcon}</span>
                  ${mockup.home.balance.buttons.withdrawal}</button>
                </div>
            </div>

        </div>
    </section>
  `;
}
