import AccountSection from "../components/home/account-section/account-section";
import BalanceSection from "../components/home/balance-section/balance-section";
import LastTransactionsSection from "../components/home/last-transactions-section/last-transactions-section";

export default function Home() {
  return `
    <div class="flex flex-col gap-y-4 md:gap-y-6 mx-auto text-center pb-[42px]">
${BalanceSection()}
${AccountSection()}
${LastTransactionsSection()}
    </div>
  `;
}
