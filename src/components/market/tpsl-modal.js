import { mockup } from "../../constants";

import closeIcon from "../../assets/icons/close-icon.svg?raw";
import tpslModalHtml from "./tpsl-modal.html?raw";
import { ButtonPrimary } from "../buttons/button-primary";

export function TpslModal() {
  const assetsData = mockup.market.assetsData;

  let html = tpslModalHtml;

  const selectedAssetId = localStorage.getItem("selectedAssetId");

  const asset = assetsData.find((asset) => asset.id === selectedAssetId);

  const currentPrice = asset ? asset.lastPrice : 0;

  html = html
    .replaceAll("${closeIcon}", closeIcon || "")
    .replaceAll(
      "${takeProfitLabel}",
      mockup.market.tradingBlock.takeProfitLabel
    )
    .replaceAll("${stopLossLabel}", mockup.market.tradingBlock.stopLossLabel)
    .replaceAll("${currentPrice}", currentPrice)
    .replace(
      "${closeButton}",
      ButtonPrimary(
        mockup.market.tradingBlock.buttons.close.title,
        "flex-1 grow shrink-0 rounded-[100px] border border-blue-100 h-12",
        "",
        "tpsl-modal-close-button",
        "resetTpslModalToDefault()"
      )
    )
    .replace(
      "${setButton}",
      ButtonPrimary(
        mockup.market.tradingBlock.buttons.set.title,
        "flex-1 grow shrink-0 rounded-[100px] blue-gradient h-12",
        "",
        "tpsl-modal-set-button",
        "handleSetTpslButtonClick()"
      )
    );

  return html;
}
