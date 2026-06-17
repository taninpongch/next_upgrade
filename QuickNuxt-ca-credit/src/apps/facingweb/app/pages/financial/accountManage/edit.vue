<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="แก้ไขชื่อเรียกบัญชี" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <BizShareSessionTitle label="ระบุชื่อใหม่" />
        <MuiCard>
          <BizShareInputText
            label="ชื่อเรียกบัญชี"
            placeholder="บัญชีธนาคารของฉัน"
            v-model="dataForm.accountName"
            name="accountName"
          />
        </MuiCard>
        <ActionButton text="ยืนยัน" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ActionButton, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const bankAccount = useBankAccountStore();
const { data, pending } = storeToRefs(bankAccount);
const { getData, postData } = bankAccount;
getData("get-account-edit").then(() => {
  dataForm.accountName = data.value.accountInfo.accountName;
});

const validationRules = z.object({
  accountName: z.string().min(1, "Invalid request"),
});
type Schema = z.output<typeof validationRules>;
const dataForm = reactive({
  accountName: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    await postData(event.data, "post-account-edit");
  }
}
</script>
