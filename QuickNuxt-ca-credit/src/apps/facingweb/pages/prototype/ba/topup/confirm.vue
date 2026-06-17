<template>
  <MuiPage>
    <MuiHeader title="ยืนยันการเติม" />
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
    </MuiCard>

    <MuiCard>
      <BizShareSessionTitle label="จำนวนที่ต้องการเติม" />
      <BizSharePartyHero src="i-material-symbols-light-move-to-inbox-rounded" title="500.00 THB" />
    </MuiCard>

    <!-- <MuiCard>
        <BizShareItemInfo heading="วัตถุประสงค์การเติมเงิน" title="ดำเนินธุรกิจ" />
      </MuiCard> -->

    <MuiCard>
      <BizShareItemInfo heading="หมายเหตุ" title="-" />
    </MuiCard>

    <BizShareManaForm @submit="onSubmit">
      <ActionButton text="ยืนยัน" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script lang="ts" setup>
import { ActionButton } from "@manaapp/ui";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const { goVisit } = useManaService();
const kymStore = useKymStore();
const { getData, postData } = kymStore;

async function onSubmit() {
  // TODO: implemnt confirm
  await postData({}, "post-ba-topup-confirm");
  // await navigateTo("resultDialog");
}
</script>

<style></style>
