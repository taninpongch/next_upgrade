<template>
  <MuiPage>
    <MuiHeader title="เวลาทำการ" />
    <BizShareSessionTitle label="เลือกเวลา" />
    <MuiCard>
      <BizShareText icon="i-material-symbols-light-check-circle-outline" text="เวลาเปิด" />
      <BizShareText icon="i-material-symbols-light-check-circle-outline" text="เวลาปิด" />
    </MuiCard>

    <BizShareSessionTitle label="เลือกวัน" />
    <MuiCard>
      <BizShareInputCheckbox text-checkbox="วันจันทร์" v-model="bind_checkbox" />
      <UDivider />
      <BizShareInputCheckbox text-checkbox="วันอังคาร" v-model="bind_checkbox" />
      <UDivider />
      <BizShareInputCheckbox text-checkbox="วันพุธ" v-model="bind_checkbox" />
      <UDivider />
      <BizShareInputCheckbox text-checkbox="วันพฤหัสบดี" v-model="bind_checkbox" />
      <UDivider />
      <BizShareInputCheckbox text-checkbox="วันศุกร์" v-model="bind_checkbox" />
      <UDivider />
      <BizShareInputCheckbox text-checkbox="วันเสาร์" v-model="bind_checkbox" />
      <UDivider />
      <BizShareInputCheckbox text-checkbox="วันอาทิตย์" v-model="bind_checkbox" />
      <UDivider />
    </MuiCard>
    <BizShareActionNormal label="ลบการตั้งค่านี้" color="white" />
    <ActionButton />

  </MuiPage>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const bind_checkbox = ref(false);
</script>
