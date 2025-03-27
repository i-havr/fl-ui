import { Footer } from "./footer";
import { Header } from "./header/header";

export default function Layout() {
  return `
  <div class="flex flex-col w-full mx-auto text-center min-h-screen pt-4 md:pt-[25px]">

    <div id='header-wrapper'>${Header()}</div>
    
    <main id="page-content" class="h-full flex-1">
    </main>

    ${Footer()}
  </div>`;
}
