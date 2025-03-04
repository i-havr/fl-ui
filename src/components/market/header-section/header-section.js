import { mockup } from "../../../constants";

import chevronIconRight from "../../../assets/icons/chevron-icon-right.svg?raw";
import { formatNumber } from "chart.js/helpers";

export default function HeaderSection() {
  return `
    <section class="w-full mx-auto text-center xl:w-[915px] mb-4">
        <div class="w-full mx-auto px-4 md:px-8 xl:px-0">

            <div class="flex justify-center md:justify-start gap-x-[10px] md:gap-x-0 md:bg-bg-secondary md:rounded-2xl xl:w-full overflow-hidden md:h-[92px] md:items-center md:px-10">
                <div class="w-[calc((100%-10px)/2)] md:w-auto flex flex-col md:flex-row gap-y-[10px]">
                    <div class="flex-1 shrink-0 md:flex-[0] flex gap-x-2 p-4 md:p-0 bg-bg-secondary bg-none rounded-xl md:bg-none md:rounded-none md:pr-[35px] xl:pr-[49px] md:border-r md:border-r-gray-line-primary">
                        <span class="size-[26px] md:size-[34px] md:mt-[2px] bg-white rounded-full"></span>
                        <div class="flex flex-col font-medium text-left gap-y-1 md:gap-y-0">
                            <div class="flex gap-x-[7px] md:gap-x-[13px] text-white">
                                <span class="md:text-lg">${mockup.market.headerSection.asset}</span>
                                <div class="size-[22px] rotate-90">${chevronIconRight}</div>
                            </div>
                            <span class="text-xs md:text-sm text-gray-primary">${mockup.market.headerSection.asset} / ${mockup.market.headerSection.currencyName}</span>
                        </div>
                    </div>

                    <div class="flex-1 md:flex-[0] shrink-0 flex flex-col gap-x-2 p-4 md:p-0 bg-bg-secondary bg-none rounded-xl md:bg-none md:rounded-none font-medium text-left gap-y-[6px] md:gap-y-0 md:pl-9 xl:pl-[50px]">
                        <span class="text-red-secondary md:text-lg">
                                ${mockup.market.headerSection.secondBlock.balanceUSD.toLocaleString(
                                  undefined,
                                  {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2
                                  }
                                )}
                        </span>
                            
                        <span class="text-xs md:text-sm">= ${mockup.market.headerSection.secondBlock.balanceCurrency} ${mockup.market.headerSection.currencyName}</span>
                    </div>
                </div>

                <div class="w-[calc((100%-10px)/2)] md:w-full md:max-w-[294px] lg:max-w-[340px] xl:max-w-[500px] flex flex-col gap-y-[14px] md:gap-y-0 md:gap-x-2 md:flex-row md:justify-between xl:justify-start xl:gap-x-[60px] md:ml-8 lg:ml-[60px] px-4 md:px-0 py-[18px] md:py-0 text-left bg-bg-secondary md:bg-none rounded-xl md:rounded-none font-medium text-xs md:text-sm">
                    <div class="flex flex-col gap-y-[2px] md:gap-y-[5px]">
                        <span class="text-gray-primary">24H Change</span>
                        <span class="${mockup.market.headerSection.thirdBlock.change < 0 ? "text-red-secondary" : ""}">${formatNumber(mockup.market.headerSection.thirdBlock.change)}%</span>
                    </div>

                    <div class="flex flex-col gap-y-[2px] md:gap-y-[5px]">
                        <span class="text-gray-primary">24H Hight</span>
                        <span>0,523</span>
                    </div>

                    <div class="flex flex-col gap-y-[2px] md:gap-y-[5px]">
                        <span class="text-gray-primary">24H Low</span>
                        <span>0,321</span>
                    </div>
                </div>
            </div>
            
        </div>
    </section>`;
}
