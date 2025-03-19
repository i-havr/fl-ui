export const toggleTheme = () => {
  const savedTheme = localStorage.getItem("theme");

  const isLight = savedTheme === "light";

  if (isLight) {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};
