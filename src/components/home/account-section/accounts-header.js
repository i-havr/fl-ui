import { mockup } from "../../../constants";

import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import arrowRightIcon from "../../../assets/icons/arrow-right.svg?raw";

import { AccountContent } from "./account-content";
import { ButtonPrimary } from "../../buttons/button-primary";

function initSwiper() {
  new Swiper("#swiper-accounts-header", {
    slidesPerView: "auto"
  });
}

export function AccountsHeader() {
  return `
  <div class="flex justify-between items-center">
    <div id="swiper-accounts-header" class="faded-right-container swiper w-full min-[768px]:w-auto min-[768px]:flex-1 overflow-hidden !pr-10">
        <div class="swiper-wrapper flex !w-fit">

            ${mockup.home.balance.accountsMockup
              .map(
                (account) =>
                  `<div class="swiper-slide account-tab !w-fit !mr-2 md:!mr-4 py-[6px] px-[10px]" data-account-id="${account.accountId}">
                        <div class="cursor-pointer text-sm transition-colors">
                        ${account.title}
                        </div>
                    </div>`
              )
              .join("")}
        </div>

        
    </div>

    <div class="hidden min-[768px]:flex">
      ${ButtonPrimary(
        `
          <span>
              ${mockup.home.balance.buttons.openMarket}
          </span>
                      
          ${arrowRightIcon}
          `,
        "bg-blue-gradient h-9 px-[10px] rounded-lg text-xs gap-x-1",
        "/market"
      )}
    </div>


  </div>`;
}

document.addEventListener("DOMContentLoaded", async () => {
  requestAnimationFrame(() => {
    initSwiper();

    const firstAccountId = mockup.home.balance.accountsMockup[0]?.accountId;

    if (firstAccountId) {
      setActiveTab(firstAccountId);
      updateContent(firstAccountId);
    }
  });

  document.addEventListener("click", (e) => {
    const clickedTab = e.target.closest(".account-tab");

    if (clickedTab) {
      const accountId = clickedTab.getAttribute("data-account-id");
      setActiveTab(accountId);
    }
  });
});

export function setActiveTab(accountId) {
  document.querySelectorAll(".account-tab").forEach((tab) => {
    tab.classList.remove("text-textPrimary", "text-gray-primary");
    tab.classList.add("text-gray-primary");
  });

  const activeTab = document.querySelector(
    `.account-tab[data-account-id="${accountId}"]`
  );
  if (activeTab) {
    activeTab.classList.add("text-textPrimary");
    activeTab.classList.remove("text-gray-primary");
  }

  updateContent(accountId);
}

export function updateContent(accountId) {
  const contentContainer = document.getElementById("account-content");

  if (!contentContainer) return;

  const account = mockup.home.balance.accountsMockup.find((acc) => {
    return acc.accountId === accountId;
  });

  if (account) {
    contentContainer.innerHTML = `
  ${AccountContent(account)}`;
  }
}
