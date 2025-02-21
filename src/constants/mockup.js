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
        { title: "Основной счет", amount: 100 },
        { title: "Инвестиционный счет", amount: 123 }
      ],
      openNewAccount: "Открыть новый счет",
      buttons: { deposit: "Ввод", withdrawal: "Вывод", transfer: "Перевод" }
    }
  },
  market: { pageName: "Торговля", route: "/market" },
  profile: { pageName: "Профиль", route: "/profile" },
  common: { darkThemeName: "Темная тема", exit: "Выйти" }
};
