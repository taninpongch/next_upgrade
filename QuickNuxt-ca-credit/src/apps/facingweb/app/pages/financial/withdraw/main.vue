<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage v-if="haveAccount">
      <MuiHeader title="ถอนเงิน" />
      <BizShareListItem heading="เลือกบัญชีที่ผูกไว้" :data="data" @on-select-item="callbackPath" />
    </MuiPage>

    <MuiPage v-else>
      <MuiHeader title="ถอนเงิน" />
      <BizShareSessionTitle label="เลือกบัญชีที่ผูกไว้" />
      <BizShareEmptyList />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";
import { useWindowFocus } from "@vueuse/core";
import { watch } from 'vue'

const manaLib = await getManaContext();
const focused = useWindowFocus();
const withdrawStore = useWithdrawStore();
const { dataWithdraw, pending } = storeToRefs(withdrawStore);
const { getData } = withdrawStore;
const { goVisit } = useManaService();
const haveAccount = ref();

watch(focused, (isFocused) => {
  if (isFocused) {
    getData("get-withdrawlist-data").then(() => {
      convertAll(dataWithdraw.value.listWallet);
      haveAccount.value = dataWithdraw.value.listWallet.length > 0;
    });
  }
}, { immediate: true });

const data = ref();
const convertAll = async (list: any[]) => {
  data.value = list.map((it: any) => {
    return {
      src: manaLib.getUrl(it.logoHost, it.logoPath),
      title: it.accountName,
      description: it.accountNo,
      id: it.id,
    };
  });
};

const callbackPath = (value: any) => {
  goVisit("withdraw", dataWithdraw?.value.flow?.withdrawcreate, value.id);
};
</script>
