<template>
  <MuiPage>
    <BizShareResultDialog :data="data.Result" />
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useDeliveryStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;

await getData("get-dlg-confirm-request-cart").then(async () => {
  data.value = {
    Result: {
      Title: data.value.title,
      Logo: data.value.logo,
      Message: data.value.message
    }
  }
});
</script>