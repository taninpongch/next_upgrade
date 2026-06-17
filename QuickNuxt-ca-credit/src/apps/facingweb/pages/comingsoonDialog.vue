<template>
  <MuiPage>
    <BizShareResultDialog :data="data" />
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const data = ref<any>({
  Title: "Coming Soon",
  Logo: "i-material-symbols-light-construction",
  Message: "",
});
</script>