<template>
  <MuiPage>
    <MuiHeader title="ยินยันบัญชี" />
    <BizShareManaForm @submit="onSubmit">
      <MuiCard>
        <!-- TODO: lesson learn component-->
        <div>
          <BizShareItemInfo :transparent="true" heading="ร้านที่ถอน"
            src="https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png" title="Food Prada" />
          <!-- <BizShareSessionTitle label="ร้านที่เติมเข้า" /> -->
          <!-- <BizShareItemStatus :transparent="true" title="Food Prada"
          src="https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png"/> -->
          <UDivider class="mb-4" />
          <BizShareItemInfo :transparent="true" heading="ถอนไปยัง" src="i-ion-wallet-outline" title="กระเป๋าของฉัน" />
        </div>
      </MuiCard>
      <MuiCard>
        <BizShareSessionTitle label="จำนวนที่ต้องการถอน" />
        <BizSharePartyHero src="i-heroicons-arrow-up-tray-solid" title="500.00 THB" subtitle="" />
      </MuiCard>
      <MuiCard>
        <BizShareItemInfo heading="หมายเหตุ" title="-" />
      </MuiCard>
      <ActionButton text="ยืนยัน" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script lang="ts" setup>
import { getManaContext, ActionButton } from "@manaapp/ui";
const lib = await getManaContext();
const { goVisit } = useManaService();
const kymStore = useKymStore();
const { getData, postData } = kymStore;

async function onSubmit() {
  // TODO:Implement submit
  await postData({}, "post-ba-withdraw-confirm");
  // await goVisit("kym", "proto-ba-withdraw-confirm-dlg", "ba-withdraw");
  // await navigateTo("resultDialog");
}
</script>

<style></style>
