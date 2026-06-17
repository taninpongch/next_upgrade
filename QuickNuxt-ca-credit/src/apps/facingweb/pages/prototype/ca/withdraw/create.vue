<template>
  <MuiPage>
    <MuiHeader title="ถอนผ่านบัญชีที่ผูกไว้" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <!-- TODO: lesson learn component-->
        <div>
          <BizShareSessionTitle label="ธุรกิจที่ถอน" />
          <BizShareItemStatus rightText="" :transparent="true" title="Food Prada"
            src="https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png" />
          <UDivider class="mb-4" />
          <BizShareItemInfo :transparent="true" heading="ถอนไปยังบัญชี"
            src="i-material-symbols-light-account-balance-wallet-outline-sharp" title="บัญชีธุรกิจของฉัน"
            description="****56789" />
        </div>
      </MuiCard>

      <MuiCard>
        <BizShareInputCurrency label="จำนวนเงิน" placeholder="ระบุยอดเงิน" v-model="dataForm.amount" name="amount" />
      </MuiCard>
      <MuiCard>
        <BizShareInputNote label="หมายเหตุ" placeholder="กรุณาระบุ" hint="Optional" v-model="dataForm.note"
          name="note" />
      </MuiCard>
      <ActionButton text="ตกลง"></ActionButton>
    </BizShareManaForm>
  </MuiPage>
</template>
<script lang="ts" setup>
import { getManaContext, ActionButton } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
const { goVisit } = useManaService();

const validationRules = z.object({
  externalAccountId: z.string(),
  currency: z.string().min(1, "Invalid request"),
  amount: z.string().min(1, "Invalid request"),
  note: z.string()
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  externalAccountId: "",
  currency: "THB",
  amount: "",
  note: ""
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // TODO: implement submit
  // await navigateTo("confirm");
  await goVisit("kym", "proto-ca-withdraw-confirm", "ca-withdraw");
}
</script>

<style></style>
