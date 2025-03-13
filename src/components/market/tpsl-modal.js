import { mockup } from "../../constants";

import closeIcon from "../../assets/icons/close-icon.svg?raw";
import tpslModalHtml from "./tpsl-modal.html?raw";
import RangeSliderPrimary from "./range-slider-primary";

export function TpslModal() {
  let html = tpslModalHtml;

  html = html
    .replace("${closeIcon}", closeIcon || "")
    .replaceAll(
      "${takeProfitLabel}",
      mockup.market.tradingBlock.takeProfitLabel
    )
    .replaceAll("${stopLossLabel}", mockup.market.tradingBlock.stopLossLabel)
    .replace(
      "${takeProfitRangeSliderPrimary}",
      RangeSliderPrimary("tpslModalTP")
    );

  return html;
}
