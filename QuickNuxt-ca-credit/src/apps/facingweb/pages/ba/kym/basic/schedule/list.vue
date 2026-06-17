<template>
  <MuiPage>
    <MuiHeader title="เวลาทำการ" />
    <MuiCard>
      <BizShareText text="กรุณา ตั้งเวลาเปิด-ปิดร้าน" :is-bold="true" />
      <BizShareText text="คุณยังไม่ได้ตั้งเวลาเปิด-ปิดร้าน" alignment="center" />
      <BizShareActionNormal icon="i-ph-camera-fill" label="ตั้งเวลาเปิด-ปิดร้าน" @on-tapped="onCreateBA" />
    </MuiCard>
    <BizShareSessionTitle label="เวลาเปิด-ปิดร้าน" />
    <MuiCard>
      <UFormGroup>
        <BizShareText icon="i-material-symbols-light-check-circle-outline" text="ข้อความมี Icon" />
        <UToggle v-model="selected" />
      </UFormGroup>
    </MuiCard>
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const selected = ref(false)
const { goVisit } = useManaService();
const onCreateBA = () => goVisit("ba", "ba-kym-basic-agreement", "endp-ba-kym-basic-create");

</script>
