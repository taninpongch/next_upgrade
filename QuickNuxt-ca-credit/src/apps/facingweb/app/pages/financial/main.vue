<template>
  <div v-if="pending">
    <BizShareSkeletonLogo />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="Financial" />
      <BizFinancialShareMainWallet :name="data.myWallet.walletName" :amount="balance" @on-tapped="gotoMainWallet" />
      <BizFinancialShareMainMenu :menus="menus" @on-tapped="goto" />
    </MuiPage>
  </div>
</template>
<script setup lang="ts">
const menus = [
  {
    id: "Transfer",
    title: "โอนเงิน",
    src: "i-material-symbols-light-currency-exchange-rounded",
  },
  {
    id: "TopUp",
    title: "เติมเงิน",
    src: "i-material-symbols-light-move-to-inbox-rounded",
  },
  { id: "Withdraw", title: "ถอนเงิน", src: "i-material-symbols-light-outbox-rounded" },
  { id: "WalletSelect", title: "กระเป๋า", src: "i-ion-wallet-outline" },
  {
    id: "AccountManage",
    title: "บัญชี",
    src: "i-material-symbols-light-universal-currency-outline-rounded",
  },
];

import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";
import { useWindowFocus } from "@vueuse/core";
import { watch } from 'vue'

const manaLib = await getManaContext();
const focused = useWindowFocus();
const store = useFinancialStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;
const { goVisit } = useManaService();

watch(focused, (isFocused) => {
  if (isFocused) {
    getData("get-financial-data").then(async () => {
      const balanceText = (balance: any) => {
        return manaLib.toText(balance);
      };
      balance.value = balanceText(data.value.myWallet.balance);
    });
  }
}, { immediate: true });

const balance = ref<string>("");
const endpointId = useRoute().query["endpointId"] as any;

const gotoMainWallet = async () => await goto({ id: "Wallet" });
const goto = async (item: any) => {
  switch (item.id) {
    case "Transfer":
      await visit(data.value.transfer, "endp-transfer");
      return;
    case "TopUp":
      await visit(data.value.topUp, "endp-topup");
      return;
    case "Withdraw":
      await visit(data.value.withdraw, "endp-withdraw");
      return;
    case "Wallet":
      await visit(data.value.wallet, "endp-wallet");
      return;
    case "AccountManage":
      await visit(data.value.accountManage, "endp-accountManage");
      return;
    case "WalletSelect":
      await visit(data.value.walletSelect, "endp-walletSelect");
      return;
  }
};

const visit = async (params: any, endpoint: string) => {
  await goVisit(params.subscriptionId, params.flow, endpoint);
};
</script>
