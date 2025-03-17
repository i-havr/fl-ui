import { mockup } from "../../constants";

import closeIcon from "../../assets/icons/close-icon.svg?raw";
import leverageModalHtml from "./leverage-modal.html?raw";
import RangeSliderPrimary from "./range-slider-primary";
import { ButtonPrimary } from "../buttons/button-primary";

export function LeverageModal() {
  let html = leverageModalHtml;

  html = html
    .replace("${closeIcon}", closeIcon || "")
    .replace("${leverageTitle}", mockup.market.leverage || "")
    .replace(
      "${leverageRangeSliderPrimary}",
      RangeSliderPrimary("leverageModal")
    )

    .replace(
      "${setButton}",
      ButtonPrimary(
        mockup.market.tradingBlock.buttons.set.title,
        "flex-1 grow shrink-0 rounded-[100px] blue-gradient h-12",
        "",
        "tpsl-modal-set-button",
        "handleSetLeverageButtonClick()"
      )
    )
    .replace(
      "${cancelButton}",
      ButtonPrimary(
        mockup.market.tradingBlock.buttons.cancel.title,
        "flex-1 grow shrink-0 rounded-[100px] border border-blue-100 h-12",
        "",
        "tpsl-modal-close-button",
        "resetLeverageModalToDefault()"
      )
    )
    .replace(
      "${setButton}",
      ButtonPrimary(
        mockup.market.tradingBlock.buttons.set.title,
        "flex-1 grow shrink-0 rounded-[100px] blue-gradient h-12",
        "",
        "tpsl-modal-set-button",
        "handleSetLeverageButtonClick()"
      )
    );

  return html;
}
