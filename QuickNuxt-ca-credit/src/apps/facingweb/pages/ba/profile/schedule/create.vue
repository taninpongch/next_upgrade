<template>
  <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
    <MuiPage>
      <MuiHeader title="เวลาทำการ" />
      <BizShareSessionTitle label="เลือกเวลา" />
      <MuiCard>
        <BizShareInputDate label="เวลาเปิด" placeholder="วันเดือนปีตามบัตร" v-model="dataForm.openDateTime" />
        <BizShareInputDate label="เวลาปิด" placeholder="วันเดือนปีตามบัตร" v-model="dataForm.closedDateTime" />
      </MuiCard>

      <BizShareSessionTitle label="เลือกวัน" />
      <MuiCard>
        <BizBAShareInputToggle textToggle="จันทร์" v-model="dataForm.monday" />
        <BizBAShareInputToggle textToggle="อังคาร" v-model="dataForm.tuesday" />
        <BizBAShareInputToggle textToggle="พุธ" v-model="dataForm.wednesday" />
        <BizBAShareInputToggle textToggle="พฤหัสบดี" v-model="dataForm.thursday" />
        <BizBAShareInputToggle textToggle="ศุกร์" v-model="dataForm.friday" />
        <BizBAShareInputToggle textToggle="เสาร์" v-model="dataForm.saturday" />
        <BizBAShareInputToggle textToggle="อาทิตย์" v-model="dataForm.sunday" />
      </MuiCard>
      <BizShareActionNormal color="white" label="ลบการตั้งค่านี้" />
    </MuiPage>
    <ActionButton text="ตกลง" />
  </BizShareManaForm>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useBAStore();
const { postOptionSelect } = store;

const validationRules = z.object({
  id: z.string(),
  isAvailable: z.boolean(),
  openDateTime: z.string(),
  closedDateTime: z.string(),
  monday: z.boolean(),
  tuesday: z.boolean(),
  wednesday: z.boolean(),
  thursday: z.boolean(),
  friday: z.boolean(),
  saturday: z.boolean(),
  sunday: z.boolean()
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  id: "",
  isAvailable: true,
  openDateTime: "2024-12-24T10:00:00",
  closedDateTime: "2024-12-24T18:00:00",
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    await postOptionSelect(event.data);
  }
}

</script>