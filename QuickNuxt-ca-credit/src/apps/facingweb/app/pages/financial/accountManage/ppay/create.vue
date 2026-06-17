<template>
  <MuiPage>
    <MuiHeader title="สร้างบัญชีพร้อมเพย์" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <BizSharePartyHero
          src="i-material-symbols-light-phone-android-outline"
          title="พร้อมเพย์"
        />
        <BizShareInputText
          label="ชื่อเรียกบัญชี"
          placeholder="บัญชีพร้อมเพย์ของฉัน"
          v-model="dataForm.accountName"
          name="accountName"
        />
        <BizShareInputSelect
          label="รูปแบบ"
          :options="ppayTypes"
          v-model="dataForm.accountCode"
          name="accountCode"
        />
        <BizShareInputText
          label="เลขพร้อมเพย์"
          placeholder="เช่น 0911234567"
          inputMode="numeric"
          v-model="dataForm.accountNo"
          name="accountNo"
        />
      </MuiCard>
      <ActionButton text="ตกลง" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";

import { z } from "zod";

const manaLib = await getManaContext();
const bankAccount = useBankAccountStore();
const { postData } = bankAccount;

const ppayTypes = [
  {
    name: "กรุณาเลือก",
    value: "",
  },
  {
    name: "เลขบัตรประชาชน",
    value: "pid",
  },
  {
    name: "เบอร์โทรศัพท์",
    value: "mobile",
  },
];

const validationRules = z.object({
  accountName: z.string().min(1, "Invalid request"),
  accountType: z.string().min(1, "Invalid request"),
  accountCode: z.string().min(1, "Invalid request"),
  accountNo: z.string().min(1, "Invalid request"),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  accountName: "",
  accountType: "ExternalPPay",
  accountCode: "",
  accountNo: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    await postData(event.data, "post-create-ppay-account");
  }
}
</script>
