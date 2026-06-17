<template>
  <MuiPage>
    <MuiHeader title="ที่อยู่ปัจจุบัน" />

    <BizShareSessionTitle label="กรุณากรอกที่อยู่ให้ถูกต้อง"
      :button="{ icon: 'i-ion-copy-outline', label: 'คัดลอกข้อมูลจากบัตร' }" @on-tapped="copyAddress()" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <BizShareAddressInfo :models="dataForm" />
      <ActionButton text="ตกลง" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { getManaContext, ActionButton } from "@manaapp/ui";
import { z } from "zod";

const manaLib = await getManaContext();
const kyc = useKycStore();
const { dataLocal } = storeToRefs(kyc);
const { getOptionDialogSelection, postOptionSelect } = kyc;

getOptionDialogSelection().then(() => {
  dataForm.line1 = dataLocal?.value.currentaddress.line1 ? dataLocal?.value.currentaddress.line1 : '';
  dataForm.zipcode = dataLocal?.value.currentaddress.zipcode ? dataLocal?.value.currentaddress.zipcode : '';
  dataForm.district = dataLocal?.value.currentaddress.district ? dataLocal?.value.currentaddress.district : '';
  dataForm.amphoe = dataLocal?.value.currentaddress.amphoe  ? dataLocal?.value.currentaddress.amphoe : '';
  dataForm.province = dataLocal?.value.currentaddress.province ? dataLocal?.value.currentaddress.province : '';
  dataForm.remark = dataLocal?.value.currentaddress.remark  ? dataLocal?.value.currentaddress.remark : '';
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

const copyAddress = () => {
  dataForm.line1 = dataLocal?.value.address.line1;
  dataForm.zipcode = dataLocal?.value.address.zipcode;
  dataForm.district = dataLocal?.value.address.district;
  dataForm.amphoe = dataLocal?.value.address.amphoe;
  dataForm.province = dataLocal?.value.address.province;
  dataForm.remark = dataLocal?.value.address.remark;
};

type Schema = z.output<typeof validationRules>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await postOptionSelect(event.data);
}

</script>


