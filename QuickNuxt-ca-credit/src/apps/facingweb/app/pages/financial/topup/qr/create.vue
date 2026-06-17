<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="สร้างคิวอาร์โค้ดเติมเงิน" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizShareItemInfo
            heading="กระเป๋าที่เติมเงินเข้า"
            src="i-ion-wallet-outline"
            :title="dataTopup?.wallet.walletName"
          />
        </MuiCard>
        <MuiCard>
          <BizShareInputCurrency
            label="จำนวนเงิน"
            placeholder="ระบุยอดเงิน"
            v-model="dataForm.amount"
            name="amount"
          />
        </MuiCard>
        <MuiCard>
          <BizShareInputNote v-model="dataForm.remark" label="หมายเหตุ" hint="optional" />
        </MuiCard>
        <ActionButton />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { storeToRefs } from "pinia";

const manaLib = await getManaContext();
const _data = useTopupStore();
const { dataTopup, pending } = storeToRefs(_data);
const { getData, postData } = _data;

getData("get-topup-qr-create");

const validationRules = z.object({
  currency: z.string(),
  amount: z.string().min(1, "Invalid request"),
  remark: z.string(),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  currency: "THB",
  amount: "",
  remark: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      currency: event.data.currency,
      amount: parseFloat(event.data.amount),
      remark: event.data.remark,
      externalAccountId: "",
    };
    await postData(formdata, `post-topup-qr-create`);
  }
}
</script>
