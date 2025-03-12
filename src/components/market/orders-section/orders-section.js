import { mockup } from "../../../constants";

import Swiper from "swiper";
import "swiper/css";

import ordersSectionHtml from "./orders-section.html?raw";
import { PositionsOrdersList } from "./positions-orders-list";
import { TooltipManager } from "../../../js/tooltip-manager";

const defaultTabName = mockup.market.ordersSection.filterParams[0].name;

window.initOrdersTableTitlesSwiper = function () {
  new Swiper("#swiper-orders-table-titles", {
    slidesPerView: "auto"
  });
};

window.updateOrdersTableContent = function (tabName = defaultTabName) {
  const contentContainer = document.getElementById(
    "positions-orders-list-container"
  );

  if (!contentContainer) return;

  const positionsOrdersListToRender = [];

  if (tabName === "positions") {
    positionsOrdersListToRender.push(
      ...mockup.market.ordersSection.positionsData
    );
  }

  if (tabName === "openOrders") {
    positionsOrdersListToRender.push(
      ...mockup.market.ordersSection.openOrdersData
    );
  }

  contentContainer.innerHTML = `${PositionsOrdersList(positionsOrdersListToRender, tabName)}`;

  // const modal = document.querySelector('div[x-data*="activeTabQuery"]');
  // if (modal) {
  //   modal.setAttribute("data-active-tab-query", tabQuery);
  // }

  setOrdersTableActiveTab(tabName);

  const tooltipManagerOpenOrdersViewInstance = new TooltipManager();

  tooltipManagerOpenOrdersViewInstance.initializeTooltips({
    placement: "left",
    tooltipSelector: ".open-orders-view-tooltip",
    triggersSelector: ".open-orders-view-button",
    parentContainerSelector: 'section[x-data*="ordersTableActiveTab"]',
    parentScrollableElementSelector: ".positions-orders-list",
    tooltipClasses: "max-w-[190px] !top-[-42px] !right-[-126px]",
    arrowClasses: "!left-[calc(50%-10px)]"
  });

  const tooltipManagerOpenOrdersCancelInstance = new TooltipManager();

  tooltipManagerOpenOrdersCancelInstance.initializeTooltips({
    placement: "left",
    tooltipSelector: ".open-orders-cancel-tooltip",
    triggersSelector: ".open-orders-cancel-button",
    parentContainerSelector: 'section[x-data*="ordersTableActiveTab"]',
    parentScrollableElementSelector: ".positions-orders-list",
    tooltipClasses: "min-w-[105px] !top-[-42px] !right-[-140px]",
    arrowClasses: "!left-[calc(50%-10px)]"
  });

  const tooltipManagerPositionsViewInstance = new TooltipManager();

  tooltipManagerPositionsViewInstance.initializeTooltips({
    placement: "left",
    tooltipSelector: ".positions-view-tooltip",
    triggersSelector: ".positions-view-button",
    parentContainerSelector: 'section[x-data*="ordersTableActiveTab"]',
    parentScrollableElementSelector: ".positions-orders-list",
    tooltipClasses: "max-w-[190px] !top-[-42px] !right-[-126px]",
    arrowClasses: "!left-[calc(50%-10px)]"
  });

  const tooltipManagerPositionsMarketCloseInstance = new TooltipManager();

  tooltipManagerPositionsMarketCloseInstance.initializeTooltips({
    placement: "left",
    tooltipSelector: ".positions-close-tooltip",
    triggersSelector: ".positions-close-button",
    parentContainerSelector: 'section[x-data*="ordersTableActiveTab"]',
    parentScrollableElementSelector: ".positions-orders-list",
    tooltipClasses: "min-w-[105px] !top-[-42px] !right-[-126px]",
    arrowClasses: "!left-[calc(50%-10px)]"
  });
};

export default function OrdersSection() {
  let html = ordersSectionHtml;

  const filterParamsHtml = mockup.market.ordersSection.filterParams
    .map(
      (param) => `
        <div 
          class="cursor-pointer swiper-slide orders-table-filter-tab !w-fit !mr-2 md:mr-6 py-[6px] md:py-[10px] px-[10px] md:px-4 rounded-lg text-sm md:text-lg" 
          data-orders-filter-param="${param.name}"
        >
          <div>${param.title}</div>
        </div>`
    )
    .join("");

  html = html
    .replaceAll("${defaultTabName}", defaultTabName || "positions")
    .replace("${filterTitlesHeader}", filterParamsHtml)
    .replace("${buyButton}", mockup.market.commonButtons.buy)
    .replace("${sellButton}", mockup.market.commonButtons.sell);

  return html;
}

window.setOrdersTableActiveTab = function (tabName) {
  const ordersSectionElement = document.querySelector(
    'div[x-data*="ordersTableActiveTab"]'
  );
  if (ordersSectionElement) {
    ordersSectionElement.setAttribute("data-orders-table-active-tab", tabName);
  }

  document.querySelectorAll(".orders-table-filter-tab").forEach((tab) => {
    tab.classList.remove(
      "text-text-primary",
      "text-gray-primary",
      "bg-bg-block-primary",
      "pointer-events-none"
    );
    tab.classList.add("text-gray-primary");
  });

  const activeTab = document.querySelector(
    `.orders-table-filter-tab[data-orders-filter-param="${tabName}"]`
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
  const clickedTab = e.target.closest(".orders-table-filter-tab");

  if (clickedTab) {
    const tabQuery = clickedTab.getAttribute("data-orders-filter-param");
    setOrdersTableActiveTab(tabQuery);
    window.updateOrdersTableContent(tabQuery);
  }
});

// update list content after resizing

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
