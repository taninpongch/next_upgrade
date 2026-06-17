<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <BizFinancialShareBankList heading="เลือกกระเป๋า" :data="wallets" @on-tapped="onSubmit" />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBAStore();
const { dataLocal, pending } = storeToRefs(store);
const { getOptionDialogSelection, postOptionSelect } = store;

getOptionDialogSelection().then(async () => {
  console.log("dataLocal", dataLocal.value);

  //TODO: use computed
  wallets.value = dataLocal.value.map((it: any) => {
    return {
      id: it._id,
      src: "i-lucide-wallet",
      title: it.walletName,
      description: manaLib.toText(it.balance),
    };
  });
  pending.value = false;
});

const wallets = ref([]);
async function onSubmit(item: any) {
  let selectedItem = dataLocal.value.find((it: any) => it.id == item._id);
  await postOptionSelect(selectedItem);
}

</script>
