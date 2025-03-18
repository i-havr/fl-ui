import closeIcon from "../../../assets/icons/close-icon.svg?raw";
import { mockup } from "../../../constants";

import TradingBlock from "../trading-block";
import tradingModalHtml from "./trading-modal.html?raw";

export default function TradingModal() {
  let html = tradingModalHtml;

  // const tradingSelectedOptionTitle = mockup.market.commonButtons[]

  html = html
    .replace("${tradingBlock}", TradingBlock())
    .replace("${closeIcon}", closeIcon || "")
    .replace("${buyButtonTitle}", mockup.market.commonButtons.buy.title)
    .replace("${sellButtonTitle}", mockup.market.commonButtons.sell.title);

  return html;
}
