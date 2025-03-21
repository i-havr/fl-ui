import "./styles/style.css";

import Layout from "./components/layout.js";

import { initMarketState } from "./store/marketState.js";
import { initRouter } from "./router/index.js";
import { setupTheme } from "./helpers";

initMarketState();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("app").innerHTML = Layout();
  setupTheme();
  initRouter();
});
