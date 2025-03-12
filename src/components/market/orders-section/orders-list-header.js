import { mockup } from "../../../constants";
import ordersListHeaderHtml from "./orders-list-header.html?raw";

export function OrdersListHeader() {
  let html = ordersListHeaderHtml;

  const titles = mockup.market.ordersSection.openOrdersTitles;

  html = html
    .replaceAll("${symbol}", titles.symbol.title)
    .replaceAll("${type}", titles.type.title)
    .replaceAll("${position}", titles.position.title)
    .replaceAll("${price}", titles.price.title)
    .replaceAll("${amount}", titles.amount.title)
    .replaceAll("${openingDate}", titles.openingDate.title)
    .replaceAll("${tpsl}", titles.tpsl.title)
    .replaceAll("${openingDate}", titles.openingDate.title)
    .replaceAll("${cancelAll}", titles.cancelAll.title);

  return html;
}
