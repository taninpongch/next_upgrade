<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <BizFinancialShareTrackWallet :amount="totalAmount" />
      <BizShareSessionTitle label="เลือกกระเป๋าเงิน" :button="{ icon: '', label: '' }" />
      <BizShareItemStatus v-if="data?.wallets.length > 0" v-for="item in data?.wallets" :title="item.walletName"
        :description="item.currency" :src="item?.image" :rightText="item.balance" @on-tapped="goto(item)" />
      <BizShareEmptyList v-else />
      <!-- txid -->
    </MuiPage>
    <!-- <MuiPage v-else>
      <BizFinancialShareMainWallet :name="data?.walletName" :amount="data?.balance" />
      <BizShareSessionTitle label="เลือกกระเป๋าเงิน" :button="{ icon: '', label: '' }" />
    </MuiPage> -->
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const { goVisit } = useManaService();
const _data = useLogStore();
const { dataLog, pending } = storeToRefs(_data);
const { getData } = _data;
const data = ref<any>();
const totalAmount = ref<any>();
import { useWindowFocus } from "@vueuse/core";
import { watch } from 'vue'
const focused = useWindowFocus();

// watch(focused, (isFocused) => {
// if (isFocused) {
getData("get-wallet-list").then(async () => {
  data.value = {
    wallets: dataLog?.value?.wallet.map((it: any) => ({

      id: it.id,
      subscriberId: it.subscriptionId,
      flow: it.flow,
      walletName: it.walletName,
      balance: manaLib.toText(it.balance),
      amount: manaLib.toText(it.balance, "amt"),
      currency: manaLib.toText(it.balance, "cur"),
      image: it.logoHost == "icon" ? it?.logoPath : manaLib.getUrl(it.logoHost, it.logoPath),
    })),

  };

  const sumAmount = data.value.wallets.reduce((acc: any, wallet: any) => {
    return acc + parseFloat(wallet.amount.replace(/,/g, ""));
  }, 0);
  totalAmount.value = data.value.wallets.length < 0 ? "0.00 THB" : `${sumAmount.toFixed(2)} THB`;
});
const iconName = computed(() => data?.value.wallets?.[0]?.image ?? 'i-lucide-alert-triangle')


// }
// }, { immediate: true });


const goto = async (item: any) => {
  // await goVisit("wallets", "wallets-detail", "");
  await goVisit(item.subscriberId, item.flow, item.id);
};
</script>
