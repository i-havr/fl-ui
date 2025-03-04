import ChartSection from "../components/market/chart-section/chart-section";
import HeaderSection from "../components/market/header-section/header-section";
import TradingSection from "../components/market/trading-section/trading-section";

export default function Market() {
  return `
    <div class="flex flex-col gap-y-4 md:gap-y-6 mx-auto text-center pt-4 md:pt-[49px] pb-[42px] xl:px-10 xl:max-w-[1440px]">
      <div class="flex flex-col xl:flex-row gap-y-0 xl:gap-y-0 xl:gap-x-4">
          <div class="xl:flex xl:justify-between w-full mx-auto">
            <div>
              ${HeaderSection()}
              <div class="hidden xl:block">${ChartSection()}</div>
            </div>

            <div class="hidden xl:block">${TradingSection()}</div>
          </div>

          <div class="xl:hidden flex custom-container md:gap-x-[18px]">
            ${ChartSection()}
            ${TradingSection()}
          </div>
      </div>

      <div class="custom-container xl:!px-0">
        <div class="h-[300px] flex justify-center items-center bg-bg-secondary rounded-2xl">Table content</div>
      </div>
    </div>
  `;
}
