<template>
  <MuiPage>
    <!-- TODO add title -->
    <MuiHeader title="ขออนุญาตทำสัญญา" />
    <MuiCard>
      <BizSharePartyHero :src="data?.baPicUrl" :title="data?.baName" :subtitle="data?.createdDate" />
    </MuiCard>
    <MuiCard>
      <BizShareItemInfo heading="รายละเอียดสัญญา" title="ทำการเปิด Bussiness-Account สำหรับ Delivery" />
      <BizShareItemInfo heading="ข้อมูล Delivery"
        src="https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/dfdelivery.png"
        title="Delivey For U" />
      <BizShareListInfoVertical heading="ส่วนแบ่ง Escrow" :infos="listInfo2" />
      
      <!-- ตอนนี้ยังไม่มี -->
      <!-- <BizShareListInfoHorizontal heading="สร้าง Budget" :infos="listOfCreateBudgetInfo" />
      <BizShareListInfoHorizontal heading="ขอเข้าถึง Budget" :infos="listOfAccessBudgetInfo" /> -->

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
import type { BizShareListInfoHorizontal, BizShareSessionTitle } from "#build/components";


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
  baName: "Demo Devster",
  baPicUrl: "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png",
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
    label: 'Software 15%',
    src: 'i-heroicons-building-storefront-20-solid',
    value: '',
    status: ''
  }, {
    // label: 'ค่าบริการ Delivery 60-70% (ปัจจุบัน 70%) + ค่าส่วนเกิน',
    label: 'Rider 5.00 THB + ค่าส่งส่วนเกิน',
    src: 'i-heroicons-truck-solid',
    value: '',
    status: ''
  }];

const listOfCreateBudgetInfo = [
  {
    label: 'ชื่อ',
    value: 'BudgetName',
  }, {
    label: 'วงเงิน',
    value: '10,000 THB',
  }, {
    label: 'เพิ่มเติม',
    value: 'เติมเข้าทุกครั้งที่หมด',
  }
];

const listOfAccessBudgetInfo = [
  {
    label: 'ชื่อ',
    value: 'BudgetName',
  }, {
    label: 'วงเงิน',
    value: '10,000 THB',
  }, {
    label: 'เพิ่มเติม',
    value: 'เติมเข้าทุกครั้งที่หมด',
  }
];

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

const onSelect = () => {
}

</script>
