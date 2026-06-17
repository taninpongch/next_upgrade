<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <BizFinancialShareBankList heading="เลือกกระเป๋า" :data="wallets" @on-tapped="onSelect" />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useCartStore();
const { data, pending } = storeToRefs(store);
const { getData, postOptionSelect } = store;
const wallets = ref<any>([]);

getData("get-cart-additional-nexum-fiat-selectWallet").then(async () => {
  data.value.map((item: any) => {
    wallets.value.push({
      id: item._id,
      src: "i-lucide-credit-card",
      title: item.walletName,
      description: manaLib.toText(item.balance)
    })
  })
});

const dataForm = reactive({
  walletId: "",
  walletName: "",
  walletBalance: "",
});

const onSelect = (item: any) => {
  dataForm.walletId = item.id;
  dataForm.walletName = item.title;
  dataForm.walletBalance = item.description;
  onSubmit(dataForm);
}

async function onSubmit(dataForm: any) {
  await postOptionSelect(dataForm);
}
</script>
