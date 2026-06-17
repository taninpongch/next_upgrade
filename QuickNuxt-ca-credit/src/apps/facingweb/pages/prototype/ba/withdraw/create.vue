<template>
  <MuiPage>
    <MuiHeader title="ถอนเงินออกจากร้าน" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <!-- TODO: lesson learn component-->
        <div>
          <BizShareItemInfo :transparent="true" heading="ร้านที่ถอน"
          src="https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png" title="Food Prada"/>
          <!-- <BizShareSessionTitle label="ร้านที่เติมเข้า" /> -->
          <!-- <BizShareItemStatus :transparent="true" title="Food Prada"
          src="https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png"/> -->
          <UDivider class="mb-4" />
          <BizShareItemInfo :transparent="true" heading="ถอนไปยัง"
          src="i-ion-wallet-outline" title="กระเป๋าของฉัน"/>
        </div>
      </MuiCard>

      <MuiCard>
        <BizShareItemWalletChange src="i-ion-wallet-outline" heading="ถอนไปยัง" title="กระเป๋าของฉัน"
          :button="{ icon: 'i-material-symbols-light-repeat', label: '' }" rightText="5,000.00 THB"
          @on-tapped="onClickSelectWallet" />
      </MuiCard>

      <MuiCard>
        <BizShareInputCurrency label="จำนวนเงิน" placeholder="ระบุยอดเงิน" v-model="dataForm.amount" name="amount" />
      </MuiCard>
      <MuiCard>
        <BizShareInputNote label="หมายเหตุ" placeholder="กรุณาระบุ" hint="Optional" v-model="dataForm.note" name="note" />
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
  note: "",
});

const onClickSelectWallet = () => {
  // TODO: implement select wallet
  // await navigateTo("");}
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // TODO: implement submit
  await goVisit("kym", "proto-ba-withdraw-confirm", "ba-withdraw");
  // await navigateTo("confirm");
}
</script>
<style></style>
