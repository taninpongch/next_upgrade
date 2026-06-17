<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="เติมเงินผ่านบัญชีที่ผูกไว้" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <BizFinancialAmountWalletTransferBankPPay
          :models="dataForm"
          destinationSrc="i-ion-wallet-outline"
          :destinationTitle="data?.session?.fromAccountName"
          :originSrc="data?.logoSrc ? data?.logoSrc : 'i-ion-wallet-outline'"
          :originTitle="data?.session?.toAccountName"
          :originDescription="data?.session?.toAccountNo"
        />
        <BizShareItem
          src="'i-heroicons-device-phone-mobile'"
          title="เติมเงินด้วยระบบ บริการเรียกเก็บเงิน (Request to pay)"
          :transparent="true"
        />
        <ActionButton />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext, ActionButton } from "@manaapp/ui";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const manaLib = await getManaContext();
const _data = useTopupStore();
const { dataTopup, pending } = storeToRefs(_data);
const { getData, postData } = _data;
const data = ref<any>();

const validationRules = z.object({
  // externalAccountId: string(),
  currency: z.string(),
  amount: z.string().min(1, "Invalid request"),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  // externalAccountId: '',
  currency: "THB",
  amount: "",
});

getData("get-topup-ppay-create").then(async () => {
  data.value = {
    session: dataTopup?.value?.session,
    wallet: dataTopup?.value?.wallet,
    exAccount: dataTopup?.value?.exAccount,
    amount: manaLib.toText(dataTopup?.value?.session?.amount),
    logoSrc: manaLib.getUrl(
      dataTopup?.value?.session?.toLogoHost,
      dataTopup?.value?.session?.toLogoPath
    ),
  };
  // dataForm.externalAccountId = dataTopup?.value?.session.toId;
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      // externalAccountId: event.data.externalAccountId,
      currency: event.data.currency,
      amount: parseFloat(event.data.amount),
    };
    await postData(formdata, "post-topup-ppay-create");
  }
}
</script>
