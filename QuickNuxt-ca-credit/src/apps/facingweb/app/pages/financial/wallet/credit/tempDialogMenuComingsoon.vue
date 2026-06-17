<template>
  <MuiPage>
    <BizShareResultDialog :data="data" />
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const data = ref<any>({
  Title: "เมนูนี้จะเปิดให้บริการเร็วๆนี้",
  Logo: "i-lucide-timer-reset",
  Message: "กรุณาลองใหม่ภายหลัง",
});
</script>