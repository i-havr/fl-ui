export const toggleTheme = () => {
  const isLight = document.documentElement.classList.toggle("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
};
