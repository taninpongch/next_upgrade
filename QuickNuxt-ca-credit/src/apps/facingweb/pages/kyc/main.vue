<template>
  <MuiPage>
    <MuiHeader title="การยืนยันตัวตน" />
    <BizShareSessionTitle label="กรุณาเลือก" />
    <BizShareItem title="สำหรับคนไทย" src="https://avatars.githubusercontent.com/u/739984?v=4"
      @click="navigatethai()" />
      <BizShareItem title="สำหรับชาวต่างชาติ" src="https://avatars.githubusercontent.com/u/739984?v=4"
        @click="navigateforeign()" />
      <BizShareItem title="รอตรวจสอบสำหรับคนไทย" src="https://avatars.githubusercontent.com/u/739984?v=4"
      @click="navigatewaitthai()" />
      <BizShareItem title="รอตรวจสอบสำหรับชาวต่างชาติ" src="https://avatars.githubusercontent.com/u/739984?v=4"
      @click="navigatewaitforeign()" />
  </MuiPage>

</template>

<script lang="ts" setup>
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const navigatethai = () => {
  navigateTo('basic/agreement')
}
const navigateforeign = () => {
  navigateTo('basic/agreement')
}
const navigatewaitthai = () => {
  navigateTo('basic/thai/main')
}
const navigatewaitforeign = () => {
  navigateTo('basic/foreign/main')
}
</script>
