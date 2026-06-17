<template>
  <MuiPage>
    <BizShareResultDialog :data="data" />
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const data = ref<any>({
  Title: "Exchange time out",
  // Logo: "i-heroicons-information-circle",
  Message: "Rate expired, Please complete the transaction within the specified time",
});
</script>