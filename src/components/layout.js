import { Header } from "./header/header";

export default function Layout() {
  return `<div class="flex flex-col w-full mx-auto text-center min-h-screen md:pt-[25px]">

  <div id='header-wrapper'>${Header()}</div>
    
    <main id="page-content" class="pt-4 md:pt-[49px] h-full flex-1">
    </main>
  </div>`;
}
