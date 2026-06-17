<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ยืนยันบัญชีนี้" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <BizFinancialDetailWalletTransferBankPPay
          srcDest="i-ion-wallet-outline"
          titleDest="My Walletถอน"
          :detailOrigin="data?.topupDetail"
          :amount="{ src: data?.logoSrc, title: data?.amount, subtitle: '' }"
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

getData("get-topup-ppay-confirm").then(async () => {
  data.value = {
    session: dataTopup?.value?.session,
    wallet: dataTopup?.value?.wallet,
    amount: manaLib.toText(dataTopup?.value?.session?.amount),
    logoSrc: manaLib.getUrl(
      dataTopup?.value?.session?.toLogoHost,
      dataTopup?.value?.session?.toLogoPath
    ),
    topupDetail: [
      {
        label: "เลขบัญชี",
        value: dataTopup?.value?.session?.toAccountNo,
      },
      {
        label: "ประเภท",
        value:
          dataTopup?.value?.session?.toType == "ExternalPPay" ? "พร้อมเพย์" : "บัญชีธนาคาร",
      },
      {
        label: "ชื่อบัญชี",
        value: `${dataTopup?.value?.session?.toName} (${dataTopup?.value?.session?.toSubName})`,
      },
    ],
  };
  dataForm.externalAccountId = dataTopup?.value?.session.toId;
  dataForm.amount = manaLib.toText(dataTopup?.value?.session?.amount, "amt");
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      externalAccountId: event.data.externalAccountId,
      currency: event.data.currency,
      amount: parseFloat(event.data.amount),
    };
    await postData(formdata, "post-topup-ppay-confirm");
  }
}
</script>
