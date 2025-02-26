import { deals1, deals2, history1, history2, transactions } from "./mockData";

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
      buttons: { prev: "Назад", next: "Вперед" }
    }
  },
  market: { pageName: "Торговля", route: "/market" },
  profile: { pageName: "Профиль", route: "/profile" },
  common: { darkThemeName: "Темная тема", exit: "Выйти" }
};
