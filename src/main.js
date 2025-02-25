import "./styles/style.scss";

import Layout from "./components/layout.js";

import { initRouter } from "./router/index.js";
import { setupTheme } from "./helpers";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("app").innerHTML = Layout();
  setupTheme();

  initRouter();
});
