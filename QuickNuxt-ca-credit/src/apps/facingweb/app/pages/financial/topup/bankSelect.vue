<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="เลือกธนาคารที่ต้องการ" />
      <BizShareListItem heading="เลือกบัญชีที่ผูกไว้" :data="bankList" />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const TopupStore = useTopupStore();
const { dataTopup, pending } = storeToRefs(TopupStore);
const { getData } = TopupStore;
getData("get-topup-bank-list").then(() => convertAll(dataTopup.value.items));

const bankList = ref();
const convertAll = async (list: any[]) => {
  bankList.value = list.map((it) => {
    return {
      id: it.bankId,
      src: manaLib.getUrl(it.bankLogoHost, it.bankLogoPath),
      title: it.bankName,
      description: it.bankEngName,
    };
  });
};
</script>
