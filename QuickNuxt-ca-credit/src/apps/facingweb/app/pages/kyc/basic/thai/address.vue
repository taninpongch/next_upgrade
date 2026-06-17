<template>
  <MuiPage>
    <MuiHeader title="ที่อยู่ตามบัตรประชาชน" />
    <BizShareSessionTitle label="กรุณากรอกที่อยู่ให้ถูกต้อง" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <BizShareAddressInfo :models="dataForm" />
      <ActionButton text="ตกลง" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext, ActionButton } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const kyc = useKycStore();
const { dataLocal } = storeToRefs(kyc);
const { postData, getData, getOptionDialogSelection, postOptionSelect } = kyc;

getOptionDialogSelection().then(() => {
  dataForm.line1 = dataLocal?.value.line1 ? dataLocal?.value.line1 : '';
  dataForm.zipcode = dataLocal?.value.zipcode ? dataLocal?.value.zipcode : '';
  dataForm.district = dataLocal?.value.district ? dataLocal?.value.district : '';
  dataForm.amphoe = dataLocal?.value.amphoe ? dataLocal?.value.amphoe : '';
  dataForm.province = dataLocal?.value.province ? dataLocal?.value.province : '';
  dataForm.remark = dataLocal?.value.remark ? dataLocal?.value.remark : '';
});

// TODO: ใช้ ref แทน reactive อย่าลืม .value ใน dataForm ด้วย
const dataForm = reactive({
  zipcode: '',
  line1: '',
  district: '',
  amphoe: '',
  province: '',
  remark: ''
});

const validationRules = z.object({
  zipcode: z.string().min(5, "Invalid request"),
  line1: z.string().min(1, "Invalid request"),
  district: z.string().min(1, "Invalid request"),
  amphoe: z.string().min(1, "Invalid request"),
  province: z.string().min(1, "Invalid request"),
  remark: z.string()
});

type Schema = z.output<typeof validationRules>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await postOptionSelect(event.data);
}

</script>