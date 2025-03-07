import positionsOrdersListHtml from "./positions-orders-list.html?raw";

export function PositionsOrdersList(list) {
  console.log(list);
  let html = positionsOrdersListHtml;

  html = html.replaceAll("", "");

  return html;
}
