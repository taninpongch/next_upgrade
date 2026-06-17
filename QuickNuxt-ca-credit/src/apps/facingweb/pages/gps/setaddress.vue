<template>
  <MuiPage>
    <MuiHeader title="สถานที่ตั้ง" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <BizShareAddressInfoGPS :models="dataForm" />
      <ActionButton text="ตกลง" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext, ActionButton } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { useWindowFocus } from "@vueuse/core";

const manaLib = await getManaContext();
const kyc = useKycStore();
const { dataLocal } = storeToRefs(kyc);
const { postData, getData, getOptionDialogSelection, postOptionSelect } = kyc;
const focused = useWindowFocus();
await manaLib.setGpsAddress(dataLocal.value);

getOptionDialogSelection().then(() => {
  dataForm.value.line1 = dataLocal?.value?.line1 ? dataLocal?.value?.line1 : dataForm.value.line1;
  dataForm.value.zipcode = dataLocal?.value?.postalCode ? dataLocal?.value?.postalCode : dataForm.value.zipcode;
  dataForm.value.district = dataLocal?.value?.district ? dataLocal?.value?.district : dataForm.value.district;
  dataForm.value.amphoe = dataLocal?.value?.city ? dataLocal?.value?.city : dataForm.value.amphoe;
  dataForm.value.province = dataLocal?.value?.province ? dataLocal?.value?.province : dataForm.value.province;
  dataForm.value.remark = dataLocal?.value?.remark ? dataLocal?.value?.remark : dataForm.value.remark;
  if (dataLocal?.value?.postalCode) {
    dataForm.value.fax = false;
  }
});

// TODO: ใช้ ref แทน reactive อย่าลืม .value ใน dataForm ด้วย
const dataForm = ref({
  line1: '',
  zipcode: '',
  district: '',
  amphoe: '',
  province: '',
  remark: '',
  fax: true,
  gpsAddress: {
    gpsLocation: {
      lat: 0,
      long: 0
    },
    accuracy: 0
  }

});

const validationRules = z.object({
  line1: z.string().min(1, "Invalid request"),
  zipcode: z.string().min(5, "Invalid request"),
  district: z.string().min(1, "Invalid request"),
  amphoe: z.string().min(1, "Invalid request"),
  province: z.string().min(1, "Invalid request"),
  remark: z.string(),
  fax: z.boolean()

});

type Schema = z.output<typeof validationRules>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await postOptionSelect(event.data);
}

await manaLib.updateGps((rsp: any) => {
  dataForm.value.line1 = rsp?.Data?.Line1 ? rsp?.Data?.Line1 : dataForm.value.line1;
  dataForm.value.zipcode = rsp?.Data?.PostalCode ? rsp?.Data?.PostalCode : dataForm.value.zipcode;
  dataForm.value.district = rsp?.Data?.District ? rsp?.Data?.District : '';
  dataForm.value.amphoe = rsp?.Data?.City ? rsp?.Data?.City : dataForm.value.amphoe;
  dataForm.value.province = rsp?.Data?.Province ? rsp?.Data?.Province : dataForm.value.province;
  dataForm.value.remark = rsp?.Data?.Remark ? rsp?.Data?.Remark : dataForm.value.remark;
  dataForm.value.gpsAddress = {
    gpsLocation: {
      lat: rsp?.Data?.GpsAddress?.GpsLocation.Lat,
      long: rsp?.Data?.GpsAddress?.GpsLocation.Long
    },
    accuracy: rsp?.Data?.GpsAddress?.Accuracy
  }
});

watch(focused, async (isFocused) => {
  if (isFocused) {
    await manaLib.updateGps((rsp: any) => {
      dataForm.value.line1 = rsp?.Data?.Line1 ? rsp?.Data?.Line1 : dataForm.value.line1;
      dataForm.value.zipcode = rsp?.Data?.PostalCode ? rsp?.Data?.PostalCode : dataForm.value.zipcode;
      dataForm.value.district = rsp?.Data?.District ? rsp?.Data?.District : '';
      dataForm.value.amphoe = rsp?.Data?.City ? rsp?.Data?.City : dataForm.value.amphoe;
      dataForm.value.province = rsp?.Data?.Province ? rsp?.Data?.Province : dataForm.value.province;
      dataForm.value.remark = rsp?.Data?.Remark ? rsp?.Data?.Remark : dataForm.value.remark;
      dataForm.value.gpsAddress = {
        gpsLocation: {
          lat: rsp?.Data?.GpsAddress?.GpsLocation.Lat,
          long: rsp?.Data?.GpsAddress?.GpsLocation.Long
        },
        accuracy: rsp?.Data?.GpsAddress?.Accuracy
      }
    }
    )
  };
});

</script>