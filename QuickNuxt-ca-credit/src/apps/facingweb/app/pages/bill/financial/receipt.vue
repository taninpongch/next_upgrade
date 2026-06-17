<template>
  <MuiPage>
    <div v-if="pending">
      <BizShareSkeletonList />
    </div>
    <div v-else>
      <MuiHeader title="ใบเสร็จรับเงิน" />
      <BizNewBillReceipt :data="databill"></BizNewBillReceipt>
    </div>
  </MuiPage>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getManaContext } from "@manaapp/ui";

await getManaContext();
const _data = useBillStore();
const { databill, pending } = storeToRefs(_data);
const { getDataNewBill } = _data;
getDataNewBill("get-bill-financial-receipt").then(() => {
});
</script>
