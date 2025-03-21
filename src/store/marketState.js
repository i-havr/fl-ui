export function initMarketState() {
  document.addEventListener("alpine:init", () => {
    Alpine.store("market", {
      selectedAssetData: {},
      selectedPositionType: "",
      selectedPositionLeverage: "",

      isTradingModalOpen: false,
      isTpslModalOpen: true,
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

      isLong: null,
      isShort: null,

      activeTab: "market",
      assetMarketPrice: 0,
      balanceUSDT: 0,
      orderPrice: "",
      orderVolume: "",
      orderAmount: "",

      tpslModalPlace: "",

      setActiveTab(tab) {
        this.activeTab = tab;
        this.orderPrice = tab === "market" ? this.assetMarketPrice : "";
      },

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

      resetTradingBlockModalToDefault() {
        this.activeTab = "market";
        this.orderPrice = this.assetMarketPrice;
        this.orderVolume = "";
        this.orderAmount = "";
        this.rangeSliderTradingBlockValue = "0";
        this.normalizedRangeSliderTradingBlockValue = "0%";

        this.normalizedLeverageValue = "0%";
        this.lastNormalizedLeverageValue = "0%";

        this.takeProfitValue = "";
        this.lastTakeProfitValue = "";
        this.tpProfit = "0.00";
        this.lastTpProfit = "0.00";
        this.stopLossValue = "";
        this.lastStopLossValue = "";
        this.slProfit = "0.00";
        this.lastSlProfit = "0.00";
        this.leverageValue = "1";
        this.lastLeverageValue = "1";

        document.body.classList.remove("no-scroll");
      },

      resetTpslModalToDefault() {
        this.isTpslModalOpen = false;
        this.tpslModalPlace = "";
        this.selectedPositionType = "";
        this.selectedPositionLeverage = "";

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

        if (!balanceUSDT) {
          this.orderVolume = this.orderVolume === "" ? "" : "0";
          this.orderAmount = this.orderVolume === "" ? "" : "0";
          return;
        }

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
          this.orderVolume = "";
          this.rangeSliderTradingBlockValue = "0";
          return;
        }

        const calculatedOrderAmount = sliderValue * balanceUSDT;

        this.orderAmount = calculatedOrderAmount
          ? this.formatNumericValue(calculatedOrderAmount / 100)
          : "";

        this.updateFromAmount();
      },

      handleSetTpslButtonClick() {
        this.isTpslModalOpen = false;
        this.isTpslModalEditMode = false;
        this.tpslModalPlace = "";

        if (parseFloat(this.takeProfitValue)) {
          this.lastTakeProfitValue = this.takeProfitValue;
          this.lastTpProfit = this.tpProfit;
        } else {
          this.takeProfitValue = "";
          this.lastTakeProfitValue = "";
          this.tpProfit = "0.00";
          this.lastTpProfit = "0.00";
        }

        if (parseFloat(this.stopLossValue)) {
          this.lastStopLossValue = this.stopLossValue;
          this.lastSlProfit = this.slProfit;
        } else {
          this.stopLossValue = "";
          this.lastStopLossValue = "";
          this.slProfit = "0.00";
          this.lastSlProfit = "0.00";
        }

        if (this.takeProfitValue.endsWith(".")) {
          this.takeProfitValue = this.takeProfitValue.slice(0, -1);
          this.lastTakeProfitValue = this.takeProfitValue;
        }

        if (this.stopLossValue.endsWith(".")) {
          this.stopLossValue = this.stopLossValue.slice(0, -1);
          this.lastStopLossValue = this.stopLossValue;
        }
      },

      updateTpValues() {
        if (!this.takeProfitValue) {
          this.isLong = null;
          this.isShort = null;
          this.tpProfit = "0.00";
        }

        const tpValue = parseFloat(this.takeProfitValue);
        const orderVolume = parseFloat(this.orderVolume) || 0;

        if (!isNaN(tpValue)) {
          if (this.assetMarketPrice) {
            if (this.assetMarketPrice > tpValue) {
              this.isLong = false;
              this.isShort = true;
              console.log("here1", tpValue);

              const profit = (this.assetMarketPrice - tpValue) * orderVolume;
              this.tpProfit = profit.toLocaleString("en-US");
            } else {
              this.isLong = true;
              this.isShort = false;

              const profit = (tpValue - this.assetMarketPrice) * orderVolume;
              this.tpProfit = profit.toLocaleString("en-US");
            }
          }
        }

        this.updateSlValues();
      },

      updateSlValues() {
        if (!this.stopLossValue) {
          this.slProfit = "0.00";
          if (!this.takeProfitValue) {
            this.isLong = null;
            this.isShort = null;
          }
        }

        const slValue = parseFloat(this.stopLossValue);
        const orderVolume = parseFloat(this.orderVolume) || 0;

        if (!isNaN(slValue)) {
          if (this.assetMarketPrice) {
            if (!this.takeProfitValue && this.assetMarketPrice > slValue) {
              this.isLong = false;
              this.isShort = true;

              const profit = (slValue - this.assetMarketPrice) * orderVolume;
              this.slProfit = profit.toLocaleString("en-US");
            }

            if (!this.takeProfitValue && this.assetMarketPrice < slValue) {
              this.isLong = true;
              this.isShort = false;

              const profit = (this.assetMarketPrice - slValue) * orderVolume;
              this.slProfit = profit.toLocaleString("en-US");
            }

            if (this.takeProfitValue && this.assetMarketPrice > slValue) {
              if (this.isLong) {
                const profit = (slValue - this.assetMarketPrice) * orderVolume;
                this.slProfit = profit.toLocaleString("en-US");
              } else {
                const profit = (this.assetMarketPrice - slValue) * orderVolume;
                this.slProfit = profit.toLocaleString("en-US");
              }
            }

            if (this.takeProfitValue && this.assetMarketPrice < slValue) {
              if (this.isLong) {
                const profit = (this.assetMarketPrice - slValue) * orderVolume;
                this.slProfit = profit.toLocaleString("en-US");
              } else {
                const profit = (slValue - this.assetMarketPrice) * orderVolume;
                this.slProfit = profit.toLocaleString("en-US");
              }
            }
          }
        }
      }
    });
  });
}
