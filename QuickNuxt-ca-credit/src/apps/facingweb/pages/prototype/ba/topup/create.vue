<template>
  <MuiPage>
    <MuiHeader title="เติมเงินเข้าร้าน" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <!-- TODO: lesson learn component-->
        <div>
          <BizShareItemInfo :transparent="true" heading="กระเป๋าที่ใช้เติม" src="i-ion-wallet-outline"
            title="กระเป๋าของฉัน" />
          <!-- <BizShareSessionTitle label="ร้านที่เติมเข้า" /> -->
          <!-- <BizShareItemStatus :transparent="true" title="Food Prada"
            src="https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png"/> -->
          <UDivider class="mb-4" />
          <BizShareItemInfo :transparent="true" heading="ร้านที่เติมเข้า"
            src="https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png" title="Food Prada" />
        </div>

        <BizBAShareTransferInfo :from="transferInfo?.from" :to="transferInfo?.to" />

      </MuiCard>

      <MuiCard>
        <BizShareItemWalletChange src="i-ion-wallet-outline" heading="เติมจาก" title="กระเป๋าของฉัน"
          :button="{ icon: 'i-material-symbols-light-repeat', label: '' }" rightText="15,000.00 THB"
          @on-tapped="onClickSelectWallet" />
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

const manaLib = await getManaContext();



const amount = {
  amountUnit: 3000,
  currency: 'THB'
};
const fromWalletBalance = {
  amountUnit: 15000,
  currency: 'THB'
};
const displayLogo = ref("https://failfast.blob.core.windows.net/mana2018/imgs/dfshop.png");
const logoHost = "https://failfast.blob.core.windows.net";
const logoPath = "/mana2018/imgs/dfshop.png";
const fromLogoHost = "https://failfast.blob.core.windows.net";
const fromLogoPath = "/mana2018/imgs/dfshop.png";
if (logoHost && logoPath) {
  displayLogo.value
}
const transferInfo = ref({
  from: {
    heading: "ร้านที่ถอน",
    src: displayLogo.value,
    title: "fromName",
    description: fromWalletBalance ? `${manaLib.toText(fromWalletBalance, 'amt')} ${manaLib.toText(fromWalletBalance, 'cur')}` : "0.00 THB"
  },
  to: {
    heading: "ถอนไปยัง",
    src: "i-ion-wallet-outline",
    title: "toWalletDisplayName",
    description: "toWalletName"
  },
  withdrawAmount: amount ? `${manaLib.toText(amount, 'amt')} ${manaLib.toText(amount, 'cur')}` : "0.00 THB"
});

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

const onClickSelectWallet = () => {
  // TODO: implement select wallet
  // await navigateTo("");}
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // TODO: implements post 
  // await navigateTo("confirm");
  await goVisit("kym", "proto-ba-topup-confirm", "ba-topup");
}
</script>
<style></style>
