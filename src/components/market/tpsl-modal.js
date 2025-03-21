import { mockup } from "../../constants";

import closeIcon from "../../assets/icons/close-icon.svg?raw";
import tpslModalHtml from "./tpsl-modal.html?raw";
import { ButtonPrimary } from "../buttons/button-primary";

export function TpslModal() {
  let html = tpslModalHtml;

  html = html
    .replaceAll("${closeIcon}", closeIcon || "")
    .replaceAll(
      "${takeProfitLabel}",
      mockup.market.tradingBlock.takeProfitLabel
    )
    .replaceAll("${stopLossLabel}", mockup.market.tradingBlock.stopLossLabel)
    .replace(
      "${closeButton}",
      ButtonPrimary(
        mockup.market.tradingBlock.buttons.close.title,
        "flex-1 grow shrink-0 rounded-[100px] border border-blue-100 h-12",
        "",
        "tpsl-modal-close-button",
        "$store.market.resetTpslModalToDefault()"
      )
    )
    .replace(
      "${setButton}",
      ButtonPrimary(
        mockup.market.tradingBlock.buttons.set.title,
        "flex-1 grow shrink-0 rounded-[100px] blue-gradient h-12",
        "",
        "tpsl-modal-set-button",
        "$store.market.handleSetTpslButtonClick()"
      )
    );

  return html;
}
