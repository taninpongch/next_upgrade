<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="จ่ายเงิน" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero :src="fromsrc" :title="data.toName" :subtitle="data.toSubName" />
          <!-- <BizShareItemText title="จำนวนเงิน" :subtitle="toTalToPay" class="text-red-600" /> -->
          <div :class="`text-center`">
            <p class="font-semibold">จำนวนเงิน</p>
            <p class="text-red-600 font-bold">{{ toTalToPay }}</p>
          </div>
          <BizShareLine />
          <!-- <BizShareItemInfo heading="ชื่อผู้รับ" :src="fromsrc" :title="data?.toName" /> -->
          <!-- <BizShareSessionTitle label="กระเป๋าเงิน" />
          <BizShareItemLink src="i-lucide-wallet" :title="data?.walletName" :rightText="walletAmount" /> -->
          <div>
            <BizShareSessionTitle label="กระเป๋าเงิน" :button="{ icon: 'i-material-symbols-light-repeat', label: '' }"
              @on-tapped="onSelectWallet" />
            <BizShareItem src="i-lucide-wallet" :title="walletSelect.name" :transparent="true"
              :close-button="{ label: walletSelect.balance, color: 'gray', variant: 'ghost', padded: false }"
              :ui="{ icon: { base: 'w-8 h-8' } }" @click="emits(emitName)" />
          </div>
          <BizShareLine />
          <BizFinancialShareAddCoupon heading="คูปอง" :button="{ icon: 'i-ion-plus-circled', label: '' }" :data="[]" />
          <BizShareLine />
          <!-- <BizShareItemInfo heading="เพิ่มเติม" :title="data?.remark ? data.remark : '-'" /> -->
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
const emitName = "onTapped";
const emits = defineEmits([emitName]);
const store = useImsStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;

getData("get-pay-create").then(async () => {
  dataForm.id = data.value?.endpointId;
  dataForm.selectedWalletId = data.value?.wallet.id;
  dataForm.amount = data.value?.toTalToPay?.amountUnit.toString();
});

const fromsrc = computed(() => {
  const img = data.value?.tologoHost == "icon"
    || data.value?.tologoHost == ""
    ? "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png" : manaLib.getUrl(data.value?.tologoHost, data.value?.tologoPath);
  return img;
});

const walletAmount = computed(() => {
  return manaLib.toText(data.value?.walletAmount);
});

const toTalToPay = computed(() => {
  return manaLib.toText(data.value?.toTalToPay);
});

const walletSelect = computed(() => {
  return {
    name: data?.value?.wallets[0]?.walletName,
    balance: manaLib.toText(data?.value?.wallets[0]?.balance),
  };
});

const onSelectWallet = async () => {
  let optionDlgResult = await manaLib.showOptionDlg("ims-select-wallet", "1btn", JSON.stringify(data.value.wallets), "close", "", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
    walletSelect.value.name = optionDlgResult?.selection.walletName;
    walletSelect.value.balance = manaLib.toText(optionDlgResult?.selection.balance);

    // dataForm.wallet = {
    //   id: optionDlgResult?.selection.id,
    //   walletName: optionDlgResult?.selection.walletName,
    //   displayName: data.value.toWalletDisplayName,
    //   balance: optionDlgResult?.selection.balance
    // };
    // updateTopic();
  }
}

const validationRules = z.object({
  id: z.string().min(1, "Invalid request"),
  selectedWalletId: z.string().min(1, "Invalid request"),
  amount: z.string().min(1, "Invalid request"),
  remark: z.string(),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  id: "",
  selectedWalletId: "",
  amount: "",
  remark: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log("event", event);
  if (event.data) {
    var formdata = {
      id: event.data.id,
      selectedWalletId: event.data.selectedWalletId,
      amount: parseFloat(event.data.amount) / 1000,
      remark: event.data.remark,

    };
    await postData(formdata, "post-pay-create");
  }
}

</script>