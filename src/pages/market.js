import { mockup } from "../constants";

import ChartSection from "../components/market/chart-section/chart-section";
import HeaderSection from "../components/market/header-section/header-section";
import TradingSection from "../components/market/trading-section/trading-section";
import OrdersSection from "../components/market/orders-section/orders-section";

export default function Market() {
  const assetsData = mockup.market.assetsData;

  let selectedAssetId = localStorage.getItem("selectedAssetId");
  let selectedAssetData = null;

  const showDefaultAsset = () => {
    localStorage.setItem("selectedAssetId", assetsData[0].id);
    selectedAssetData = assetsData[0];
  };

  if (!selectedAssetId) {
    showDefaultAsset();
  } else {
    const asset = assetsData.find((asset) => asset.id === selectedAssetId);

    if (asset) {
      selectedAssetData = asset;
    } else {
      showDefaultAsset();
    }
  }

  return `
    <div class="flex flex-col gap-y-4 md:gap-y-6 mx-auto text-center pt-4 md:pt-[49px] pb-[92px] md:pb-[42px] xl:px-10 xl:max-w-[1440px]">
      <div class="flex flex-col xl:flex-row gap-y-0 xl:gap-y-0 xl:gap-x-4">
          <div class="xl:flex xl:justify-between w-full mx-auto">
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
    </div>
  `;
}

// update after resizing:
// positions/orders list content

document.addEventListener("DOMContentLoaded", () => {
  let previousWidth = window.innerWidth;

  window.addEventListener("resize", () => {
    const currentWidth = window.innerWidth;

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
