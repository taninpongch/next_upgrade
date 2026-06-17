<template>
  <MuiPage>
    <BizShareResultDialog :data="data.Result" />
  </MuiPage>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const _data = useTopupStore();
const { dataTopup } = storeToRefs(_data);
const { getData } = _data;
const data = ref<any>();
await getData("get-result-topup").then(async () => {
  data.value = {
    Result: {
      Title: dataTopup.value.title,
      Logo: dataTopup.value.logo,
      Message: dataTopup.value.message
    }
  }
});
</script>
