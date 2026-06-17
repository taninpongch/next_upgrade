<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ถอนผ่านบัญชีที่ผูกไว้" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <BizFinancialAmountWalletTransferWithdraw :models="dataForm" originSrc="i-ion-wallet-outline"
          :originTitle="data?.walletInfo?.walletName" :originAmount="data?.amount"
          :destinationTitle="data?.externalAccount?.nameTH" :destinationSubTitle="data?.externalAccount?.accountNo"
          :destinationSrc="data?.src" />
        <ActionButton />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { getManaContext, ActionButton } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const _data = useWithdrawStore();
const { dataWithdraw, pending } = storeToRefs(_data);
const { postData, getData } = _data;
const data = ref<any>();

getData("get-withdraw-create-data").then(async () => {
  data.value = {
    externalAccount: dataWithdraw?.value?.externalAccount,
    src: manaLib.getUrl(dataWithdraw?.value?.externalAccount?.logoHost, dataWithdraw?.value?.externalAccount?.logoPath),
    walletInfo: dataWithdraw?.value?.walletInfo,
    amount: manaLib.toText(dataWithdraw?.value?.walletInfo?.balance),
  };
  dataForm.externalAccountId = dataWithdraw?.value?.externalAccount.id;
});

const validationRules = z.object({
  externalAccountId: z.string(),
  currency: z.string().min(1, "Invalid request"),
  amount: z.string().min(1, "Invalid request"),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  externalAccountId: "",
  currency: "THB",
  amount: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      externalAccountId: event.data.externalAccountId,
      currency: event.data.currency,
      amount: parseFloat(event.data.amount),
    };
    await postData(formdata, "post-withdraw-create-data");
  }
}
</script>
