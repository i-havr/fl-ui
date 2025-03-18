import rangeSliderPrimaryThumbIcon from "../../assets/icons/range-slider-primary-thumb-icon.svg?raw";

import rangeSliderPrimaryHtml from "./range-slider-primary.html?raw";

export default function RangeSliderPrimary(place) {
  let html = rangeSliderPrimaryHtml;

  const getTemplates = (place) => {
    switch (place) {
      case "tradingBlock":
        return {
          rangeSliderValue: "rangeSliderTradingBlockValue",
          normalizedRangeSliderValue: "normalizedRangeSliderTradingBlockValue",
          sign: "%",
          mark1: "0",
          mark2: "25",
          mark3: "50",
          mark4: "75",
          mark5: "100",
          isCentered: false,
          minValue: 0,
          maxValue: 100
        };

      case "leverageModal":
        return {
          rangeSliderValue: "leverageValue",
          normalizedRangeSliderValue: "normalizedLeverageValue",
          sign: "x",
          mark1: "1",
          mark2: "25",
          mark3: "50",
          mark4: "75",
          mark5: "100",
          isCentered: false,
          minValue: 1,
          maxValue: 100
        };

      default:
        return {
          rangeSliderValue: "",
          sign: "%",
          mark1: "0",
          mark2: "25",
          mark3: "50",
          mark4: "75",
          mark5: "100",
          isCentered: false,
          minValue: 0,
          maxValue: 100
        };
    }
  };

  const template = getTemplates(place);

  html = html
    .replaceAll("${rangeSliderPrimaryThumbIcon}", rangeSliderPrimaryThumbIcon)
    .replaceAll("${rangeSliderValue}", template.rangeSliderValue)
    .replaceAll(
      "${normalizedRangeSliderValue}",
      template.normalizedRangeSliderValue
    )
    .replaceAll("${sign}", template.sign)
    .replaceAll("${mark1}", template.mark1)
    .replaceAll("${mark2}", template.mark2)
    .replaceAll("${mark3}", template.mark3)
    .replaceAll("${mark4}", template.mark4)
    .replaceAll("${mark5}", template.mark5)
    .replaceAll("${isCentered}", template.isCentered)
    .replaceAll("${minValue}", template.minValue)
    .replaceAll("${maxValue}", template.maxValue);

  return html;
}
