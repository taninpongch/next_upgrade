<template>
  <MuiPage>
    <!-- TODO add title -->
    <MuiHeader title="ขออนุญาตทำสัญญา" />
    <MuiCard>
      <BizSharePartyHero :src="data?.baPicUrl" :title="data?.baName" :subtitle="data?.createdDate" />
    </MuiCard>
    <MuiCard>
      <BizShareItemInfo heading="รายละเอียดสัญญา" title="ขออนุญาตทำสัญญาให้ร้านของคุณเป็นร้านในเครือ DemoDelivery" />
      <BizShareListInfoVertical heading="ส่วนแบ่ง Escrow" :infos="listInfo2" />
      <BizShareItemInfo heading="ข้อมูลการยืนยันตัวตน" title="คุณจำเป็นต้องให้ข้อมูล KYC เพื่อประกอบธุรกิจ" />
    </MuiCard>
    <MuiCard>

      <BizShareSessionTitle label="เลือกร้านค้า" />
      <BizShareItemLink src="https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png"
        title="ร้านข้าว เฉยๆ" @on-tapped="toShopSelect" />

      <BizShareSessionTitle label="ที่อยู่ร้านค้า" />
      <BizShareItemLink :title="fullAddress.address" :description="fullAddress.status" @on-tapped="onSelectAddress" />
      <p class="mt-2 text-red-500 dark:text-red-400 text-sm">Invalid request</p>

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
import type { BizShareSessionTitle } from "#build/components";


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

const listInfo2 =
  [{
    // label: 'ค่าบริการร้านค้า 10-30% (ปัจจุบัน 30%)',
    label: 'Delivery 30%',
    src: 'i-heroicons-building-storefront-20-solid',
    value: '',
    status: ''
  }, {
    // label: 'ค่าบริการ Delivery 60-70% (ปัจจุบัน 70%) + ค่าส่วนเกิน',
    label: 'Shop 70%',
    src: 'i-heroicons-truck-solid',
    value: '',
    status: ''
  }];

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

const toShopSelect = () => {
  navigateTo('shopSelect')
};

const fullAddress = ref(
  {
    address: "",
    status: "ยังไม่ระบุ"
  }
);
const onSelectAddress = () => {
  fullAddress.value.address = "เลขที่ 123 ถนน 123 แขวง 123 เขต 123 กรุงเทพมหานคร 12345";
  fullAddress.value.status = "";
};

const selectedItemName = computed(() => {
  let name = selectedDelivery.value?.name;
  return name;
});

const selectedItemImage = computed(() => {
  let imgUrl = selectedDelivery.value?.logoUrl?.startsWith("https://") ? selectedDelivery.value?.logoUrl : `https://${selectedDelivery.value?.logoUrl}`;
  return imgUrl;
});

const onSelect = () => {
  console.log("onSelect");
}

</script>
