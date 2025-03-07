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
      filterParams: [
        { title: "Позиции", name: "positions" },
        { title: "Открытые ордера", name: "openOrders" },
        { title: "История позиций", name: "positionsHistory" },
        { title: "История ордеров", name: "ordersHistory" }
      ],
      positionsTitles: [
        { title: "Символ", name: "symbol" },
        { title: "Size", name: "size" },
        { title: "Entry Price", name: "entryPrice" },
        { title: "Mark Price", name: "markPrice" },
        { title: "Liq.Price", name: "liquidPrice" },
        { title: "Margin", name: "margin" },
        { title: "PNL (ROI%)", name: "pnl" },
        { title: "SL/TP", name: "sltp" },
        { title: "Закрыть позиции", name: "closePositions" }
      ],
      positionsData,
      openOrdersTitles: [
        { title: "Символ", name: "symbol" },
        { title: "Тип", name: "type" },
        { title: "Позиция", name: "position" },
        { title: "Цена", name: "price" },
        { title: "Количество", name: "amount" },
        { title: "Дата открытия", name: "openingDate" },
        { title: "SL/TP", name: "sltp" },
        { title: "Отменить все", name: "cancelAll" }
      ],
      openOrdersData
    }
  },
  profile: { pageName: "Профиль", route: "/profile" },
  common: { darkThemeName: "Темная тема", exit: "Выйти" }
};
