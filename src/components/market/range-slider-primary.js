import rangeSliderPrimaryThumbIcon from "../../assets/icons/range-slider-primary-thumb-icon.svg?raw";

import rangeSliderPrimaryHtml from "./range-slider-primary.html?raw";

export default function RangeSliderPrimary(place) {
  let html = rangeSliderPrimaryHtml;

  const getSelectors = (place) => {
    switch (place) {
      case "tradingBlock":
        return {
          rangeSliderValue: "rangeSliderTradingBlockValue",
          inputClass: "range-slider-input-trading-block",
          selectorClass: "range-slider-selector-trading-block",
          progressBarClass: "range-slider-progress-bar-trading-block"
        };
      case "tpslModalTP":
        return {
          rangeSliderValue: "takeProfitValue",
          inputClass: "range-slider-input-tpsl-modal-tp",
          selectorClass: "range-slider-selector-tpsl-modal-tp",
          progressBarClass: "range-slider-progress-bar-tpsl-modal-tp"
        };

      default:
        return {
          rangeSliderValue: "",
          inputClass: "",
          selectorClass: "",
          progressBarClass: ""
        };
    }
  };

  html = html
    .replaceAll("${rangeSliderPrimaryThumbIcon}", rangeSliderPrimaryThumbIcon)
    .replaceAll("${rangeSliderValue}", getSelectors(place).rangeSliderValue)
    .replaceAll("${inputClass}", getSelectors(place).inputClass)
    .replaceAll("${selectorClass}", getSelectors(place).selectorClass)
    .replaceAll("${progressBarClass}", getSelectors(place).progressBarClass);

  return html;
}
