import { mockup } from "../../../constants";

import TradingBlock from "../trading-block";
import tradingSectionHtml from "./trading-section.html?raw";

export default function TradingSection() {
  let html = tradingSectionHtml;

  html = html
    .replaceAll("${tradingBlock}", TradingBlock())
    .replace("${buyButton}", mockup.market.commonButtons.buy.title)
    .replace("${sellButton}", mockup.market.commonButtons.sell.title);

  return html;
}
