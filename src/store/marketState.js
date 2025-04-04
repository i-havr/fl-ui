export function initMarketState() {
  const initializeStore = () => {
    Alpine.store("market", {
      selectedAssetData: {},

      selectedPositionType: "",
      selectedPositionLeverage: "",
      selectedPositionEntryPrice: "",

      // item is a position or open order
      selectedItemId: "",
      selectedItemTakeProfitValue: "",
      selectedItemStopLossValue: "",
      selectedItemVolume: "",
      selectedItemTpProfit: "",
      selectedItemSlProfit: "",

      isTradingModalOpen: false,
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
      shouldUpdateProfit: true,

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

      tpslModalPlace: "tradingBlock",
      tpValueKey: "takeProfitValue",
      slValueKey: "stopLossValue",
      tpProfitKey: "tpProfit",
      slProfitKey: "slProfit",

      openTpslModal() {
        this.isTpslModalOpen = true;

        if (window.innerWidth >= 768) {
          // remove first in case there was a resizing
          document.body.classList.remove("no-scroll");
          document.body.classList.add("no-scroll");
        }
      },

      closeTpslModal() {
        this.isTpslModalOpen = false;

        if (window.innerWidth >= 768) {
          document.body.classList.remove("no-scroll");
        }
      },

      openLeverageModal() {
        this.isLeverageModalOpen = true;

        if (window.innerWidth >= 768) {
          // remove first in case there was a resizing
          document.body.classList.remove("no-scroll");
          document.body.classList.add("no-scroll");
        }
      },

      closeLeverageModal() {
        this.isLeverageModalOpen = false;

        if (window.innerWidth >= 768) {
          document.body.classList.remove("no-scroll");
        }
      },

      setActiveTab(tab) {
        this.activeTab = tab;
        this.orderPrice = tab === "market" ? this.assetMarketPrice : "";

        this.updateFromPrice();
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

        this.resetTpslModalPlace();

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

      resetTpslModalPlace() {
        this.tpslModalPlace = "tradingBlock";
        this.selectedItemId = "";
        this.tpValueKey = "takeProfitValue";
        this.slValueKey = "stopLossValue";
        this.tpProfitKey = "tpProfit";
        this.slProfitKey = "slProfit";
      },

      resetTpslModalToDefault() {
        this.closeTpslModal();

        if (this.tpslModalPlace !== "tradingBlock") {
          document.body.classList.remove("no-scroll");
        }

        setTimeout(() => {
          this.resetTpslModalPlace();

          this.selectedPositionType = "";
          this.selectedPositionLeverage = "";
          this.selectedPositionEntryPrice = "";

          this.selectedItemTakeProfitValue = "";
          this.selectedItemStopLossValue = "";
          this.selectedItemVolume = "";
          this.selectedItemTpProfit = "";
          this.selectedItemSlProfit = "";
        }, 300);

        if (this.isTpslModalEditMode) {
          this.takeProfitValue = this.lastTakeProfitValue;
          this.stopLossValue = this.lastStopLossValue;

          if (this.shouldUpdateProfit) {
            this.tpProfit = this.lastTpProfit;
            this.slProfit = this.lastSlProfit;
          } else {
            this.lastTpProfit = this.tpProfit;
            this.lastSlProfit = this.slProfit;
            this.shouldUpdateProfit = true;
          }

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
        this.closeLeverageModal();

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

      formatAmountWithoutCurrency(value, min = 0, max = 2) {
        return value
          .toLocaleString("en-US", {
            minimumFractionDigits: min,
            maximumFractionDigits: max
          })
          .replaceAll(",", " ")
          .replaceAll(".", ",");
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
          const limitedDecimalPart = decimalPart.slice(0, 5);
          value = integerPart + "." + limitedDecimalPart;
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
        if (
          !this.isTpslModalEditMode &&
          (parseFloat(this.takeProfitValue) || parseFloat(this.stopLossValue))
        ) {
          this.shouldUpdateProfit = false;
        }

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
        this.closeTpslModal();
        this.isTpslModalEditMode = false;

        if (this.tpslModalPlace === "tradingBlock") {
          if (parseFloat(this.takeProfitValue)) {
            this.takeProfitValue = parseFloat(this.takeProfitValue).toString();
            this.lastTakeProfitValue = this.takeProfitValue;
            this.lastTpProfit = this.tpProfit;
          } else {
            this.takeProfitValue = "";
            this.lastTakeProfitValue = "";
            this.tpProfit = "0.00";
            this.lastTpProfit = "0.00";
          }

          if (parseFloat(this.stopLossValue)) {
            this.stopLossValue = parseFloat(this.stopLossValue).toString();
            this.lastStopLossValue = this.stopLossValue;
            this.lastSlProfit = this.slProfit;
          } else {
            this.stopLossValue = "";
            this.lastStopLossValue = "";
            this.slProfit = "0.00";
            this.lastSlProfit = "0.00";
          }

          return;
        }

        if (this.tpslModalPlace === "positions") {
          this.selectedItemTakeProfitValue = parseFloat(
            this.selectedItemTakeProfitValue
          ).toString();
          this.selectedItemStopLossValue = parseFloat(
            this.selectedItemStopLossValue
          ).toString();
          this.updatePositionTpsl(this.selectedItemId);
          this.resetTpslModalToDefault();

          return;
        }

        if (this.tpslModalPlace === "openOrders") {
          this.selectedItemTakeProfitValue = parseFloat(
            this.selectedItemTakeProfitValue
          ).toString();
          this.selectedItemStopLossValue = parseFloat(
            this.selectedItemStopLossValue
          ).toString();
          this.updateOpenOrderTpsl(this.selectedItemId);
          this.resetTpslModalToDefault();

          return;
        }
      },

      updateTpValues() {
        const takeProfitValue =
          this.tpslModalPlace === "tradingBlock"
            ? this.takeProfitValue
            : this.selectedItemTakeProfitValue;

        const tpProfitKey =
          this.tpslModalPlace === "tradingBlock"
            ? "tpProfit"
            : "selectedItemTpProfit";

        if (!takeProfitValue) {
          this.isLong = null;
          this.isShort = null;
          this[tpProfitKey] = "0.00";
        }

        const tpValue = parseFloat(takeProfitValue);

        const orderVolume =
          this.tpslModalPlace === "tradingBlock"
            ? parseFloat(this.orderVolume) || 0
            : parseFloat(this.selectedItemVolume);

        if (!isNaN(tpValue)) {
          if (this.assetMarketPrice) {
            if (this.assetMarketPrice > tpValue) {
              this.isLong = false;
              this.isShort = true;

              const profit = (this.assetMarketPrice - tpValue) * orderVolume;
              this[tpProfitKey] = profit.toLocaleString("en-US");
            } else {
              this.isLong = true;
              this.isShort = false;

              const profit = (tpValue - this.assetMarketPrice) * orderVolume;
              this[tpProfitKey] = profit.toLocaleString("en-US");
            }
          }
        }

        this.updateSlValues();
      },

      updateSlValues() {
        const takeProfitValue =
          this.tpslModalPlace === "tradingBlock"
            ? this.takeProfitValue
            : this.selectedItemTakeProfitValue;

        const stopLossValue =
          this.tpslModalPlace === "tradingBlock"
            ? this.stopLossValue
            : this.selectedItemStopLossValue;

        const slProfitKey =
          this.tpslModalPlace === "tradingBlock"
            ? "slProfit"
            : "selectedItemSlProfit";

        if (!stopLossValue) {
          this[slProfitKey] = "0.00";

          if (!takeProfitValue) {
            this.isLong = null;
            this.isShort = null;
          }
        }

        const slValue = parseFloat(stopLossValue);
        const orderVolume =
          this.tpslModalPlace === "tradingBlock"
            ? parseFloat(this.orderVolume) || 0
            : parseFloat(this.selectedItemVolume);

        if (!isNaN(slValue)) {
          if (this.assetMarketPrice) {
            if (!takeProfitValue && this.assetMarketPrice > slValue) {
              this.isLong = false;
              this.isShort = true;

              const profit = (slValue - this.assetMarketPrice) * orderVolume;
              this[slProfitKey] = profit.toLocaleString("en-US");
            }

            if (!takeProfitValue && this.assetMarketPrice < slValue) {
              this.isLong = true;
              this.isShort = false;

              const profit = (this.assetMarketPrice - slValue) * orderVolume;
              this[slProfitKey] = profit.toLocaleString("en-US");
            }

            if (takeProfitValue && this.assetMarketPrice > slValue) {
              if (this.isLong) {
                const profit = (slValue - this.assetMarketPrice) * orderVolume;
                this[slProfitKey] = profit.toLocaleString("en-US");
              } else {
                const profit = (this.assetMarketPrice - slValue) * orderVolume;
                this[slProfitKey] = profit.toLocaleString("en-US");
              }
            }

            if (takeProfitValue && this.assetMarketPrice < slValue) {
              if (this.isLong) {
                const profit = (this.assetMarketPrice - slValue) * orderVolume;
                this[slProfitKey] = profit.toLocaleString("en-US");
              } else {
                const profit = (slValue - this.assetMarketPrice) * orderVolume;
                this[slProfitKey] = profit.toLocaleString("en-US");
              }
            }
          }
        }
      },

      updatePositionTpsl(positionId) {
        console.log(
          "Need to send request to update Position with id:",
          positionId
        );
      },

      updateOpenOrderTpsl(openOrderId) {
        console.log(
          "Need to send request to update Open Order with id:",
          openOrderId
        );
      },

      viewTpslButtonClick(place) {
        this.isTpslModalOpen = true;

        this.tpslModalPlace = place;
        this.tpValueKey = "selectedItemTakeProfitValue";
        this.slValueKey = "selectedItemStopLossValue";
        this.tpProfitKey = "selectedItemTpProfit";
        this.slProfitKey = "selectedItemSlProfit";

        this.updateTpValues();
        this.updateSlValues();

        document.body.classList.add("no-scroll");
      },

      buyAsset() {
        console.log("Buy button clicked!");
      },

      sellAsset() {
        console.log("Sell button clicked!");
      }
    });
  };

  if (window.Alpine) {
    initializeStore();
  } else {
    document.addEventListener("alpine:init", initializeStore);
  }
}
