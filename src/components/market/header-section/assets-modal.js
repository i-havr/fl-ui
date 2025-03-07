import { mockup } from "../../../constants";

import closeIcon from "../../../assets/icons/close-icon.svg?raw";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { AssetsList } from "./assets-list";

import TooltipManager from "../../../js/tooltip-manager";

const defaultTabQuery = mockup.market.assetsModal.filterParams[0]?.query;
const allAssetsList = mockup.market.assetsData;

window.initAssetsModalSwiper = function () {
  new Swiper("#swiper-assets-modal", {
    slidesPerView: "auto"
  });
};

window.updateAssetsFilteredContent = function (tabQuery = defaultTabQuery) {
  const contentContainer = document.getElementById("assets-modal-list");

  if (!contentContainer) return;

  let assetsListToRender = [];

  const searchInput = document.querySelector(
    'input[x-model="assetsSearchQuery"]'
  );
  const searchQuery = searchInput ? searchInput.value.trim() : "";

  if (tabQuery === defaultTabQuery) {
    searchQuery
      ? assetsListToRender.push(
          ...allAssetsList.filter((asset) =>
            asset.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
          )
        )
      : assetsListToRender.push(...allAssetsList);
  } else {
    const filteredList = allAssetsList.filter(
      (asset) =>
        asset.category === tabQuery &&
        (searchQuery
          ? asset.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
          : true)
    );

    assetsListToRender.push(...filteredList);
  }

  contentContainer.innerHTML = `
    ${AssetsList(assetsListToRender)}`;

  const modal = document.querySelector('div[x-data*="activeTabQuery"]');
  if (modal) {
    modal.setAttribute("data-active-tab-query", tabQuery);
  }

  setAssetsActiveTab(tabQuery);

  TooltipManager.initializeTooltips({
    tooltipSelector: ".market-state-tooltip",
    triggersSelector: ".market-state-tooltip-trigger",
    parentScrollableElementSelector: ".modal-assets-list"
  });

  document.querySelectorAll(".asset-select-button").forEach((button) => {
    button.addEventListener("click", () => {
      const assetId = button.getAttribute("data-id");
      localStorage.setItem("selectedAssetId", assetId);

      const modalElement = button.closest('div[x-data*="activeTabQuery"]');
      if (modalElement) {
        modalElement.dispatchEvent(new CustomEvent("closeModal"));
      }
    });
  });
};

export function AssetsModal() {
  return `
    <div
      x-data="{
      assetsSearchQuery: '',
      activeTabQuery: $el.getAttribute('data-active-tab-query') || '${defaultTabQuery}', 
      observeDataAttribute() {
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.attributeName === 'data-active-tab-query') {
                this.activeTabQuery = $el.getAttribute('data-active-tab-query') || '${defaultTabQuery}';
              }
            });
          });
          observer.observe($el, { attributes: true });
          return observer;
        }, resetToDefault() {
          const searchInput = $el.querySelector('.assets-filter-input');
          if(searchInput) {searchInput.value = ''};
          this.assetsSearchQuery = '';
          this.activeTabQuery = '${defaultTabQuery}';
          $el.getAttribute('data-active-tab-query', '${defaultTabQuery}');
          $el.closest('body').classList.remove('no-scroll');
          updateAssetsFilteredContent('${defaultTabQuery}');
        }, initializeModal () {
          initAssetsModalSwiper();
          setAssetsActiveTab('${defaultTabQuery}');
          updateAssetsFilteredContent('${defaultTabQuery}');
          } }"
      x-init="observeDataAttribute(); initializeModal(); $el.addEventListener('closeModal', () => { isModalOpen = false; resetToDefault(); window.location.reload(); })"
      x-show="isModalOpen";
      x-transition:enter="transition ease-out duration-300"
      x-transition:enter-start="translate-y-full md:translate-y-0"
      x-transition:enter-end="translate-y-0"
      x-transition:leave="transition ease-in duration-300"
      x-transition:leave-start="translate-y-0"
      x-transition:leave-end="translate-y-full md:translate-y-0"
      @click.away="isModalOpen = false; resetToDefault()"
      class="w-full md:w-2/3 lg:w-[738px] md:translate-y-[214px] md:translate-x-8 xl:absolute xl:top-0 xl:left-1/2 xl:-translate-x-[680px] pt-5 pb-3 px-5 md:px-[30px] rounded-t-[20px] bg-bg-secondary"
    >
      <button
        type="button"
        @click="isModalOpen = false; resetToDefault()"
        class="w-[14px] h-[14px] float-right mb-[17px]"
      >
        ${closeIcon}
      </button>

      <input 
        type="text" 
        placeholder="${mockup.market.assetsModal.placeholder}" 
        class="assets-filter-input outline-none w-full h-10 md:h-12 mb-5 px-5 border border-[#373A43] rounded-[100px] bg-[#232426]/80 text-sm placeholder:text-[#4B4B4B]"
        x-model="assetsSearchQuery"
        @input.debounce.300ms="updateAssetsFilteredContent(activeTabQuery)"
      />

      <div id="swiper-assets-modal" class="faded-right-container swiper w-full pr-6 mb-5">
        <div class="swiper-wrapper flex">
          ${mockup.market.assetsModal.filterParams
            .map(
              (param) => `
                <div 
                  class="cursor-pointer swiper-slide asset-filter-tab !w-fit !mr-2 py-[6px] md:py-[10px] px-[14px] md:px-4 rounded-lg text-sm md:text-base" 
                  data-filter-param-query="${param.query}"
                >
                  <div>${param.title}</div>
                </div>`
            )
            .join("")}
        </div>
      </div>

      <div class="flex items-center justify-between border-b border-b-gray-line-primary py-[10px] text-sm text-gray-primary font-medium">
        <span>${mockup.market.assetsModal.assetsList.assets}</span>
        <div class="flex">
          <span class="md:w-[155px] md:text-left">${mockup.market.assetsModal.assetsList.lastPrice}</span>
          <span class="hidden md:block md:w-[120px] md:text-left">${mockup.market.assetsModal.assetsList.priceDifference}</span>
        </div>
      </div>

      <div id="assets-modal-list" class="h-[412px] md:h-[260px] faded-bottom-container"></div>
    </div>
  `;
}

window.setAssetsActiveTab = function (tabQuery) {
  const modalElement = document.querySelector('div[x-data*="activeTabQuery"]');
  if (modalElement) {
    modalElement.setAttribute("data-active-tab-query", tabQuery);
  }

  document.querySelectorAll(".asset-filter-tab").forEach((tab) => {
    tab.classList.remove(
      "text-text-primary",
      "text-gray-primary",
      "bg-bg-block-primary",
      "pointer-events-none"
    );
    tab.classList.add("text-gray-primary");
  });

  const activeTab = document.querySelector(
    `.asset-filter-tab[data-filter-param-query="${tabQuery}"]`
  );
  if (activeTab) {
    activeTab.classList.add(
      "text-text-primary",
      "bg-bg-block-primary",
      "pointer-events-none"
    );

    activeTab.classList.remove("text-gray-primary");
  }
};

document.addEventListener("click", (e) => {
  const clickedTab = e.target.closest(".asset-filter-tab");

  if (clickedTab) {
    const tabQuery = clickedTab.getAttribute("data-filter-param-query");
    setAssetsActiveTab(tabQuery);
    window.updateAssetsFilteredContent(tabQuery);
  }
});
