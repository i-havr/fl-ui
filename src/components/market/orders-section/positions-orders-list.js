import { EmptyListState } from "./empty-list-state";
import ListItemLargeScreen from "./list-item-large-screen";
import ListItemMobile from "./list-item-mobile";
import { OrdersListHeader } from "./orders-list-header";
import { PositionsListHeader } from "./positions-list-header";

export function PositionsOrdersList(list, category) {
  if (
    !list.length ||
    category === "positionsHistory" ||
    category === "openOrdersHistory"
  ) {
    return EmptyListState(category);
  }

  const getHeader = (category) => {
    switch (category) {
      case "positions":
        return PositionsListHeader();

      case "openOrders":
        return OrdersListHeader();

      default:
        return `<div>Empty state</div>`;
    }
  };

  const itemsHtml = list
    .map((item) => {
      return ListItemMobile(item);
    })
    .join("");

  if (window.innerWidth < 768) {
    return `
    <ul class="flex w-full flex-col gap-y-[10px]">
      ${itemsHtml}
    </ul>
    `;
  } else {
    return `
    <div class="flex flex-col max-md:hidden w-fit faded-bottom-container">
      ${getHeader(category)}

    <ul class="positions-orders-list h-[375px] xl:h-[500px] w-fit overflow-x-visible xl:tw-no-scrollbar overflow-y-auto">${list
      .map((item) => {
        return ListItemLargeScreen(item);
      })
      .join("")}
    
    </ul>      
    </div>
    `;
  }
}
