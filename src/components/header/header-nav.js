import { text } from "../../constants/text";

export const HeaderNav = () => {
  return `
  <nav class="mx-auto flex items-center">
                 <ul class="flex flex-col space-x-4">
                   <li><a href="index.html" class="hover:underline">${text.home.pageName}</a></li>
                   <li><a href="about.html" class="hover:underline">${text.market.pageName}</a></li>
                   <li><a href="contact.html" class="hover:underline">${text.profile.pageName}</a></li>
                 </ul>
               </nav>`;
};
