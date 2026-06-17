<template>
  <MuiPage>
    <BizShareResultDialog :data="data.Result" />
  </MuiPage>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useIms3rdStore();
const { data } = storeToRefs(store);
const { getData } = store;

await getData("get-result-receive-money").then(async () => {
  data.value = {
    Result: {
      Title: data.value.title,
      Logo: "i-lucide-hand-coins",
      Message: data.value.message
    }
  }
});
</script>
