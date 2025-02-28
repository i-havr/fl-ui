import cn from "classnames";

import { mockup } from "../../constants";

import homeLinkIcon from "../../assets/icons/home-link-icon.svg?raw";
import marketLinkIcon from "../../assets/icons/market-link-icon.svg?raw";
import profileLinkIcon from "../../assets/icons/profile-link-icon.svg?raw";

export function Nav() {
  const currentPath = window.location.pathname;

  const linkStyle = (route) => {
    return cn(
      "flex items-center md:text-gray-primary gap-x-3 h-10 px-3 py-2 text-left opacity-75 md:opacity-100 md:text-[17px]",
      {
        "bg-black-primary opacity-100 font-medium rounded-lg md:text-text-primary md:font-normal pointer-events-none":
          currentPath === route
      }
    );
  };

  return `<nav class="flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:gap-x-[30px] mb-7 md:mb-0">
        <a href="/" data-link class="${linkStyle("/")}">
        <div class="md:hidden">${homeLinkIcon}</div>
        ${mockup.home.pageName}
        </a>

        <a href="/market" data-link class="${linkStyle("/market")}">
        <div class="md:hidden">${marketLinkIcon}</div>
        ${mockup.market.pageName}
        </a>

        <a href="/profile" data-link class="${linkStyle("/profile")}">
        <div class="md:hidden">${profileLinkIcon}</div>
        ${mockup.profile.pageName}
        </a>
      </nav>`;
}
