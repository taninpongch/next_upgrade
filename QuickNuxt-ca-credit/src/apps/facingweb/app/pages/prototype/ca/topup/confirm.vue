<template>
  <MuiPage>
    <MuiHeader title="ยืนยันบัญชี" />

    <MuiCard>
      <BizShareItemInfo
        heading="ธุรกิจที่เติมเข้า"
        src="https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png"
        title="Food Prada"
      />
    </MuiCard>

    <MuiCard>
      <BizShareSessionTitle label="จำนวนที่ต้องการเติม" />
      <BizSharePartyHero
        src="i-material-symbols-light-move-to-inbox-rounded"
        title="500.00 THB"
      />
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

async function onSubmit() {
    // TODO: implemnt confirm
    await goVisit("kym", "proto-ca-topup-completed", "ca-topup");
  // await navigateTo("completed");
}
</script>

<style></style>
