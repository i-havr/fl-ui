import { mockup } from "../../../constants";
import positionsListHeaderHtml from "./positions-list-header.html?raw";

export function PositionsListHeader() {
  let html = positionsListHeaderHtml;

  const titles = mockup.market.ordersSection.positionsTitles;

  html = html
    .replaceAll("${symbol}", titles.symbol.title)
    .replaceAll("${size}", titles.size.title)
    .replaceAll("${entryPrice}", titles.entryPrice.title)
    .replaceAll("${markPrice}", titles.markPrice.title)
    .replaceAll("${liquidPrice}", titles.liquidPrice.title)
    .replaceAll("${margin}", titles.margin.title)
    .replaceAll("${pnl}", titles.pnl.title)
    .replaceAll("${tpsl}", titles.tpsl.title)
    .replaceAll("${closePositions}", titles.closePositions.title);

  return html;
}
