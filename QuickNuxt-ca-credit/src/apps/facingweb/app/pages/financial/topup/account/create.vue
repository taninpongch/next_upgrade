<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="เติมเงินผ่านบัญชีที่ผูกไว้" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <BizFinancialAmountWalletTransferBankPPay :models="dataForm" destination-src="i-ion-wallet-outline"
          :destination-title="dataTopup?.wallet?.walletName" :origin-src="data?.fromImage"
          :origin-title="dataTopup?.session?.fromAccountName" :origin-description="dataTopup?.session?.fromAccountNo" />
        <ActionButton text="ตกลง"></ActionButton>
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
const _data = useTopupStore();
const { dataTopup, pending } = storeToRefs(_data);
const { postData, getData } = _data;
const data = ref<any>();

getData("get-topup-account-create").then(async () => {
  data.value = {
    fromImage: manaLib.getUrl(
      dataTopup?.value?.session?.fromLogoHost,
      dataTopup?.value?.session?.fromLogoPath
    ),
  };
  dataForm.externalAccountId = dataTopup?.value?.session?.externalAccountId;
});

const validationRules = z.object({
  currency: z.string(),
  amount: z.string().min(1, "Invalid request"),
  remark: z.string(),
  externalAccountId: z.string(),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  currency: "THB",
  amount: "",
  remark: "",
  externalAccountId: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      currency: event.data.currency,
      amount: parseFloat(event.data.amount),
      remark: event.data.remark,
      externalAccountId: dataForm.externalAccountId,
    };
    await postData(formdata, "post-topup-account-create");
  }
}
</script>
