<template>
  <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
    <div v-if="pending">
      <BizShareSkeletonList />
    </div>
    <div v-else>
      <MuiPage>
        <BizBAMultiSelection heading="ประเภทสินค้าและบริการ" :data="dataForm.type" />
        <UButton @click="console.log(dataForm)" label="ดูรายละเอียด"></UButton>
      </MuiPage>
    </div>
    <ActionButton text="ตกลง" />
  </BizShareManaForm>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, dataLocal, pending } = storeToRefs(store);
const { getData, getOptionDialogSelection, postOptionSelect } = store;

// getData('get-ba-kym-basic-select-type-dlg').then(async () => {
//   console.log("data",data.value);
//   //TODO: use computed
//   dataForm.type = data.value.map((it: any) => {
//     return {
//       isCheck: false,
//       label: it.name,
//       value: it.value
//     };
//   });

//   getOptionDialogSelection().then(() => {
//     dataLocal.value?.forEach((newItem: any) => {
//       const item = dataForm.type.find(currentItem => currentItem.label === newItem);
//       if (item) {
//         item.isCheck = true;
//       }
//     })
//   });
// });

// type: z.array(z.object<any>({}))
const validationRules = z.object({
  type: z.array(
    z.object({
      isCheck: z.boolean(),
      label: z.string(),
      value: z.string(),
    })
  )
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  type: []
});

const xx = ref<any>([
  {
    "name": "สินค้าและบริการ",
    "value": "Products and services"
  },
  {
    "name": "โรงแรมและการท่องเที่ยว",
    "value": "Hotels and tourism"
  },
  {
    "name": "การขนส่ง",
    "value": "Transportation"
  },
  {
    "name": "ผลิตภัณฑ์เพื่อสุขภาพ",
    "value": "Health-related products"
  },
  {
    "name": "การท่องเที่ยว",
    "value": "Tourism"
  },
  {
    "name": "อสังหาริมทรัพย์",
    "value": "Real estate"
  },
  {
    "name": "ร้านค้าและบริการทั่วไป",
    "value": "General stores and services"
  },
  {
    "name": "ขายสินค้าที่มีราคาสูง",
    "value": "High-Value goods"
  },
  {
    "name": "ค้าอาวุธสงคราม",
    "value": "Weaponry and ammunition"
  },
  {
    "name": "ค้าสารต้องห้ามและยาเสพติด",
    "value": "Smuggling fees and illicit substances"
  }
]);

dataForm.type = xx.value.map((it: any) => {
  return {
    isCheck: false,
    label: it.name,
    value: it.value
  };
})


async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log("dataForm", dataForm);
  console.log("event", event.data);

  if (event.data) {

    let formdata = event.data.type.filter(it => it.isCheck).map(it => it.label);
    console.log("result", formdata);

    await postOptionSelect(formdata);
  }
}

</script>
