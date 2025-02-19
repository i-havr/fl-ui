import cn from "classnames";

import { text } from "../../constants/text";

import { HomeLinkIcon, MarketLinkIcon, ProfileLinkIcon } from "../icons";

export function Nav() {
  const currentPath = window.location.pathname;

  const linkStyle = (route) => {
    return cn(
      "flex items-center md:text-gray-primary gap-x-3 h-10 px-3 py-2 text-left opacity-75 md:opacity-100 md:text-[17px]",
      {
        "bg-accentSecondary opacity-100 font-medium rounded-lg md:text-textPrimary md:font-normal":
          currentPath === route
      }
    );
  };

  return `<nav class="flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:gap-x-[30px] mb-7 md:mb-0">
        <a href="/" data-link class="${linkStyle("/")}">
        <div class="md:hidden">${HomeLinkIcon()}</div>
        ${text.home.pageName}
        </a>

        <a href="/market" data-link class="${linkStyle("/market")}">
        <div class="md:hidden">${MarketLinkIcon()}</div>
        ${text.market.pageName}
        </a>

        <a href="/profile" data-link class="${linkStyle("/profile")}">
        <div class="md:hidden">${ProfileLinkIcon()}</div>
        ${text.profile.pageName}
        </a>
      </nav>`;
}
