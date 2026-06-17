<template>
  <div v-if="false">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage class="bg-white">
      <MuiHeader title="รายละเอียดการจัดสรรเงิน" />
      <MuiCard class="text-center bg-gray-100">
        <BizSharePartyHero src="i-lucide-chart-pie" title="ลดวงเงิน" />
        <BizShareText :text="displayAmount(data.amount)" class="text-3xl" color="red" />
      </MuiCard>
      <BizShareItem title="ผู้ดำเนินการ" :description="data.operatorName" src="i-lucide-user-round-check"
        :transparent="true" />
      <BizShareItem title="วันที่และเวลา" :description="date" src="i-lucide-calendar-fold" :transparent="true" />
      <BizShareItem title="หมายเลขอ้างอิง" :description="data.refId" src="i-lucide-receipt-text" :transparent="true" />
      <BizShareItem title="หมายเหตุ" :description="data.note" src="i-lucide-pencil" :transparent="true" />
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

// getData('get-ca-allowance-returnfunds').then(async () => {

// });

const toImage = computed(() => {
  //TODO: change img path
  let displayLogo = "https://failfast.blob.core.windows.net/mana2018/imgs/dfshop.png";
  return displayLogo;
})
// const data2 = ref<any>({
//   amount: {
//     amountUnit: 1000000012,
//     currency: "THB"
//   },
//   operatorName: "Sawitree Sukun",
//   date: manaLib.getDateText(new Date().toISOString()),
//   refId: "ALC-250531-0001",
//   note: "จัดสรรเพื่อ Payroll Pool",
// });

const date = computed(() => {
  return manaLib.getDateText(data?.value?.date);
});

const displayAmount = computed(() => {
  return (item: any) => {
    return manaLib && item ? `-${manaLib.toText(item)}` : "";
  };
});

const displayLog = computed(() => {
  return (item: any) => {
    const amountTxt = displayAmount.value(item);
    const isOutcome = amountTxt.includes('-');
    const icon = isOutcome
      ? "i-lucide-chart-pie"
      : "i-lucide-chart-pie";

    const color = isOutcome ? "red" : "blue";
    const amount = isOutcome ? amountTxt : `+${amountTxt}`;
    return { icon, color, amount };
  };
});

const displayTitle = (value: any) => {
  if (value.amount.amountUnit > 0) {
    return "เพิ่มวงเงิน";
  } else if (value.amount.amountUnit < 0) {
    return "ลดวงเงิน";
  } else {
    return "เงินอื่นๆ";
  }
};

</script>
