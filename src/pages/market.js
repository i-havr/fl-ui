import { mockup } from "../constants";

import ChartSection from "../components/market/chart-section/chart-section";
import HeaderSection from "../components/market/header-section/header-section";
import TradingSection from "../components/market/trading-section/trading-section";
import OrdersSection from "../components/market/orders-section/orders-section";
import { TpslModal } from "../components/market/tpsl-modal";
import { LeverageModal } from "../components/market/leverage-modal";

export default function Market() {
  const assetsData = mockup.market.assetsData;

  let selectedAssetId = localStorage.getItem("selectedAssetId");
  let selectedAssetData = null;

  const showDefaultAsset = () => {
    localStorage.setItem("selectedAssetId", assetsData[0].id);
    selectedAssetData = assetsData[0];
    Alpine.store("market").selectedAssetData = assetsData[0];
  };

  if (!selectedAssetId) {
    showDefaultAsset();
  } else {
    const asset = assetsData.find((asset) => asset.id === selectedAssetId);

    if (asset) {
      selectedAssetData = asset;
      Alpine.store("market").selectedAssetData = asset;
    } else {
      showDefaultAsset();
    }

    // need to update current price with websockets
    Alpine.store("market").assetMarketPrice = selectedAssetData.priceUSDT;
  }

  return `
    <div
    class="flex flex-col gap-y-4 md:gap-y-6 mx-auto text-center pt-4 md:pt-[49px] pb-[92px] md:pb-[76px] xl:px-10 xl:max-w-[1440px]">
      <div class="flex flex-col xl:flex-row gap-y-0 xl:gap-y-0 xl:gap-x-4">
          <div class="xl:flex xl:justify-center xl:gap-x-6 w-full mx-auto">
            <div>
              ${HeaderSection(selectedAssetData)}
              <div class="hidden xl:block">${ChartSection()}</div>
            </div>

            <div class="hidden xl:block">${TradingSection()}</div>
          </div>

          <div class="xl:hidden flex custom-container md:gap-x-[18px]">
            ${ChartSection()}
            ${TradingSection()}
          </div>
      </div>

      ${OrdersSection()}

      <div          
          x-show="$store.market.isTpslModalOpen"

          x-transition:enter="transition ease-out duration-300"
          x-transition:enter-start="opacity-0"
          x-transition:enter-end="opacity-100"
          x-transition:leave="transition ease-in duration-300"
          x-transition:leave-start="opacity-100"
          x-transition:leave-end="opacity-0"

          class="fixed inset-0 flex items-end justify-center bg-black/80 md:items-center z-[11]"

          @click.stop="$store.market.resetTpslModalToDefault()"
        >
          ${TpslModal()}
        </div>

        <div          
            x-show="$store.market.isLeverageModalOpen"

            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100"
            x-transition:leave="transition ease-in duration-300"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"

            class="fixed inset-0 flex items-end justify-center bg-black/80 md:items-center z-[11]"

            @click.stop="$store.market.resetLeverageModalToDefault()"
          >
            ${LeverageModal()}
          </div>

    </div>
  `;
}

// update after resizing:
// positions/orders list content

document.addEventListener("DOMContentLoaded", () => {
  let previousWidth = window.innerWidth;

  window.addEventListener("resize", () => {
    const currentWidth = window.innerWidth;

    const defaultTabName = mockup.market.ordersSection.filterParams[0].name;

    if (
      (previousWidth < 768 && currentWidth >= 768) ||
      (previousWidth >= 768 && currentWidth < 768)
    ) {
      const activeTab = document.querySelector(
        ".orders-table-filter-tab.pointer-events-none"
      );

      const tabQuery = activeTab
        ? activeTab.getAttribute("data-orders-filter-param")
        : defaultTabName;

      window.updateOrdersTableContent(tabQuery);
    }

    previousWidth = currentWidth;
  });
});
