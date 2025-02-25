import { AccountsHeader } from "./accounts-header";

export default function AccountSection() {
  return `
    <section class="w-full mx-auto text-center">
        <div class="container">
            <div class="flex flex-col bg-bgSecondary py-4 md:py-5 xl:py-6 px-4 md:px-[26px] xl:px-8 rounded-xl">            

                <div class="mb-4 md:mb-[30px]">${AccountsHeader()}</div>

                <div id="account-content"></div>

            </>
        </div>
    </section>`;
}
