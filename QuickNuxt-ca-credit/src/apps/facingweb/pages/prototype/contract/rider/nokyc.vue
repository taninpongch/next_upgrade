<template>
  <MuiPage>
    <!-- TODO add title -->
    <MuiHeader title="ขออนุญาตทำสัญญา" />
    <MuiCard>
      <BizSharePartyHero :src="data?.baPicUrl" :title="data?.baName" :subtitle="data?.createdDate" />
    </MuiCard>
    <MuiCard>
      <BizShareItemInfo heading="รายละเอียดสัญญา" title="ขออนุญาตเชื่อมระบบกับบัญชี mana ของคุณ" />
      <BizShareItemInfo heading="ตำแหน่ง" title="Rider" />

      <!-- <BizShareListInfoHorizontal heading="รายละเอียดสัญญา" :infos="bankinfo" /> -->

      <!-- <BizShareSessionTitle label="สถานะการยืนยันตัวตน" />
      <BizShareText text="ยังไม่ทำ" color="red" alignment="center" />
      <p class="mt-2 text-red-500 dark:text-red-400 text-sm">Invalid request</p> -->

      <!-- <BizShareSessionTitle label="สถานะการยืนยันตัวตน" />
      <BizShareItemStatus title="การยืนยันข้อมูล" rightText="ยังไม่ทำ" :transparent="true" @on-tapped=""
        right-color="red" />
        <p class="mt-2 text-red-500 dark:text-red-400 text-sm">Invalid request</p> -->

      <!-- <BizShareItemInfo heading="สถานะการยืนยันตัวตน" title="ยังไม่ทำ" />
      <p class="mt-2 text-red-500 dark:text-red-400 text-sm">Invalid request</p> -->
    </MuiCard>
    <MuiCard>
      <!-- <BizShareSessionTitle label="สถานะการยืนยันตัวตน" />
      <BizShareText text="ยังไม่ทำ" color="red" alignment="center" />
      <p class="mt-2 text-red-500 dark:text-red-400 text-sm">Invalid request</p> -->

      <BizShareSessionTitle label="สถานะการยืนยันตัวตน" />
      <BizShareItemStatus title="การยืนยันข้อมูล" rightText="ยังไม่ทำ" :transparent="true" @on-tapped="" right-color="red">
      </BizShareItemStatus>
      <p class="mt-2 text-red-500 dark:text-red-400 text-sm">Invalid request</p>

      <!-- <BizShareSessionTitle label="สถานะการยืนยันตัวตน" />
      <BizShareItemStatus title="การยืนยันข้อมูล" rightText="ยังไม่ทำ" :transparent="true" @on-tapped=""
        right-color="red" />
        <p class="mt-2 text-red-500 dark:text-red-400 text-sm">Invalid request</p> -->

      <BizShareSessionTitle label="ตั้งชื่อ Displayname" />
      <BizShareItemLink description="คุณยังไม่ระบุ" @on-tapped="" />
      <!-- <p class="mt-2 text-red-500 dark:text-red-400 text-sm">Invalid request</p> -->

    </MuiCard>
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <!-- <ConsentButtonsBand accept-app-text="Accept" reject-app-text="Reject" accept-text="Accept" reject-text="Reject"
        :v-model="dataForm.acceptances"></ConsentButtonsBand> -->
    </BizShareManaForm>
  </MuiPage>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ConsentButtonsBand, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { useContractStore } from "~/composables/contractStore";


// const _data = useContractStore();
// const { dataContract, pending } = storeToRefs(_data);
// const { postSubmitConsentData, getData } = _data;
const data = ref<any>();
const lineInfo = ref<any>([]);
const selectedDelivery = ref<any>();

const bankinfo: any[] = [
  { label: "เรื่อง", value: "ขออนุญาตเชื่อมระบบกับบัญชี mana ของคุณ" },
  { label: "ตำแหน่ง", value: "Rider" },
];

data.value = {
  _id: "123",
  baName: "DemoDelivery",
  baPicUrl: "https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/dfdelivery.png",
  createdDate: "12/03/2024 17.00 น.",
  manaDisplayName: "manaDisplayName",
  manaPicUrl: "https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/dfdelivery.png",
  lineDisplayName: "lineDisplayName",
  deliveryList: [
    {
      _id: "123",
      name: "name",
      logoUrl: "https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/dfdelivery.png"
    }
  ]
  // baName: dataContract.value?.baName,
  // baPicUrl: lib.getUrl(dataContract.value?.baPicUrl?.host, dataContract.value?.baPicUrl?.path),
  // createdDate: lib.getDateText(dataContract.value?.createdDate),
  // manaDisplayName: dataContract.value?.manaDisplayName,
  // manaPicUrl: lib.getUrl(dataContract.value?.manaPicUrl?.host, dataContract.value?.manaPicUrl?.path),
  // lineDisplayName: dataContract.value?.displayName,
  // deliveryList: dataContract.value?.deliveryList
};
lineInfo.value = [{
  label: 'Display name',
  value: "lineDisplayName",
}];

// getData("get-consent-link-rider-line-ads", "delivery").then(async () => {
//   const lib = await getManaContext();
//   console.log("data", dataContract.value);
//   data.value = {
//     _id: dataContract.value?._id,
//     baName: dataContract.value?.baName,
//     baPicUrl: lib.getUrl(dataContract.value?.baPicUrl?.host, dataContract.value?.baPicUrl?.path),
//     createdDate: lib.getDateText(dataContract.value?.createdDate),
//     manaDisplayName: dataContract.value?.manaDisplayName,
//     manaPicUrl: lib.getUrl(dataContract.value?.manaPicUrl?.host, dataContract.value?.manaPicUrl?.path),
//     lineDisplayName: dataContract.value?.displayName,
//     deliveryList: dataContract.value?.deliveryList
//   };
//   lineInfo.value = [{
//     label: 'Display name',
//     value: data.value?.lineDisplayName,
//   }];
//   selectedDelivery.value = data.value?.deliveryList[0];
//   dataForm.acceptances = selectedDelivery.value?._id;  
// });

// const onSelectDeliveryList = async () => {
//   const lib = await getManaContext();
//   console.log("open dialog");
//   let optionDlgResult = await lib.showOptionDlg(
//     "delivery-link-user-select",
//     "1btn",
//     JSON.stringify({ deliveryList: data.value?.deliveryList }),
//     "close",
//     "",
//     "f"
//   );
//   if (optionDlgResult && !optionDlgResult.isCancel) {
//     selectedDelivery.value = optionDlgResult?.selection
//     dataForm.acceptances = selectedDelivery.value?._id;
//   }
// }

const validationRules = z.object({
  acceptances: z.string()
});

type Schema = z.output<typeof validationRules>;

const dataForm = ref({
  acceptances: ""
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // if (event.data) {
  //   var formdata = {
  //     Acceptances: [dataForm.acceptances]
  //   };
  //   await postSubmitConsentData(formdata, "post-consent-link-rider-line-ads", "delivery");
  // }
}

const selectedItemName = computed(() => {
  let name = selectedDelivery.value?.name;
  return name;
});

const selectedItemImage = computed(() => {
  let imgUrl = selectedDelivery.value?.logoUrl?.startsWith("https://") ? selectedDelivery.value?.logoUrl : `https://${selectedDelivery.value?.logoUrl}`;
  return imgUrl;
});

</script>
