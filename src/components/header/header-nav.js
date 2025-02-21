import { mockup } from "../../constants/mockup";

export const HeaderNav = () => {
  return `
  <nav class="mx-auto flex items-center">
                 <ul class="flex flex-col space-x-4">
                   <li><a href="index.html" class="hover:underline">${mockup.home.pageName}</a></li>
                   <li><a href="about.html" class="hover:underline">${mockup.market.pageName}</a></li>
                   <li><a href="contact.html" class="hover:underline">${mockup.profile.pageName}</a></li>
                 </ul>
               </nav>`;
};
