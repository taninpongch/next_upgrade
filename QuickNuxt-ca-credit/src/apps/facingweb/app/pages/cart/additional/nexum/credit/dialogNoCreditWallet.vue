<template>
  <MuiPage>
    <BizShareResultDialog :data="data" />
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const data = ref<any>({
  Title: "ไม่สามารถใช้งานได้",
  Logo: "i-material-symbols-light-construction",
  Message: "เนื่องจากไม่มี Credit Wallet",
});
</script>
