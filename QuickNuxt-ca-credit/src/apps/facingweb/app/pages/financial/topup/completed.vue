<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="รายละเอียดการเติมเงิน" />
      <BizShareManaForm @submit="onSubmit">
        <BizFinancialTopupDetailComplete :data="dataTopup" />
        <ActionButton text="ปิด" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";
import { storeToRefs } from "pinia";

const manaLib = await getManaContext();
const _data = useTopupStore();
const { dataTopup, pending } = storeToRefs(_data);
const { getData, postData } = _data;
getData("get-topup-completed");

async function onSubmit() {
  await postData({}, "post-topup-complete");
}
</script>
