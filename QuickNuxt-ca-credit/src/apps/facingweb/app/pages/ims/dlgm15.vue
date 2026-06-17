<template>
  <MuiPage>
    <BizShareResultDialog :data="data" />
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const data = ref<any>({
  Title: "Insufficient Funds",
  // Logo: "i-heroicons-information-circle",
  Message: "Check your wallet balance before proceeding",
});
</script>