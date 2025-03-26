import { mockup } from "../../../constants";

import positionsItemLargeScreenHtml from "./positions-item-large-screen.html?raw";

import openOrdersItemLargeScreenHtml from "./open-orders-item-large-screen.html?raw";
import {
  formatAmountWithoutCurrency,
  formatAmountWithoutSigns
} from "../../../helpers";

export default function ListItemLargeScreen(item) {
  let html = ``;

  if (item.category === "positions") {
    html = positionsItemLargeScreenHtml
      .replaceAll("${id}", item.id)
      .replaceAll("${symbol}", item.symbol)
      .replaceAll("${positionType}", item.type)
      .replaceAll("${leverageTitle}", mockup.market.ordersSection.leverage)
      .replaceAll("${leverage}", item.leverage)
      .replaceAll(
        "${size}",
        `${formatAmountWithoutSigns(item.size)} ${item.asset}`
      )
      .replaceAll("${entryPrice}", formatAmountWithoutSigns(item.entryPrice))
      .replaceAll("${entryPriceNumericValue}", item.entryPrice)
      .replaceAll("${itemId}", item.id)
      .replaceAll("${takeProfitValue}", item.takeProfit)
      .replaceAll("${stopLossValue}", item.stopLoss)
      .replaceAll("${volume}", item.size)
      .replaceAll("${markPrice}", formatAmountWithoutSigns(item.markPrice))
      .replaceAll("${liquidPrice}", formatAmountWithoutSigns(item.liquidPrice))
      .replaceAll(
        "${margin}",
        `${formatAmountWithoutSigns(item.margin)} ${item.asset}`
      )
      .replaceAll(
        "${pnl}",
        `<div
      class="flex w-[130px] shrink-0 flex-col items-start justify-center gap-y-[2px] text-left ${item.pnl < 0 ? "text-red-secondary" : "text-green-100"}"
    >
      <span class="text-sm xl:text-base">${formatAmountWithoutCurrency(item.pnl)} ${item.asset}</span>
      <span class="text-[10px] xl:text-xs">(${formatAmountWithoutCurrency(item.roi)}%)</span>
    </div>    
   `
      )
      .replaceAll(
        "${marketClose}",
        mockup.market.ordersSection.marketCloseButton
      );
  }

  if (item.category === "openOrders") {
    html = openOrdersItemLargeScreenHtml
      .replaceAll("${id}", item.id)
      .replaceAll("${symbol}", item.symbol)
      .replaceAll("${leverageTitle}", mockup.market.ordersSection.leverage)
      .replaceAll("${leverage}", item.leverage)
      .replaceAll("${type}", item.type)
      .replaceAll("${itemId}", item.id)
      .replaceAll("${takeProfitValue}", item.takeProfit)
      .replaceAll("${stopLossValue}", item.stopLoss)
      .replaceAll("${volume}", item.amount)
      .replaceAll(
        "${position}",
        `<span class="${item.positionType === "purchase" ? "text-green-100" : "text-red-secondary"}">${item.positionTitle}</span>`
      )
      .replaceAll(
        "${price}",
        `${formatAmountWithoutSigns(item.price)} ${item.asset}`
      )
      .replaceAll(
        "${amount}",
        `${formatAmountWithoutSigns(item.amount, 0, 6)} ${item.exchangeAsset}`
      )
      .replaceAll("${symbol}", item.symbol)
      .replaceAll("${openingDate}", item.openingDate)
      .replaceAll("${openingTime}", item.openingTime)
      .replaceAll("${cancelAll}", mockup.market.ordersSection.cancelButton);
  }

  return html;
}
