<template>
  <MuiPage>
    <div v-if="pending">
      <BizShareSkeletonList />
    </div>
    <div v-else>
      <MuiHeader title="ทำธุรกรรมสำเร็จ" />
      <BizNewBillResult :data="databill"></BizNewBillResult>
    </div>
  </MuiPage>
</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const _data = useBillStore();
const { databill, pending } = storeToRefs(_data);
const { getDataNewBill } = _data;
getDataNewBill("get-billresult").then(() => {
});

const navigate = () => {
  navigateTo('transactionDetails')
}
</script>
