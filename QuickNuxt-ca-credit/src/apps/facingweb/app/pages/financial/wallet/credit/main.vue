<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>

      <BizShareItem v-if="data?.isSuspended" title="บัญชีถูกระงับการใช้วงเงิน"
        description="คุณไม่สามารถใช้วงเงินได้ชั่วคราว แต่ยังสามารถชำระบิลและจัดการบัญชีได้" icon="i-lucide-info"
        color="red" class="text-black" :ui="{ title: 'text-base font-semibold', icon: { base: 'w-10 h-10' } }" />
      <MuiCard class="text-center bg-blue-50 dark:bg-blue-50">
        <UFormGroup :label="data?.walletName" :ui="{ label: { base: '' } }">
          <template #label="{ label }">
            <BizShareImage src="i-lucide-credit-card" class="align-middle"
              :ui="{ background: 'bg-transparent dark:bg-transparent', rounded: '', icon: { base: 'text-blue-700 dark:text-blue-500' } }" />
            <span class="align-middle">{{ label }}</span>
          </template>
          <!-- <template #hint>
          <BizShareImage src="i-heroicons-star-16-solid"
            :ui="{ background: 'bg-transparent dark:bg-transparent', rounded: '', icon: { base: 'text-white dark:text-white' } }" />
        </template> -->
        </UFormGroup>
        <BizShareText text="วงเงินคงเหลือ" alignment="center" />
        <BizShareText :text="availableCredit" color="blue" alignment="center" :is-bold="true" class="text-2xl" />

        <!-- <BizShareItem title="วงเงินคงเหลือ" :description="data?.balance" class="text-center" :transparent="true"
        :ui="{ description: 'pt-4 text-xl font-semibold' }" /> -->
        <UFormGroup label="วงเงินทั้งหมด" :ui="{ label: { base: 'text-gray-400' } }">
          <template #hint>
            <BizShareText :text="creditLimit" class="text-gray-400" />
          </template>
        </UFormGroup>
        <UFormGroup label="ใช้ไปแล้ว" :ui="{ label: { base: 'text-gray-400' } }">
          <template #hint>
            <BizShareText :text="totalPayCredit" class="text-gray-400" />
          </template>
        </UFormGroup>
        <UFormGroup label="วันตัดรอบบัญชี" :ui="{ label: { base: 'text-gray-400' } }">
          <template #hint>
            <BizShareText :text="DueDate" class="text-gray-400" />
          </template>
        </UFormGroup>
      </MuiCard>

      <BizFinancialShareMainMenu :menus="menus" @on-tapped="onSelectMenu" />

      <!-- <BizFinancialShareMainWallet :name="data?.walletName" :amount="data?.balance" /> -->
      <BizShareSessionTitle label="ประวัติธุรกรรม" :button="{ icon: 'i-lucide-calendar-fold', label: 'ดูเพิ่ม' }"
        @on-tapped="gotolistlogs" />
      <BizShareItemStatus v-if="logs?.length > 0" v-for="item in logs.slice(0, 5)" :title="displayTitle(item.balance)"
        :description="item.date" :src="item.icon" :rightText="displayAmount(item.amount)"
        :rightColor="displayColor(item.amount)" @on-tapped="goto(item)" />
      <BizShareEmptyList v-else />

    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { getManaContext } from "@manaapp/ui";
import { useWindowFocus } from "@vueuse/core";

const manaLib = await getManaContext();
const store = useFinancialStore()
const { data, pending } = storeToRefs(store)
const { getData } = store
const { goVisit } = useManaService();
const logs = ref<any>();
const focused = useWindowFocus();

watch(focused, (isFocused) => {
  if (isFocused) {
    getData("get-wallet-credit-main").then(async () => {
      logs.value = data.value?.logs?.map((it: any) => ({
        date: manaLib.getDateText(it.createdDate),
        balance: it?.amount,
        amount: manaLib.toText(it?.amount),
        title: displayTitle(it),
        icon: it.amount.amountUnit > 0 ? 'i-material-symbols-light-arrow-circle-right-outline' : 'i-material-symbols-light-arrow-circle-left-outline',
        id: it?.id,
        endpoint: it?.refId,
      }));
    });

  }
}, { immediate: true });

