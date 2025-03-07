import { mockup } from "../../../constants";

import Swiper from "swiper";
import "swiper/css";

import ordersSectionHtml from "./orders-section.html?raw";
import { PositionsOrdersList } from "./positions-orders-list";

const defaultTabName = mockup.market.ordersSection.filterParams[0].name;

window.initOrdersTableTitlesSwiper = function () {
  new Swiper("#swiper-orders-table-titles", {
    slidesPerView: "auto"
  });
};

window.updateOrdersTableContent = function (tabName = defaultTabName) {
  const contentContainer = document.getElementById("positions-orders-list");

  if (!contentContainer) return;

  const postitionsOrdersListToRender = [];

  if (tabName === "positions") {
    postitionsOrdersListToRender.push(
      mockup.market.ordersSection.positionsData
    );
  }

  if (tabName === "openOrders") {
    postitionsOrdersListToRender.push(
      mockup.market.ordersSection.openOrdersData
    );
  }

  contentContainer.innerHTML = `${PositionsOrdersList(postitionsOrdersListToRender)}`;

  // const modal = document.querySelector('div[x-data*="activeTabQuery"]');
  // if (modal) {
  //   modal.setAttribute("data-active-tab-query", tabQuery);
  // }

  setOrdersTableActiveTab(tabName);

  // TooltipManager.initializeTooltips({
  //     tooltipSelector: ".market-state-tooltip",
  //     triggersSelector: ".market-state-tooltip-trigger",
  //     parentScrollableElementSelector: ".modal-assets-list"
  //   });
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
    .replace("${filterTitlesHeader}", filterParamsHtml);

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
