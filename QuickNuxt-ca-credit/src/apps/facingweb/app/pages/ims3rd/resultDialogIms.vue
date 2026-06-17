<template>
  <MuiPage>
    <BizShareResultDialog :data="data" />
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const data = ref<any>({
  Title: "สร้างเมนูลัดแล้ว",
  Logo: "i-lucide-pin",
  Message: "ระบบได้สร้างเมนูลัดให้คุณที่หน้าแรกเพื่อความสะดวกในการใช้งาน",
});
</script>