<template>
  <MuiPage>
    <div v-if="pending">
      <BizShareSkeletonList />
    </div>
    <div v-else>
      <MuiHeader title="รายละเอียดธุรกรรม" />
      <BizNewBillGroupTransactionDetails :data="databill" />
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
getDataNewBill("get-billgrouptransaction").then(() => {
  // databill.value.session.toName = "3 รายการ";
  // databill.value.session.toLogoHost = "icon";
  // databill.value.session.toLogoPath = "i-lucide-file-stack";
  // console.log(databill.value);

});


</script>