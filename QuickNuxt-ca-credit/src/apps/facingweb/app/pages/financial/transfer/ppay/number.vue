<template>
  <MuiPage>
    <MuiHeader title="ระบุบัญชี" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <BizShareInputText label="ระบุหมายเลขพร้อมเพย์" placeholder="หมายเลขโทรศัพท์หรือเลขบัตร ปชช."
          inputMode="numeric" v-model="dataForm.accountNo" name="accountNo" />
      </MuiCard>
      <ActionButton />
    </BizShareManaForm>
  </MuiPage>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';
import { z } from "zod";
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const transferStore = useTransferStore();
const { postData } = transferStore;

const validationRules = z.object({
  accountType: z.string(),
  accountCode: z.string(),
  accountNo: z.string().min(10, "Invalid request"),
});

type Schema = z.output<typeof validationRules>;
const dataForm = reactive({
  accountType: "ExternalPPay",
  accountCode: "",
  accountNo: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    await postData(event.data, 'post-transfer-ppay-number');
  }
}
</script>
