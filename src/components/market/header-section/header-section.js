import chevronIconRight from "../../../assets/icons/chevron-icon-right.svg?raw";
import { formatAmount } from "../../../helpers";
import { AssetsModal } from "./assets-modal";
import headerSectionHtml from "./header-section.html?raw";

export default function HeaderSection(asset) {
  let html = headerSectionHtml;

  html = html
    .replaceAll("${assetName}", asset.name)
    .replace("${chevronIconRight}", chevronIconRight)
    .replaceAll("${assetCurrency}", asset.currency)
    .replace(
      "${assetBalanceUSD}",
      asset.balanceUSD.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
      })
    )
    .replace("${assetBalanceCurrency}", asset.balanceCurrency)
    .replace(
      "${assetChangeClass}",
      asset.change < 0 ? " text-red-secondary" : ""
    )
    .replace("${assetChange}", formatAmount(asset.change))
    .replace("${assetHight}", asset.hight)
    .replace("${assetLow}", asset.low)
    .replace("${AssetsModal}", AssetsModal())
    .replace(
      "${assetChangeClass}",
      asset.change < 0 ? "text-red-secondary" : ""
    );

  return html;
}
