import { mockup } from "../../../constants";
import closeIcon from "../../../assets/icons/close-icon.svg?raw";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { AssetsList } from "./assets-list";
import { TooltipManager } from "../../../js/tooltip-manager";
import assetsModalHtml from "./assets-modal.html?raw";

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

  const tooltipManagerInstance = new TooltipManager();

  tooltipManagerInstance.initializeTooltips({
    tooltipSelector: ".market-state-tooltip",
    triggersSelector: ".market-state-tooltip-trigger",
    parentContainerSelector: 'div[x-data*="activeTabQuery"]',
    parentScrollableElementSelector: ".modal-assets-list",
    tooltipClasses: "min-w-[105px] !top-[-28px] !left-[-28px] md:!left-[-27px]",
    arrowClasses: ""
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
  let html = assetsModalHtml;

  const filterParamsHtml = mockup.market.assetsModal.filterParams
    .map(
      (param) => `
        <div 
          class="cursor-pointer swiper-slide asset-filter-tab !w-fit !mr-2 py-[6px] md:py-[10px] px-[14px] md:px-4 rounded-lg text-sm md:text-base" 
          data-filter-param-query="${param.query}"
        >
          <div>${param.title}</div>
        </div>`
    )
    .join("");

  html = html
    .replaceAll("${defaultTabQuery}", defaultTabQuery || "all")
    .replace("${closeIcon}", closeIcon || "")
    .replace(
      "${assetsModalPlaceholder}",
      mockup.market.assetsModal.placeholder || "Search assets..."
    )
    .replace("${assetsModalFilterParams}", filterParamsHtml)
    .replace(
      "${assetsModalAssetsListAssets}",
      mockup.market.assetsModal.assetsList.assets || "Assets"
    )
    .replace(
      "${assetsModalAssetsListLastPrice}",
      mockup.market.assetsModal.assetsList.lastPrice || "Last Price"
    )
    .replace(
      "${assetsModalAssetsListPriceDifference}",
      mockup.market.assetsModal.assetsList.priceDifference || "Price Difference"
    );

  return html;
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
