import {
  assetsList,
  deals1,
  deals2,
  history1,
  history2,
  openOrdersData,
  positionsData,
  transactions
} from "./mockData";

export const mockup = {
  home: {
    pageName: "Главная",
    route: "/",
    balance: {
      balance: "Баланс",
      accNumberTitle: "№ счета:",
      accNumber: "53190128",
      amount: 12800.33,
      isCreditAvailable: true,
      takeLoan: "Взять кредит",
      credit: "Кредит",
      creditAmount: 133.8,
      bonuses: "Бонусы",
      bonusesAmount: 100.24,
      accountsMockup: [
        {
          accountId: "1",
          title: "Торговый счет",
          amount: 12700.33,
          amountLastPeriod: 12600,
          history: history1,
          deals: deals1
        },
        {
          accountId: "2",
          title: "Инвестиционный счет",
          amount: 100,
          amountLastPeriod: 105.2,
          history: history2,
          deals: deals2
        },
        {
          accountId: "3",
          title: "Третий счет",
          amount: 100,
          amountLastPeriod: 105.2,
          history: history2,
          deals: deals2
        }
      ],
      noHistoryState: "Данных пока нет",
      openNewAccount: "Открыть новый счет",
      buttons: {
        deposit: "Ввод",
        withdrawal: "Вывод",
        transfer: "Перевод",
        openMarket: "Открыть маркет"
      },
      PnL: "PnL за сегодня",

      dealsText: {
        openDeals: "Открытые сделки",
        position: "Позиция",
        asset: "Актив",
        result: "Прибыль / Убыток",
        noDealsState: "У Вас нет открытых сделок"
      }
    },
    transactions: {
      lastTransactions: "Последние транзакции",
      id: "ID",
      date: "Дата",
      type: "Тип",
      amount: "Сумма",
      status: "Статус",
      data: transactions,
      of: "из", // для пагинации внизу списка транзакций, например "2 из 52"
      buttons: { prev: "Назад", next: "Вперед" },
      noTransactionsState: "История транзакций будет отображаться здесь"
    }
  },
  market: {
    pageName: "Торговля",
    route: "/market",
    commonButtons: {
      buy: { title: "Купить", name: "buy" },
      sell: { title: "Продать", name: "sell" }
    },
    tradingBlock: {
      buttons: {
        market: { title: "Маркет", name: "market" },
        limit: { title: "Лимит", name: "limit" },
        close: { title: "Закрыть", name: "close" },
        set: { title: "Установить", name: "set" }
      },
      orderPriceInput: {
        label: "Цена ордера",
        marketPlaceholder: "Рыночная цена",
        limitPlaceholder: "Цена ордера"
      },
      amountInput: {
        label: "Количество",
        placeholder: "Введите значение"
      },
      totalOrderAmountInput: {
        label: "Стоимость ордера",
        placeholder: "Введите значение"
      },
      takeProfitLabel: "Тейк профит",
      stopLossLabel: "Стоп-лосс",
      freeMargin: "Свободная маржа",
      maxTotalAmount: "Макс. сумма покупки"
    },
    leverage: "Кредитное плечо",
    assetsData: assetsList,
    assetsModal: {
      placeholder: "Введите значение",
      tooltip: {
        marketOpen: "Рынок открыт",
        marketClosed: "Рынок закрыт"
      },
      filterParams: [
        { title: "Все", query: "all" },
        { title: "Stocks", query: "stocks" },
        { title: "Crypto", query: "crypto" },
        { title: "Indexes", query: "indexes" },
        { title: "Forex", query: "forex" },
        { title: "Etf", query: "etf" },
        { title: "Index", query: "index" }
      ],
      assetsList: {
        assets: "Активы",
        lastPrice: "Посл.цена",
        priceDifference: "Изменения",
        emptyListState: "Нет активов для отображения"
      }
    },
    ordersSection: {
      leverage: "Кред. плечо",
      cancelButton: "Отмена",
      marketCloseButton: "Market Close",
      filterParams: [
        { title: "Позиции", name: "positions" },
        { title: "Открытые ордера", name: "openOrders" },
        { title: "История позиций", name: "positionsHistory" },
        { title: "История ордеров", name: "openOrdersHistory" }
      ],
      positionsTitles: {
        symbol: { title: "Символ", name: "symbol" },
        size: { title: "Size", name: "size" },
        entryPrice: { title: "Entry Price", name: "entryPrice" },
        markPrice: { title: "Mark Price", name: "markPrice" },
        liquidPrice: { title: "Liq.Price", name: "liquidPrice" },
        margin: { title: "Margin", name: "margin" },
        pnl: { title: "PNL (ROI%)", name: "pnl" },
        tpsl: { title: "TP/SL", name: "tpsl" },
        closePositions: { title: "Закрыть позиции", name: "closePositions" }
      },
      positionsData,
      openOrdersTitles: {
        symbol: { title: "Символ", name: "symbol" },
        type: { title: "Тип", name: "type" },
        position: { title: "Позиция", name: "position" },
        price: { title: "Цена", name: "price" },
        amount: { title: "Количество", name: "amount" },
        openingDate: { title: "Дата открытия", name: "openingDate" },
        tpsl: { title: "TP/SL", name: "tpsl" },
        cancelAll: { title: "Отменить все", name: "cancelAll" }
      },
      openOrdersData,
      emptyState: {
        positions: "Позиции будут отображаться здесь",
        openOrders: "Ордера будут отображаться здесь",
        positionsHistory: "История позиций будет отображаться здесь",
        openOrdersHistory: "История ордеров будет отображаться здесь"
      }
    }
  },
  profile: { pageName: "Профиль", route: "/profile" },
  common: { darkThemeName: "Темная тема", exit: "Выйти" }
};
