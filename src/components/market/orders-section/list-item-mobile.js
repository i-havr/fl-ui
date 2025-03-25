import { mockup } from "../../../constants";

import positionsItemMobileHtml from "./positions-item-mobile.html?raw";

import openOrdersItemMobileHtml from "./open-orders-item-mobile.html?raw";

import chevronIcon from "../../../assets/icons/chevron-icon.svg?raw";
import { formatAmountWithoutCurrency } from "../../../helpers";

export default function ListItemMobile(item) {
  let html = ``;
  if (item.category === "positions") {
    html = positionsItemMobileHtml
      .replaceAll("${symbol}", item.symbol)
      .replaceAll("${positionType}", item.type)
      .replaceAll("${leverageTitle}", mockup.market.ordersSection.leverage)
      .replaceAll("${leverage}", item.leverage)
      .replaceAll("${chevronIcon}", chevronIcon)
      .replaceAll(
        "${size}",
        mockup.market.ordersSection.positionsTitles.size.title
      )
      .replaceAll(
        "${sizeValue}",
        `${item.size
          .toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })
          .replaceAll(",", " ")
          .replaceAll(".", ",")} ${item.asset}`
      )
      .replaceAll(
        "${entryPrice}",
        mockup.market.ordersSection.positionsTitles.entryPrice.title
      )
      .replaceAll(
        "${entryPriceValue}",
        item.entryPrice
          .toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })
          .replaceAll(",", " ")
          .replaceAll(".", ",")
      )
      .replaceAll("${entryPriceNumericValue}", item.entryPrice)
      .replaceAll(
        "${markPrice}",
        mockup.market.ordersSection.positionsTitles.markPrice.title
      )
      .replaceAll(
        "${markPriceValue}",
        item.markPrice
          .toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })
          .replaceAll(",", " ")
          .replaceAll(".", ",")
      )
      .replaceAll(
        "${liquidPrice}",
        mockup.market.ordersSection.positionsTitles.liquidPrice.title
      )
      .replaceAll(
        "${liquidPriceValue}",
        item.liquidPrice
          .toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })
          .replaceAll(",", " ")
          .replaceAll(".", ",")
      )
      .replaceAll(
        "${margin}",
        mockup.market.ordersSection.positionsTitles.margin.title
      )
      .replaceAll(
        "${marginValue}",
        `${item.margin
          .toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })
          .replaceAll(",", " ")
          .replaceAll(".", ",")} ${item.asset}`
      )
      .replaceAll(
        "${pnl}",
        `
        <div class="flex items-center justify-between">
            <span class="text-gray">${mockup.market.ordersSection.positionsTitles.pnl.title}</span>
            <span class="${item.pnl < 0 ? "text-red-secondary" : "text-green-100"}">${formatAmountWithoutCurrency(item.pnl)} ${item.asset} (${formatAmountWithoutCurrency(item.roi)}%)</span>
        </div>
         `
      )
      .replace(
        "${tpsl}",
        mockup.market.ordersSection.positionsTitles.tpsl.title
      )
      .replace("${marketClose}", mockup.market.ordersSection.marketCloseButton);
  }

  if (item.category === "openOrders") {
    html = openOrdersItemMobileHtml
      .replaceAll("${symbol}", item.symbol)
      .replaceAll("${leverageTitle}", mockup.market.ordersSection.leverage)
      .replaceAll("${leverage}", item.leverage)
      .replaceAll("${chevronIcon}", chevronIcon)
      .replaceAll(
        "${type}",
        mockup.market.ordersSection.openOrdersTitles.type.title
      )
      .replaceAll("${typeValue}", item.type)
      .replaceAll(
        "${position}",
        `<div class="flex items-center justify-between">
            <span class="text-gray">
                ${mockup.market.ordersSection.openOrdersTitles.position.title}
            </span>

            <span class="${item.positionType === "purchase" ? "text-green-100" : "text-red-secondary"}">
                ${item.positionTitle}
            </span>
      </div>
        `
      )
      .replaceAll(
        "${price}",
        mockup.market.ordersSection.openOrdersTitles.price.title
      )
      .replaceAll(
        "${priceValue}",
        `${item.price
          .toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })
          .replaceAll(",", " ")
          .replaceAll(".", ",")} ${item.asset}`
      )
      .replaceAll(
        "${amount}",
        mockup.market.ordersSection.openOrdersTitles.amount.title
      )
      .replaceAll(
        "${amountValue}",
        `${item.amount
          .toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })
          .replaceAll(",", " ")
          .replaceAll(".", ",")} ${item.exchangeAsset}`
      )
      .replace(
        "${tpsl}",
        mockup.market.ordersSection.openOrdersTitles.tpsl.title
      )
      .replace(
        "${openingDate}",
        mockup.market.ordersSection.openOrdersTitles.openingDate.title
      )
      .replace(
        "${openingDateValue}",
        `${item.openingDateDigital} ${item.openingTime}`
      )
      .replace(
        "${cancelAll}",
        mockup.market.ordersSection.openOrdersTitles.cancelAll.title
      );
  }

  return html;
}
