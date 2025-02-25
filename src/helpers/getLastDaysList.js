import { locales } from "../constants";

export const getLastDaysList = (daysNumber) => {
  const days = [];
  const options = { day: "2-digit", month: "short" };

  const currentLanguage = localStorage.getItem("language") || "ru";

  for (let i = daysNumber - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(
      date.toLocaleDateString(locales[currentLanguage], options).toLowerCase()
    );
  }

  return days;
};
