<template>
  <MuiPage>
    <BizShareResultDialog :data="data" />
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const data = ref<any>({
  Title: "กรุณารอ",
  Logo: "i-heroicons-information-circle",
  Message: "กำลังตรวจสอบข้อมูล",
});
</script>