const availableCredit = computed(() => {
  return manaLib.toText(data.value?.availableCredit);
})
const creditLimit = computed(() => {
  return manaLib.toText(data.value?.creditLimit);
})
const totalPayCredit = computed(() => {
  return manaLib.toText(data.value?.totalPayCredit);
})
const DueDate = computed(() => {
  return data.value?.dueDate;
})

const displayTitle = (value: any) => {
  if (value.amountUnit > 0) {
    return "เงินเข้า";
  } else if (value.amountUnit < 0) {
    return "เงินออก";
  } else {
    return "เงินอื่นๆ";
  }
};

const displayColor = (data: any) => {
  if (data.includes('-')) {
    return "red";
  }
  return "blue";
}

const displayAmount = (data: any) => {
  if (data.includes('-')) {
    return data;
  }
  return data.replace("", "+");
}

const menus = computed(() => {
  return [{ id: "PayBill", title: data.value?.flow?.payBill?.title, src: "i-lucide-receipt-text" },
  { id: "UpdateCreditLimit", title: data.value?.flow?.updateCreditLimit?.title, src: "i-lucide-hand-coins" },
  { id: "CashAdvance", title: data.value?.flow?.cashAdvance?.title, src: "i-lucide-archive" },
  { id: "DueDate", title: data.value?.flow?.dueDate?.title, src: "i-lucide-calendar-check-2" },
  { id: "Policy", title: data.value?.flow?.policy?.title, src: "i-lucide-file-text" }]
  // { id: "CancelaCredit", title: data.value?.flow?.cancelaCredit?.title, src: "i-lucide-captions-off" },
})

const onSelectMenu = (item: any) => {
  switch (item.id) {
    case "PayBill":
      goVisit(data.value?.flow?.payBill?.subscription, data.value?.flow?.payBill?.flow, data.value?.flow?.payBill?.endpointId);
      break;
    case "UpdateCreditLimit":
      // todo:temp for show dlg comingsoon flow nexum
      manaLib.visit("sub-financial", 'default/temp-menu-comingsoon?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg');
      // goVisit(data.value?.flow?.updateCreditLimit?.subscription, data.value?.flow?.updateCreditLimit?.flow, data.value?.flow?.updateCreditLimit?.endpointId);
      break;
    case "CashAdvance":
      goVisit(data.value?.flow?.cashAdvance?.subscription, data.value?.flow?.cashAdvance?.flow, data.value?.flow?.cashAdvance?.endpointId);
      break;
    case "DueDate":
      // todo:temp for show dlg comingsoon flow nexum
      manaLib.visit("sub-financial", 'default/temp-menu-comingsoon?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg');

      // goVisit("sub-financial", "wallet-credit-policy", "end-creditPAPolicy");
      // manaLib.visit("sub-financial", 'default/temp-menu-comingsoon?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg');
      // goVisit(data.value?.flow?.dueDate?.subscription, data.value?.flow?.dueDate?.flow, data.value?.flow?.dueDate?.endpointId);
      break;
    // case "CancelaCredit":
    //   // todo:temp for show dlg comingsoon flow nexum
    //   manaLib.visit("sub-financial", 'default/temp-menu-comingsoon?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg');
    // goVisit(data.value?.flow?.cancelaCredit?.subscription, data.value?.flow?.cancelaCredit?.flow, data.value?.flow?.cancelaCredit?.endpointId);
    // break;
    case "Policy":
      goVisit(data.value?.flow?.policy?.subscription, data.value?.flow?.policy?.flow, data.value?.flow?.policy?.endpointId);
      break;
    default:
      break;
  }
}

const goto = async (item: any) => {
  const endpoint = item.id.substring("WalletCreditLog:".length);
  // const endpoint = item.refId + ":" + item.accountNumber
  await goVisit("bill", "bill-transactionDetails", endpoint);
};

const gotolistlogs = async () => {
  await goVisit("sub-financial", "transaction-list", data.value?.flow?.cashAdvance?.endpointId.substring("cashAdvance:".length));
};
</script>