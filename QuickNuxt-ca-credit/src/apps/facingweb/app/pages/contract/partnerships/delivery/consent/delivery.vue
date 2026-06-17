<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <!-- TODO add title -->
      <MuiHeader title="ขออนุญาตทำสัญญา" />
      <MuiCard>
        <BizSharePartyHero :src="srcDevster" :title="dataGet?.baName" :subtitle="createdDate" />
      </MuiCard>
      <MuiCard>
        <BizShareItemInfo heading="รายละเอียดสัญญา" title="ทำการเปิด Bussiness-Account สำหรับ Delivery" />
        <BizShareItemInfo heading="ข้อมูล Delivery" :src="selectedItemImage"
          :title="dataGet?.session?.extraElements?.consentData?.deliveryName" />
        <BizShareListInfoVertical heading="ส่วนแบ่ง Escrow" :infos="listInfoEscrow" />

        <!-- ตอนนี้ยังไม่มี -->
        <!-- <BizShareListInfoHorizontal heading="สร้าง Budget" :infos="listOfCreateBudgetInfo" />
      <BizShareListInfoHorizontal heading="ขอเข้าถึง Budget" :infos="listOfAccessBudgetInfo" /> -->

      </MuiCard>
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <ConsentButtonsBand accept-app-text="Accept" reject-app-text="Reject" accept-text="Accept" reject-text="Reject"
          :v-model="dataForm.acceptances"></ConsentButtonsBand>
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { getManaContext, ConsentButtonsBand } from "@manaapp/ui";
import { storeToRefs } from "pinia";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const lib = await getManaContext();
const store = useDeliveryStore();
const { data, pending, } = storeToRefs(store);
const { getData, postSubmitConsentData } = store;
const dataGet = ref<any>('')
const createdDate = ref('')
const srcDevster = ref('https://placehold.co/600x400.png')

getData("get-partnerships-delivery-consent-delivery").then(async () => {
  dataGet.value = data.value;
  createdDate.value = lib.getDateText(dataGet.value?.session?.createdDate)
  dataForm.value.acceptances = dataGet.value?.session?.id
});

const listInfoEscrow = computed(() => [
  {
    // label: 'ค่าบริการร้านค้า 10-30% (ปัจจุบัน 30%)',
    label: `Software ${dataGet?.value.session?.
      extraElements?.consentData?.serviceShare
      ?.shareValue}%`,
    src: 'i-heroicons-building-storefront-20-solid',
    value: '',
    status: ''
  }, {
    // label: 'ค่าบริการ Delivery 60-70% (ปัจจุบัน 70%) + ค่าส่วนเกิน',
    label: `Rider ${dataGet?.value.session?.
      extraElements?.consentData?.riderShare?.shareValue}.00 THB + ค่าส่งส่วนเกิน`,
    src: 'i-heroicons-truck-solid',
    value: '',
    status: ''
  }]);

const selectedItemImage = computed(() => {
  if (dataGet?.value.session?.extraElements?.consentData?.deliveryLogo == null)
    return '';
  else {
    let imgUrl = dataGet?.value.session?.extraElements?.consentData?.deliveryLogo?.startsWith("https://") ? dataGet?.value.session?.extraElements?.consentData?.deliveryLogo : `https://${dataGet?.value.session?.extraElements?.consentData?.deliveryLogo}`;
    return imgUrl;
  }
});

const validationRules = z.object({
  acceptances: z.string().min(1, "Invalid request")
});

type Schema = z.output<typeof validationRules>;

const dataForm = ref({
  acceptances: ""
});

async function onSubmit() {  
  if (dataForm.value?.acceptances) {
    var formdata = {
      Acceptances: [dataForm.value?.acceptances]
    };
    await postSubmitConsentData(formdata, "post-partnerships-delivery-consent-delivery");
  }
}

</script>