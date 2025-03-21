import { mockup } from "../constants";

import Home from "../pages/home";
import Market from "../pages/market";
import Profile from "../pages/profile";

import { Header } from "../components/header/header";
import { MobileMenu } from "../components/header/mobile-menu";
import { updateAccounts } from "../components/home/balance-section/accounts-container";
import {
  setActiveTab,
  updateContent
} from "../components/home/account-section/accounts-header";
import { getTransactionsData } from "../components/home/last-transactions-section/last-transactions";

const routes = {
  "/": { pageName: "Home", element: Home, path: "/" },
  "/market": { pageName: "Market", element: Market, path: "/market" },
  "/profile": { pageName: "Profile", element: Profile, path: "/profile" }
};

function navigate() {
  const pageContent = document.getElementById("page-content");
  if (!pageContent) return;

  const path = window.location.pathname;
  pageContent.innerHTML = routes[path]
    ? routes[path].element()
    : "<h1>404 Not Found</h1>";

  document.body.classList.remove("no-scroll");

  const headerContainer = document.getElementById("header-wrapper");
  if (headerContainer) {
    headerContainer.innerHTML = Header();
  }

  const mobileMenuContainer = document.getElementById("menu-container");
  if (mobileMenuContainer) {
    mobileMenuContainer.innerHTML = MobileMenu();
    mobileMenuContainer.classList.add("pointer-events-none");
  }

  if (path === "/") {
    getTransactionsData();
    updateAccounts();

    const firstAccountId = mockup.home.balance.accountsMockup[0]?.accountId;

    if (firstAccountId) {
      setActiveTab(firstAccountId);
      updateContent(firstAccountId);
    }
    updateContent();
  }
}

export function navigateTo(url) {
  if (window.location.pathname !== url) {
    window.history.pushState(null, "", url);
    navigate();
  }
}

export function navigateWithRefresh(url) {
  window.history.pushState(null, "", url);
  navigate();
}

export function initRouter() {
  window.addEventListener("popstate", navigate);

  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();
      navigateTo(link.getAttribute("href"));
    }
  });

  navigate();
}
