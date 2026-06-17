<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ประวัติธุรกรรม" />
      <BizShareItemStatus v-if="logs?.length > 0" v-for="item in logs" :title="displayTitle(item.balance)"
        :description="item.date" :src="item.icon" :right-text="displayLog(item.balance).amount"
        :right-color="displayLog(item.balance).color" @on-tapped="onSelectItem(item)" />
      <BizShareEmptyList v-else />
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useFinancialStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;
const { goVisit } = useManaService();
const logs = ref<any>();

getData('get-transaction-list').then(async () => {
  logs.value = data.value?.map((it: any) => ({
    date: manaLib.getDateText(it.createdDate),
    balance: it?.amount,
    amount: manaLib.toText(it?.amount),
    title: displayTitle(it),
    icon: it.amount.amountUnit > 0 ? 'i-material-symbols-light-arrow-circle-right-outline' : 'i-material-symbols-light-arrow-circle-left-outline',
    id: it?.id,
    endpoint: it?.refId,
  }));
});

const displayTitle = (value: any) => {
  if (value.amountUnit > 0) {
    return "เงินเข้า";
  } else if (value.amountUnit < 0) {
    return "เงินออก";
  } else {
    return "เงินอื่นๆ";
  }
};

const displayLog = computed(() => {
  return (item: any) => {
    const amountTxt = displayAmount.value(item);
    const isOutcome = amountTxt.includes('-');

    const icon = isOutcome
      ? "i-material-symbols-light-arrow-circle-left-outline"
      : "i-material-symbols-light-arrow-circle-right-outline";

    const color = isOutcome ? "red" : "blue";
    const amount = isOutcome ? amountTxt : `+${amountTxt}`;

    return { icon, color, amount };
  };
});

const displayAmount = computed(() => {
  return (item: any) => {
    return manaLib && item ? `${manaLib.toText(item, 'amt')} ${manaLib.toText(item, 'cur')}` : "";
  };
});

const onSelectItem = async (item: any) => {
  const endpoint = item.id.substring("WalletCreditLog:".length);
  // console.log("onSelectItem", item);
  await goVisit("bill", "bill-transactionDetails", endpoint);
}

</script>
