<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="บัญชีธุรกิจ" />
      <BizBALogMain :name="data.name" :amount="displayAmount(data.amount)" />
      <BizShareItemStatus v-if="data && data.log && data.log.length > 0" v-for="item in data.log" :title="item.title"
        :description="item.description" :src="displayLog(item.amount).icon" :right-text="displayLog(item.amount).amount"
        :right-color="displayLog(item.amount).color" @on-tapped="onSelectItem(item)" />
      <BizShareEmptyList v-else />
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;
const { goVisit } = useManaService();

getData('get-ba-txlog').then(async () => {
});

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
  if (item.visitbill == "old")
    await goVisit("bill", "bill", item.endpointUrl);
  else if (item.visitbill == "new")
    await goVisit("bill", "bill-transactionDetails", item.endpointUrl);
  else if (item.visitbill == "newDelivery")
    await goVisit("bill", "bill-delivery-transactionDetails", item.endpointUrl);
  else if (item.visitbill == "newFinancial")
    await goVisit("bill", "bill-financial-transactionDetails", item.endpointUrl);
  else if (item.visitbill == "groupbill")
    await goVisit("bill", "bill-grouptransactionDetails", item.endpointUrl);
  else
    await goVisit("bill", "bill-transactionDetails", item.endpointUrl)
};

</script>
