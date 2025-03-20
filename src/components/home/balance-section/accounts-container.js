import { mockup } from "../../../constants";

import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { OpenNewAccountBtn } from "./open-new-account-btn";

function initSwiper() {
  new Swiper("#accounts-container", {
    slidesPerView: "auto",
    spaceBetween: window.innerWidth < 768 ? 16 : 30,
    modules: [Pagination],
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      dynamicMainBullets: mockup.home.balance.accountsMockup.length + 1,
      clickable: true
    }
  });
}

function renderCards(accounts) {
  const container = document.getElementById("accounts-slider-wrapper");

  if (!container) return;

  container.innerHTML = "";

  if (accounts.length === 0) {
    container.innerHTML = `<div class="swiper-slide !w-fit !mr-4 md:!mr-[26px] xl:!mr-8">
    ${OpenNewAccountBtn()}
  </div>`;
    return;
  }

  accounts.forEach((account) => {
    const card = `
    <div class="swiper-slide !w-fit">
        <div class="cursor-pointer shrink-0 w-[240px] h-[125px] flex flex-col justify-start items-start gap-y-6 p-[18px] rounded-lg border border-gray-line-primary hover:opacity-85 active:opacity-75 transition-opacity">
            <span class="font-medium text-left">${account.title}</span>
            <span class="font-semibold text-xl">$${account.amount.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              }
            )}</span>  
        </div>
    </div>`;

    container.innerHTML += card;
  });

  container.innerHTML += `
  <div class="swiper-slide !w-fit !mr-4 md:!mr-[26px] xl:!mr-8">
    ${OpenNewAccountBtn()}
  </div>`;

  requestAnimationFrame(() => {
    initSwiper();
  });
}

export function AccountsContainer() {
  return `  
    <div id="accounts-container" class="swiper w-full !pb-[26px] overflow-hidden">
      <div id="accounts-slider-wrapper" class="swiper-wrapper flex !w-fit"></div>

      <div class="swiper-pagination w-full"></div>
    </div> 
  `;
}

export function updateAccounts() {
  const accounts = mockup.home.balance.accountsMockup;

  renderCards(accounts);
}

document.addEventListener("DOMContentLoaded", async () => {
  // fetch accounts from backend
  updateAccounts();
});
