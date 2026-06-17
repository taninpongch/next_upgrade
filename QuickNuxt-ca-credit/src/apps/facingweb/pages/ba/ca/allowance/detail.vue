<template>
  <div v-if="false">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="การจัดสรรวงเงิน" />
      <MuiCard class="text-center">
        <UFormGroup :ui="{ label: { base: '' } }">
          <template #label="{ label }">
            <BizShareImage src="i-material-symbols-light-arrow-circle-right-outline" class="align-middle"
              :ui="{ background: 'bg-transparent dark:bg-transparent', rounded: '', icon: { base: '' } }" />
            <span class="align-middle">เพิ่มวงเงินอัตโนมัติ</span>
          </template>
        </UFormGroup>
        <UProgress :value="data.currentAmount" :max="data.maxAllowance" color="black" />
        <div class="flex items-center justify-between ">
          <span class="text-sm">
            {{ startDate }}
          </span>
          <span class="text-red-500 text-base">
            เหลืออีก {{ data.remainingDate }} วัน
          </span>
          <span class="text-sm">
            {{ endDate }}
          </span>
        </div>
      </MuiCard>

      <BizShareSessionTitle label="การเติมวงเงิน" />
      <BizShareItemStatus v-if="data && data.log && data.log.length > 0" v-for="item in data.log"
        :title="displayTitle(item)" :description="item.description" :src="displayLog(item.amount).icon"
        :right-text="displayLog(item.amount).amount" :right-color="displayLog(item.amount).color" />
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

getData('get-ca-allowance-detail').then(async () => {
  logs.value = data.value?.log?.map((it: any) => ({
    title: displayTitle(it),
    description: manaLib.getDateText(it.description),
    amount: it?.amount,
    endpointUrl: it?.endpointUrl,
  }));
});


// const data2 = ref<any>({
//   startDate: manaLib.getDateText(new Date().toISOString()),
//   remainingDate: 7,
//   endDate: manaLib.getDateText(new Date(Date.now() + 200000).toISOString()),
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

const startDate = computed(() => {
  return manaLib.getDateText(data?.value?.startDate);
});

const endDate = computed(() => {
  return manaLib.getDateText(data?.value?.endDate);
});

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
