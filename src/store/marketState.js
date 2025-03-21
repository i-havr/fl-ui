document.addEventListener("alpine:init", () => {
  Alpine.store("market", {
    isTpslModalOpen: false,
    isLeverageModalOpen: false,
    takeProfitValue: "",
    lastTakeProfitValue: "",
    tpProfit: "0.00",
    lastTpProfit: "0.00",
    stopLossValue: "",
    lastStopLossValue: "",
    slProfit: "0.00",
    lastSlProfit: "0.00",
    leverageValue: "1",
    lastLeverageValue: "1",
    rangeSliderTradingBlockValue: "0",
    isTpslModalEditMode: false,
    isLeverageModalEditMode: false,

    normalizedLeverageValue: "0%",
    lastNormalizedLeverageValue: "0%",
    normalizedRangeSliderTradingBlockValue: "0%",

    assetVolume: "500",
    isLong: null,
    isShort: null,

    activeTab: "market",

    balanceUSDT: 50000,
    orderPrice: "",
    orderVolume: "",
    orderAmount: "",

    setNormalizedValue(
      rangeSliderValue,
      normalizedRangeSliderValue,
      minValue,
      maxValue
    ) {
      this[normalizedRangeSliderValue.replace("$store.market.", "")] =
        ((Number(this[rangeSliderValue.replace("$store.market.", "")]) -
          Number(minValue)) /
          (Number(maxValue) - Number(minValue))) *
          100 +
        "%";
    },

    resetTpslModalToDefault() {
      this.isTpslModalOpen = false;

      if (this.isTpslModalEditMode) {
        this.takeProfitValue = this.lastTakeProfitValue;
        this.stopLossValue = this.lastStopLossValue;

        this.tpProfit = this.lastTpProfit;
        this.slProfit = this.lastSlProfit;

        this.isTpslModalEditMode = false;
        return;
      }

      setTimeout(() => {
        this.takeProfitValue = "";
        this.lastTakeProfitValue = "";
        this.tpProfit = "0.00";
        this.lastTpProfit = "0.00";
        this.stopLossValue = "";
        this.lastStopLossValue = "";
        this.slProfit = "0.00";
        this.lastSlProfit = "0.00";
      }, 100);
    },

    resetLeverageModalToDefault() {
      this.isLeverageModalOpen = false;

      if (this.isLeverageModalEditMode) {
        this.leverageValue = this.lastLeverageValue;
        this.normalizedLeverageValue = this.lastNormalizedLeverageValue;

        this.isLeverageModalEditMode = false;
        return;
      }

      setTimeout(() => {
        this.leverageValue = "1";
        this.lastLeverageValue = "1";
        this.normalizedLeverageValue = "0%";
        this.lastNormalizedLeverageValue = "0%";
      }, 100);
    },

    formatNumericValue(numericValue, min = 0, max = 5) {
      return numericValue
        .toLocaleString("en-US", {
          minimumFractionDigits: min,
          maximumFractionDigits: max
        })
        .replaceAll(",", "");
    },

    formatInputNumericValue(targetValue) {
      let value = targetValue.replace(/,/g, ".");
      value = value.replace(/[^0-9.]/g, "");
      const parts = value.split(".");

      let integerPart = parts[0] || "0";
      integerPart = parseInt(integerPart, 10).toString();
      if (isNaN(integerPart)) {
        integerPart = "0";
      }

      if (parts.length > 1) {
        const decimalPart = parts.slice(1).join("");
        value = integerPart + "." + decimalPart;
      } else {
        value = integerPart;
      }

      if (value === "0" && targetValue === "0") {
        return "0";
      }

      if (value === "" || value === "0") {
        return targetValue === "" ? "" : "0";
      }

      return value;
    },

    updateFromPrice() {
      const price = parseFloat(this.orderPrice) || 0;
      const volume = parseFloat(this.orderVolume) || 0;
      const amount = parseFloat(this.orderAmount) || 0;
      const balanceUSDT = parseFloat(this.balanceUSDT) || 0;

      if (!price && !volume && !amount) {
        this.orderAmount = "";
        this.orderVolume = "";
        this.rangeSliderTradingBlockValue = "0";
        return;
      }

      if (!price && volume && !amount) {
        this.orderAmount = "";
        this.rangeSliderTradingBlockValue = "0";
        return;
      }

      if (!price && !volume && amount) {
        this.orderAmount = "";
        this.orderVolume = "";
        this.rangeSliderTradingBlockValue = "0";
        return;
      }

      if (!price && volume && amount) {
        this.orderAmount = "";
        this.rangeSliderTradingBlockValue = "0";
        return;
      }

      if (price && !volume && !amount) {
        this.orderAmount = "";
        this.orderVolume = "";
        this.rangeSliderTradingBlockValue = "0";
        return;
      }

      if (price && volume && !amount) {
        const calculatedOrderAmount = price * volume;
        if (calculatedOrderAmount > balanceUSDT) {
          this.orderAmount = this.formatNumericValue(balanceUSDT);
          this.orderVolume = this.formatNumericValue(balanceUSDT / price);
        } else {
          this.orderAmount = this.formatNumericValue(calculatedOrderAmount);
        }

        this.rangeSliderTradingBlockValue =
          parseFloat(this.orderAmount) && balanceUSDT
            ? this.formatNumericValue(
                (parseFloat(this.orderAmount) * 100) /
                  parseFloat(this.balanceUSDT)
              )
            : "0";

        return;
      }

      if (price && !volume && amount) {
        const calculatedOrderVolume = amount / price;

        this.orderVolume = this.formatNumericValue(calculatedOrderVolume);

        return;
      }

      if (price && volume && amount) {
        const calculatedOrderAmount = price * volume;

        if (calculatedOrderAmount > balanceUSDT) {
          this.orderAmount = this.formatNumericValue(balanceUSDT);
          this.orderVolume = this.formatNumericValue(balanceUSDT / price);
        } else {
          this.orderAmount = this.formatNumericValue(calculatedOrderAmount);
        }

        this.rangeSliderTradingBlockValue =
          parseFloat(this.orderAmount) && balanceUSDT
            ? this.formatNumericValue(
                (parseFloat(this.orderAmount) * 100) /
                  parseFloat(this.balanceUSDT)
              )
            : "0";

        return;
      }
    },

    updateFromVolume() {
      const price = parseFloat(this.orderPrice) || 0;
      const volume = parseFloat(this.orderVolume) || 0;
      const amount = parseFloat(this.orderAmount) || 0;
      const balanceUSDT = parseFloat(this.balanceUSDT) || 0;

      if (!price && !volume && !amount) {
        this.orderPrice = "";
        this.orderAmount = "";
        this.rangeSliderTradingBlockValue = "0";
        return;
      }

      if (!price && volume && !amount) {
        this.orderPrice = "";
        this.orderAmount = "";
        this.rangeSliderTradingBlockValue = "0";
        return;
      }

      if (!price && !volume && amount) {
        this.orderPrice = "";
        this.orderAmount = "";
        this.rangeSliderTradingBlockValue = "0";
        return;
      }

      if (!price && volume && amount) {
        if (this.activeTab === "market") {
          this.orderAmount = "";
        } else {
          const calculatedOrderPrice = amount / volume;
          this.orderPrice = this.formatNumericValue(calculatedOrderPrice);
        }

        return;
      }

      if (price && !volume && !amount) {
        this.orderAmount = "";
        this.rangeSliderTradingBlockValue = "0";
        return;
      }

      if (price && volume && !amount) {
        const calculatedOrderAmount = price * volume;

        if (calculatedOrderAmount > balanceUSDT) {
          this.orderAmount = this.formatNumericValue(balanceUSDT);
          this.orderVolume = this.formatNumericValue(
            parseFloat(this.orderAmount) / price
          );
        } else {
          this.orderAmount = this.formatNumericValue(calculatedOrderAmount);
        }

        this.rangeSliderTradingBlockValue =
          parseFloat(this.orderAmount) && balanceUSDT
            ? this.formatNumericValue(
                (parseFloat(this.orderAmount) * 100) /
                  parseFloat(this.balanceUSDT)
              )
            : "0";

        return;
      }

      if (price && !volume && amount) {
        this.orderAmount = "";
        this.rangeSliderTradingBlockValue = "0";
        return;
      }

      if (price && volume && amount) {
        const calculatedOrderAmount = price * volume;

        if (calculatedOrderAmount > balanceUSDT) {
          this.orderAmount = this.formatNumericValue(balanceUSDT);
          this.orderVolume = this.formatNumericValue(
            parseFloat(this.orderAmount) / price
          );
        } else {
          this.orderAmount = this.formatNumericValue(calculatedOrderAmount);
        }

        this.rangeSliderTradingBlockValue =
          parseFloat(this.orderAmount) && balanceUSDT
            ? this.formatNumericValue(
                (parseFloat(this.orderAmount) * 100) /
                  parseFloat(this.balanceUSDT)
              )
            : "0";

        return;
      }
    },

    updateFromAmount() {
      const price = parseFloat(this.orderPrice) || 0;
      const volume = parseFloat(this.orderVolume) || 0;
      const amount = parseFloat(this.orderAmount) || 0;
      const balanceUSDT = parseFloat(this.balanceUSDT) || 0;

      if (!price && !volume && !amount) {
        this.orderPrice = "";
        this.orderVolume = "";
        if (this.rangeSliderTradingBlockValue !== "0") {
          this.rangeSliderTradingBlockValue = "0";
        }
        return;
      }

      if (!price && volume && !amount) {
        this.orderPrice = "";
        if (this.rangeSliderTradingBlockValue !== "0") {
          this.rangeSliderTradingBlockValue = "0";
        }
        return;
      }

      if (!price && !volume && amount) {
        this.orderPrice = "";
        this.orderVolume = "";

        if (amount > balanceUSDT) {
          this.orderAmount = this.formatNumericValue(balanceUSDT);
        } else {
          this.orderAmount = this.formatNumericValue(amount);
        }

        if (
          parseFloat(this.orderAmount) &&
          balanceUSDT &&
          this.rangeSliderTradingBlockValue !==
            this.formatNumericValue(
              (parseFloat(this.orderAmount) * 100) / balanceUSDT
            )
        ) {
          this.rangeSliderTradingBlockValue = this.formatNumericValue(
            (parseFloat(this.orderAmount) * 100) / balanceUSDT
          );
        }

        if (
          (!parseFloat(this.orderAmount) || !balanceUSDT) &&
          this.rangeSliderTradingBlockValue !== "0"
        ) {
          this.rangeSliderTradingBlockValue = "0";
        }

        return;
      }

      if (!price && volume && amount) {
        if (amount > balanceUSDT) {
          this.orderAmount = this.formatNumericValue(balanceUSDT);
          this.orderPrice = this.formatNumericValue(balanceUSDT / volume);
        } else {
          this.orderAmount = this.formatNumericValue(amount);
          this.orderPrice = this.formatNumericValue(amount / volume);
        }

        if (
          parseFloat(this.orderAmount) &&
          balanceUSDT &&
          this.rangeSliderTradingBlockValue !==
            this.formatNumericValue(
              (parseFloat(this.orderAmount) * 100) / balanceUSDT
            )
        ) {
          this.rangeSliderTradingBlockValue = this.formatNumericValue(
            (parseFloat(this.orderAmount) * 100) / balanceUSDT
          );
        }

        if (
          (!parseFloat(this.orderAmount) || !balanceUSDT) &&
          this.rangeSliderTradingBlockValue !== "0"
        ) {
          this.rangeSliderTradingBlockValue = "0";
        }

        return;
      }

      if (price && !volume && !amount) {
        this.orderVolume = "";
        if (this.rangeSliderTradingBlockValue !== "0") {
          this.rangeSliderTradingBlockValue = "0";
        }
        return;
      }

      if (price && volume && !amount) {
        this.orderVolume = "";
        if (this.rangeSliderTradingBlockValue !== "0") {
          this.rangeSliderTradingBlockValue = "0";
        }
        return;
      }

      if (price && !volume && amount) {
        if (amount > balanceUSDT) {
          this.orderAmount = this.formatNumericValue(balanceUSDT);
          this.orderVolume = this.formatNumericValue(balanceUSDT / price);
        } else {
          this.orderAmount = this.formatNumericValue(amount);
          this.orderVolume = this.formatNumericValue(amount / price);
        }

        if (
          parseFloat(this.orderAmount) &&
          balanceUSDT &&
          this.rangeSliderTradingBlockValue !==
            this.formatNumericValue(
              (parseFloat(this.orderAmount) * 100) / balanceUSDT
            )
        ) {
          this.rangeSliderTradingBlockValue = this.formatNumericValue(
            (parseFloat(this.orderAmount) * 100) / balanceUSDT
          );
        }

        if (
          (!parseFloat(this.orderAmount) || !balanceUSDT) &&
          this.rangeSliderTradingBlockValue !== "0"
        ) {
          this.rangeSliderTradingBlockValue = "0";
        }

        return;
      }

      if (price && volume && amount) {
        if (amount > balanceUSDT) {
          this.orderAmount = this.formatNumericValue(balanceUSDT);
          this.orderVolume = this.formatNumericValue(balanceUSDT / price);
        } else {
          this.orderAmount = this.formatNumericValue(amount);
          this.orderVolume = this.formatNumericValue(amount / price);
        }

        if (
          parseFloat(this.orderAmount) &&
          balanceUSDT &&
          this.rangeSliderTradingBlockValue !==
            this.formatNumericValue(
              (parseFloat(this.orderAmount) * 100) / balanceUSDT
            )
        ) {
          this.rangeSliderTradingBlockValue = this.formatNumericValue(
            (parseFloat(this.orderAmount) * 100) / balanceUSDT
          );
        }

        if (
          (!parseFloat(this.orderAmount) || !balanceUSDT) &&
          this.rangeSliderTradingBlockValue !== "0"
        ) {
          this.rangeSliderTradingBlockValue = "0";
        }

        return;
      }
    },

    updateFromSlider() {
      const balanceUSDT = parseFloat(this.balanceUSDT) || 0;
      const sliderValue = parseFloat(this.rangeSliderTradingBlockValue) || 0;

      if (!balanceUSDT) {
        this.orderAmount = "";
        this.rangeSliderTradingBlockValue = "0";
        return;
      }

      const calculatedOrderAmount = sliderValue * balanceUSDT;

      this.orderAmount = calculatedOrderAmount
        ? this.formatNumericValue(calculatedOrderAmount / 100)
        : "";

      this.updateFromAmount();
    }
  });
});
