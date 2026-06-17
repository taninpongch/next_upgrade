<template>
  <MuiPage>
    <BizShareResultDialog :data="data" />
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const data = ref<any>({
  Title: "การกรอกรหัสไปรษณีย์",
  Logo: "i-material-symbols-light-map-outline-sharp",
  Message: "กรุณาระบุที่อยู่ของคุณจากตำแหน่ง GPS",
});
</script>