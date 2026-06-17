<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>ยังไม่มี Ui</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const _data = useLogStore();
const { dataLog, pending } = storeToRefs(_data);
const { getData } = _data;
const data = ref<any>();

getData("get-payroll-detail").then(async () => {
  // data.value = {
  //   walletName: dataLog?.value?.walletTransactionInfos.walletName,
  //   balance: lib.toText(dataLog?.value.walletTransactionInfos.balance),
  //   log: dataLog?.value?.walletTransactionInfos.walletTransactionInfos.map((it: any) => ({
  //     date: lib.getDateText(it.transactionDateTime),
  //     amount: lib.toText(it?.balance),
  //     title: displayTitle(it?.txType),
  //     icon: displayIcon(it?.txType)
  //   }))
  // };
});

const displayTitle = (value: string) => {
  switch (value.toLowerCase()) {
    case "payroll":
      return "เงินเดือน";
    case "deposit":
      return "เงินเข้า";
    case "withdraw":
      return "เงินออก";
    default:
      return "เงิน";
  }
};
const displayIcon = (value: string) => {
  switch (value.toLowerCase()) {
    case "payroll":
      return "i-material-symbols-light-arrow-circle-right-outline";
    case "deposit":
      return "i-material-symbols-light-arrow-circle-right-outline";
    case "withdraw":
      return "i-material-symbols-light-arrow-circle-left-outline";
    default:
      return "i-material-symbols-light-change-circle-outline-rounded";
  }
};
</script>
