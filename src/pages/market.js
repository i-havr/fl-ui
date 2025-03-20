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
    <div
    class="flex flex-col gap-y-4 md:gap-y-6 mx-auto text-center pt-4 md:pt-[49px] pb-[92px] md:pb-[42px] xl:px-10 xl:max-w-[1440px]"

    x-data="{
    isTpslModalOpen: false,
    isLeverageModalOpen: false,
    takeProfitValue: '',
    lastTakeProfitValue: '',
    tpProfit: '0.00',
    lastTpProfit: '0.00',
    stopLossValue: '',
    lastStopLossValue: '',
    slProfit: '0.00',
    lastSlProfit: '0.00',
    leverageValue: '1',
    lastLeverageValue: '1',
    rangeSliderTradingBlockValue: '0',
    isTpslModalEditMode: false,
    isLeverageModalEditMode: false,
    
    normalizedLeverageValue: '0%',
    lastNormalizedLeverageValue: '0%',
    normalizedRangeSliderTradingBlockValue: '0%',

    setNormalizedValue (rangeSliderValue, normalizedRangeSliderValue, minValue, maxValue) {

    this[normalizedRangeSliderValue] = ((Number(this[rangeSliderValue]) - Number(minValue)) / (Number(maxValue) - Number(minValue)) * 100) + '%'
    },

    resetTpslModalToDefault () {
    this.isTpslModalOpen = false;

    if (this.isTpslModalEditMode){
    this.takeProfitValue = this.lastTakeProfitValue;
    this.stopLossValue = this.lastStopLossValue;

    this.tpProfit = this.lastTpProfit;
    this.slProfit = this.lastSlProfit;

    this.isTpslModalEditMode = false;
    return;
    };

    setTimeout(() => {
      this.takeProfitValue = '';
      this.lastTakeProfitValue = '';
      this.tpProfit = '0.00';
      this.lastTpProfit = '0.00';
      this.stopLossValue = '';
      this.lastStopLossValue = '';
      this.slProfit = '0.00';
      this.lastSlProfit = '0.00';
    }, 100);
    },

    resetLeverageModalToDefault  () {
    this.isLeverageModalOpen = false;

    if (this.isLeverageModalEditMode){
      this.leverageValue = this.lastLeverageValue;
      this.normalizedLeverageValue = this.lastNormalizedLeverageValue;

      this.isLeverageModalEditMode = false;
      return;
    };

    setTimeout(() => {
      this.leverageValue = '1';
      this.lastLeverageValue = '1';
      this.normalizedLeverageValue = '0%';
      this.lastNormalizedLeverageValue = '0%';
    }, 100);
    },

    assetVolume: '500',
    isLong: null,
    isShort: null,

    formatNumericValue(numericValue, min = 0, max = 5){
    return numericValue.toLocaleString('en-US', {minimumFractionDigits: min,maximumFractionDigits: max}).replaceAll(',', '')
    },

    formatInputNumericValue (targetValue) {
      let value = targetValue.replace(/,/g, '.');
      value = value.replace(/[^0-9.]/g, '');
      const parts = value.split('.');

      let integerPart = parts[0] || '0';
      integerPart = parseInt(integerPart, 10).toString();
      if (isNaN(integerPart)) {
        integerPart = '0'; 
      }

      if (parts.length > 1) {
        const decimalPart = parts.slice(1).join('');
        value = integerPart + '.' + decimalPart;
      } else {
        value = integerPart;
      }

      if (value === '0' && targetValue === '0') {
        return '0';
      }

      if (value === '' || value === '0') {
        return targetValue === '' ? '' : '0';
      }

      return value;

      },
    }"
    >
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

      <div          
          x-show="isTpslModalOpen"

          x-transition:enter="transition ease-out duration-300"
          x-transition:enter-start="opacity-0"
          x-transition:enter-end="opacity-100"
          x-transition:leave="transition ease-in duration-300"
          x-transition:leave-start="opacity-100"
          x-transition:leave-end="opacity-0"

          class="fixed inset-0 flex items-end justify-center bg-black/80 md:items-center z-[11]"

          @click.stop="resetTpslModalToDefault()"
        >
          ${TpslModal()}
        </div>

        <div          
            x-show="isLeverageModalOpen"

            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100"
            x-transition:leave="transition ease-in duration-300"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"

            class="fixed inset-0 flex items-end justify-center bg-black/80 md:items-center z-[11]"

            @click.stop="resetLeverageModalToDefault()"
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
