<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiHeader title="BillDetail" />
    <MuiCard>
      <BizBillDetail :data="dataLog" />
    </MuiCard>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const _data = useLogStore();
const { dataLog, pending } = storeToRefs(_data);
const { getData } = _data;
const data = ref<any>();

getData("get-deposit-detail").then(async () => {
  data.value = {
    walletName: dataLog?.value?.walletTransactionInfos.walletName,
    balance: manaLib.toText(dataLog?.value.walletTransactionInfos.balance),
    log: dataLog?.value?.walletTransactionInfos.walletTransactionInfos.map((it: any) => ({
      date: manaLib.getDateText(it.transactionDateTime),
      amount: manaLib.toText(it?.balance),
      title: displayTitle(it?.txType),
      icon: displayIcon(it?.txType)
    }))
  };
});

const displayTitle = (value: any) => {
  if (value.balance.amountUnit > 0) {
    return "เงินเข้า";
  } else if (value.balance.amountUnit < 0) {
    return "เงินออก";
  } else {
    return "เงินอื่นๆ";
  }
};
const displayIcon = (value: any) => {
  if (value.balance.amountUnit > 0) {
    return "i-material-symbols-light-arrow-circle-right-outline";
  } else if (value.balance.amountUnit < 0) {
    return "i-material-symbols-light-arrow-circle-left-outline";
  } else {
    return "i-material-symbols-light-change-circle-outline-rounded";
  }
  // switch (value.toLowerCase()) {
  //   case "payroll": return "i-material-symbols-light-arrow-circle-right-outline";
  //   case "deposit": return "i-material-symbols-light-arrow-circle-right-outline";
  //   case "withdraw": return "i-material-symbols-light-arrow-circle-left-outline";
  //   default: return "i-material-symbols-light-change-circle-outline-rounded";
  // }
}
</script>
