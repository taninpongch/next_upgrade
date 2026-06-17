<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <BizFinancialShareBankList heading="เลือกบัญชีที่ผูกไว้" :data="bankList" @on-tapped="onSubmit" />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postOptionSelect } = store;

getData('get-ba-kym-advance-tiedaccount-bank-select').then(async () => {
  bankList.value = data.value.map((it: any) => {
    return {
      id: it.bankId,
      src: manaLib.getUrl(it.bankLogoHost, it.bankLogoPath),
      title: it.bankName,
      description: it.bankEngName,
    };
  });
});

const bankList = ref([]);
async function onSubmit(item: any) {
  await postOptionSelect({ bankId: item.id, bankName: item.title });
}

</script>
