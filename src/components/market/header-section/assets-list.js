import { mockup } from "../../../constants";

export function AssetsList(list) {
  if (!list.length)
    return `<div class="pt-2">${mockup.market.assetsModal.assetsList.emptyListState}</div>`;

  const getPriceDifferenceStyle = (priceDifference) => {
    if (priceDifference > 0) {
      return "text-green-100";
    }
    if (priceDifference < 0) {
      return "text-red-secondary";
    }

    return "";
  };

  return `
  <ul class="modal-assets-list no-scrollbar h-full overflow-y-scroll pb-5">
  ${list
    .map((asset) => {
      const tooltipText =
        asset.marketState === "open"
          ? mockup.market.assetsModal.tooltip.marketOpen
          : mockup.market.assetsModal.tooltip.marketClosed;

      return `
    <li>
      <button class="w-full flex justify-between items-center h-[52px] pt-2 asset-select-button" data-id="${asset.id}">
        <div class="h-full flex justify-start items-start">
          <div class="flex justify-between items-center gap-x-1 text-sm">

            <div
            class="market-state-tooltip-trigger rounded-full size-2 ${asset.marketState === "open" ? "bg-green-100" : "bg-none border-2 border-red-secondary"}" data-tooltip-text="${tooltipText}"></div>

            <span>${asset.name}</span>          
          </div>
        </div>

        <div class="h-full flex flex-col justify-start items-end gap-y-1 text-right text-sm">
          <span>
              ${asset.lastPrice.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              })}
          </span>
          <span class="text-xs ${getPriceDifferenceStyle(asset.priceDifference)}">
              ${asset.priceDifference.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1
              })}$
          </span>
        </div>
      </button>
    </li>`;
    })
    .join("")}
  </ul>`;
}
