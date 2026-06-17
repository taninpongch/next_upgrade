<template>
  <MuiPage>
    <MuiHeader title="สร้างคิวอาร์โค้ดเติมเงิน" />
    <MuiCard>
      <BizShareItemInfo heading="ธุรกิจที่เติมเข้า" src="https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png"
        title="Food Prada" />
    </MuiCard>
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <BizShareInputCurrency label="จำนวนเงิน" placeholder="กรุณาระบุยอดเงิน" currency="THB"
        v-model="dataForm.amount" name="amount"  />
      </MuiCard>

      <!-- <MuiCard>
          <BizShareInputSelect label="วัตถุประสงค์การเติมเงิน" placeholder="กรุณาเลือก"
          :options="[{ name: 'ดำเนินธุรกิจ', value: 'A' }, { name: 'จ่ายเงินเดือน', value: 'B' }]"
          v-model="bind_select" />
        </MuiCard> -->

      <MuiCard>
        <BizShareInputNote label="หมายเหตุ" placeholder="กรุณาระบุ" hint="Optional" v-model="dataForm.note" name="note"/>
      </MuiCard>

      <ActionButton text="ยืนยัน" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script lang="ts" setup>
import { ActionButton } from "@manaapp/ui";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const { goVisit } = useManaService();

const validationRules = z.object({
  externalAccountId: z.string(),
  currency: z.string().min(1, "Invalid request"),
  amount: z.string().min(1, "Invalid request"),
  note: z.string(),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  externalAccountId: "",
  currency: "THB",
  amount: "",
  note: ""
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // TODO: Implement submit
  // await navigateTo("confirm");
  await goVisit("kym", "proto-ca-topup-confirm", "ca-topup");
}
</script>

<style></style>
