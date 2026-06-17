<template>
  <div v-if="false">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader :title="data.name ? data.name : '-'" />
      <BizFinancialShareAllocationWallet :name="data.name" :amount="displayAmount(data.amount)"
        :totalamount="displayAmount(data.amount)" :currentAmount="data.currentAmount" :maxAllowance="data.maxAllowance"
        @on-tapped="gotoDetail" />
      <BizShareSessionTitle label="ประวัติธุรกรรม" :button="{ icon: 'i-lucide-calendar-fold', label: 'ดูเพิ่ม' }"
        @on-tapped="gotolistlogs" />
      <BizShareItemStatus v-if="data.log && data.log.length > 0" v-for="item in data.log" :title="displayTitle(item)"
        :description="item.description" :src="displayLog(item.amount).icon" :right-text="displayLog(item.amount).amount"
        :right-color="displayLog(item.amount).color" @on-tapped="onSelectItem(item)" />
      <!-- item.isGround ? item.title + ` ${item.countlist} รายการ` : item.title -->
      <BizShareEmptyList v-else />
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;
const { goVisit } = useManaService();
const logs = ref<any[]>([]);

getData('get-ca-allowance-main').then(async () => {
  logs.value = data.value?.log?.map((it: any) => ({
    title: displayTitle(it),
    description: manaLib.getDateText(it.description),
    amount: it?.amount,
    endpointUrl: it?.endpointUrl,
  }));
});

// const data2 = ref<any>({
//   name: "ชื่อกระเป๋า",
//   amount: {
//     amountUnit: 123456.78,
//     currency: "THB"
//   },
//   log: [
//     {
//       title: "เงินออก",
//       description: manaLib.getDateText("2026-02-20T04:18:22.667Z"),
//       isGround: true,
//       countlist: 3,
//       amount: {
//         amountUnit: -123456.78,
//         currency: "THB"
//       }
//     },
//     {
//       title: "เงินเข้า",
//       description: manaLib.getDateText("2026-02-20T04:18:22.667Z"),
//       isGround: false,
//       countlist: 0,
//       amount: {
//         amountUnit: 100000,
//         currency: "THB"
//       }
//     }
//   ],
//   currentAmount: 40,
//   maxAllowance: 100
// });
const displayAmount = computed(() => {
  return (item: any) => {
    return manaLib && item ? `${manaLib.toText(item)}` : "";
  };
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

const displayTitle = (value: any) => {
  if (value.amount.amountUnit > 0) {
    return "เงินเข้า";
  } else if (value.amount.amountUnit < 0) {
    // if (value.isGround) {
    //   return `เงินออก ${value.countlist} รายการ`;
    // }
    return "เงินออก";
  } else {
    return "เงินอื่นๆ";
  }
};

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

const gotoDetail = async () => {
  console.log("gotoDetail");
  await goVisit("ba", "ca-allocation-detail", data.value.EndpointId);
};

const gotolistlogs = async () => {
  // await goVisit("sub-financial", "transaction-list", data.value?.flow?.cashAdvance?.endpointId.substring("cashAdvance:".length));
};

</script>
