import { mockup } from "../../constants";

import chevronIconRight from "../../assets/icons/chevron-icon-right.svg?raw";
import checkIcon from "../../assets/icons/check-icon.svg?raw";
import editIcon from "../../assets/icons/edit-icon.svg?raw";

import { formatAmountWithoutSigns } from "../../helpers";

import tradingBlockHtml from "./trading-block.html?raw";
import RangeSliderPrimary from "./range-slider-primary";

export default function TradingBlock() {
  const assetsData = mockup.market.assetsData;

  let html = tradingBlockHtml;

  // mocks
  const initialFreeMargin = 55;
  const initialMaxTotalAmount = 100;

  const selectedAssetId = localStorage.getItem("selectedAssetId");

  const asset = assetsData.find((asset) => asset.id === selectedAssetId);

  html = html
    .replaceAll("${defaultTab}", mockup.market.tradingBlock.buttons.market.name)
    .replaceAll("${assetName}", asset.name)
    .replace("${leverage}", mockup.market.leverage)
    .replace(
      "${maxTotalAmount}",
      formatAmountWithoutSigns(initialMaxTotalAmount, 0, 5)
    )
    .replace("${freeMargin}", formatAmountWithoutSigns(initialFreeMargin, 0, 5))
    .replace("${chevronIconRight}", chevronIconRight)
    .replace(
      "${marketTabTitle}",
      mockup.market.tradingBlock.buttons.market.title
    )
    .replace("${limitTabTitle}", mockup.market.tradingBlock.buttons.limit.title)
    .replace(
      "${orderPriceLabel}",
      mockup.market.tradingBlock.orderPriceInput.label
    )
    .replace(
      "${orderMarketPricePlaceholder}",
      mockup.market.tradingBlock.orderPriceInput.marketPlaceholder
    )
    .replace(
      "${orderLimitPricePlaceholder}",
      mockup.market.tradingBlock.orderPriceInput.limitPlaceholder
    )
    .replace("${amountLabel}", mockup.market.tradingBlock.amountInput.label)
    .replace(
      "${amountPlaceholder}",
      mockup.market.tradingBlock.amountInput.placeholder
    )
    .replace(
      "${totalOrderAmountLabel}",
      mockup.market.tradingBlock.totalOrderAmountInput.label
    )
    .replace(
      "${totalOrderAmountPlaceholder}",
      mockup.market.tradingBlock.totalOrderAmountInput.placeholder
    )
    .replace("${freeMargin}", mockup.market.tradingBlock.freeMargin)
    .replace("${maxTotalAmount}", mockup.market.tradingBlock.maxTotalAmount)
    .replace("${checkIcon}", checkIcon)
    .replace("${rangeSliderPrimary}", RangeSliderPrimary("tradingBlock"))
    .replace("${editIcon}", editIcon);

  return html;
}
