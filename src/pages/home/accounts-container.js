import { mockup } from "../../constants/mockup";

import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { OpenNewAccountBtn } from "./open-new-account-btn";

function initSwiper() {
  new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
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
        <div class="cursor-pointer shrink-0 w-[240px] h-[125px] flex flex-col justify-start items-start gap-y-6 p-[18px] rounded-lg border border-gray-linePrimary hover:opacity-85 active:opacity-75 transition-opacity">
            <span class="font-medium">${account.title}</span>
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
    <div class="swiper w-full !pb-[26px] overflow-hidden ">
      <div id="accounts-slider-wrapper" class="swiper-wrapper flex !w-fit"></div>

      <div class="swiper-pagination w-full"></div>
    </div> 
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  // fetch accounts from backend
  const accounts = mockup.home.balance.accountsMockup;

  setTimeout(() => {
    renderCards(accounts);
  }, 0);
});
