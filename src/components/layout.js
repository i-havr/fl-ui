import { Header } from "./header/header";

export default function Layout() {
  return `<div class="container flex flex-col mx-auto text-center min-h-screen md:pt-[25px]">

  <div id='header-wrapper' class="mb-4 md:mb-[49px]">${Header()}</div>
    
    <main id="page-content" class="bg-green-500 h-full flex-1">
    </main>
  </div>`;
}
