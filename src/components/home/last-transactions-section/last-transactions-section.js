import { LastTransactions } from "./last-transactions";

export default function TransactionsSection() {
  return `
    <section class="w-full mx-auto text-center">
        <div class="custom-container">
            <div class="flex flex-col bg-bg-secondary py-4 md:py-5 xl:py-6 px-4 md:px-[26px] xl:px-8 rounded-xl">
                ${LastTransactions()}
            </div>
        </div>
    </section>`;
}
