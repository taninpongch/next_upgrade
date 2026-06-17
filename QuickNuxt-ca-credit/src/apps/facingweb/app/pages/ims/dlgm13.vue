<template>
  <MuiPage>
    <BizShareResultDialog :data="data" />
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const data = ref<any>({
  Title: "Swap unavailable",
  // Logo: "i-heroicons-information-circle",
  Message: "Low liquidity, pool refilling in progress. please tryanother pair or wait for pool refill",
});
</script>