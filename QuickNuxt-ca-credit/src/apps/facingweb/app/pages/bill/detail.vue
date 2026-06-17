<template>
  <MuiPage>
    <div v-if="pending">
      <BizShareSkeletonList />
    </div>
    <div v-else>
      <MuiHeader title="รายละเอียดธุรกรรม" />
      <MuiCard>
        <BizBillDetail :data="databill" />
      </MuiCard>
    </div>
  </MuiPage>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const _data = useBillStore();
const { databill, pending } = storeToRefs(_data);
const { getData } = _data;

getData("get-bill-data");
</script>