<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="กดเงินสด" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizShareSessionTitle label="ผู้รับเงิน" />
          <BizSharePartyHero :src="fromsrc" :title="data.toName" :subtitle="data.toSubName" />
          <!-- <div :class="`text-center`">
        <p class="font-semibold">จำนวนเงิน</p>
        <p class="text-red-600 font-bold">{ toTalToPay }}</p>
      </div> -->
          <BizShareSessionTitle label="จำนวนเงิน" :ui="{ label: { base: 'text-xl font-bold' } }" />
          <BizShareSessionTitle :label="`กดได้สูงสุด ${toTalToPay} `" :ui="{ label: { base: 'text-gray-400' } }" />
          <BizShareInputCurrency label="" placeholder="ระบุยอดเงิน" v-model="dataForm.amount" name="amount" />

          <UButton color="blue" variant="outline"
            @click="dataForm.amount = (data?.toTalToPay?.amountUnit / 1000).toFixed(2)"
            class="rounded-full px-6 py-2 text-xl text-blue-500 border-blue-500 w-full place-content-center">
            <template #leading>
              <UIcon name="i-heroicons-check-circle" class="text-blue-500" />
            </template>
            กดเต็มวงเงิน
          </UButton>

          <!-- <BizShareSessionTitle label="*มีค่าธรรมเนียม 5%" :button="{ icon: '', label: 'ดูรายละเอียดเพิ่มเติม' }"
        :ui="{ label: { base: 'text-gray-400' } }" /> -->
          <UFormGroup :label="`${data?.textFee}`" :ui="{ label: { base: 'text-gray-400' }, hint: 'text-blue-600' }">
            <template #hint>
              <p @click="goVisitWithFlow('wallet-credit-policy')">ดูรายละเอียดเพิ่มเติม
              </p>
            </template>
          </UFormGroup>

          <!-- :ui="{ label: { base: 'text-gray-400' }, hint: { base: 'text-blue-400' } }"
        :button="{ icon: '', label: 'ดูรายละเอียดเพิ่มเติม'  }" /> -->
          <!-- <BizShareItemInfo heading="ชื่อผู้รับ" :src="fromsrc" :title="data?.toName" /> -->
          <!-- <BizShareSessionTitle label="กระเป๋าเงิน" />
          <BizShareItemLink src="i-lucide-wallet" :title="data?.walletName" :rightText="walletAmount" /> -->
          <div>
            <BizShareSessionTitle label="กระป๋าที่ใช้รับ"
              :button="{ icon: 'i-material-symbols-light-repeat', label: 'เปลี่ยน' }" @on-tapped="onSelectWallet" />
            <BizShareItem src="i-lucide-wallet" :title="walletSelect.name" :transparent="true"
              :close-button="{ label: walletSelect.balance, color: 'gray', variant: 'ghost', padded: false }"
              :ui="{ icon: { base: 'w-8 h-8' } }" />
          </div>
          <BizShareLine />
          <BizFinancialShareAddCoupon heading="คูปอง" :button="{ icon: 'i-ion-plus-circled', label: '' }" :data="[]" />
          <BizShareLine />
          <BizShareInputNote label="หมายเหตุ" hint="optional" v-model="dataForm.remark" />
        </MuiCard>
        <ActionButton text="ตกลง" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext, ActionButton } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useFinancialStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const { goVisitWithFlow } = useManaService();

getData("get-cashadvance-create").then(async () => {
  dataForm.creditWalletId = data.value?.endpointId ? data.value?.endpointId : "xxx";
  dataForm.selectedFiatWalletId = data.value?.wallet.id;
});

const fromsrc = computed(() => {
  const img = data.value?.tologoHost == "icon"
    || data.value?.tologoHost == ""
    ? "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png" : manaLib.getUrl(data.value?.tologoHost, data.value?.tologoPath);
  return img;
});

const toTalToPay = computed(() => {
  return manaLib.toText(data.value?.toTalToPay);
});

const walletSelect = computed(() => {
  return {
    name: data?.value?.walletName,
    balance: manaLib.toText(data?.value?.walletAmount),
  };
});

const onSelectWallet = async () => {
  let optionDlgResult = await manaLib.showOptionDlg("wallet-select-dlg", "1btn", JSON.stringify(data.value.wallets), "close", "", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
    walletSelect.value.name = optionDlgResult?.selection.walletName;
    walletSelect.value.balance = manaLib.toText(optionDlgResult?.selection.balance);
  }
}

const validationRules = z.object({
  creditWalletId: z.string().min(1, "Invalid request"),
  selectedFiatWalletId: z.string().min(1, "Invalid request"),
  amount: z.string().min(1, "Invalid request"),
  remark: z.string(),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  creditWalletId: "",
  selectedFiatWalletId: "",
  amount: "",
  remark: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      creditWalletId: event.data.creditWalletId,
      selectedFiatWalletId: event.data.selectedFiatWalletId,
      amount: {
        amountUnit: parseFloat(event.data.amount) * 1000,
        Currency: data.value?.walletAmount?.currency || "THB",
      },
      remark: event.data.remark,
    };
    await postData(formdata, "post-cashadvance-create");
  }
}

</script>