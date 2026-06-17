<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <!-- TODO add title -->
      <MuiHeader title="ขออนุญาตเชื่อมบัญชี Line กับบัญชีของคุณ" />
      <MuiCard>
        <BizSharePartyHero :src="data?.baPicUrl" :title="data?.baName" :subtitle="data?.createdDate" />
      </MuiCard>
      <MuiCard>
        <!-- แบบใหม่ รอใช้หลัง migrate -->
        <!-- <BizShareItemInfo heading="รายละเอียดสัญญา" title="ขออนุญาตเชื่อมบัญชี Line กับบัญชี Mana ของคุณ" />
          <BizShareItemInfo heading="ข้อมูลบัญชี Mana" :src="data?.manaPicUrl" :title="data?.manaDisplayName" />
          <BizShareItemInfo heading="ข้อมูลบัญชี Line" :title="data?.lineDisplayName" /> -->

        <!-- แบบเก่า -->
        <BizShareItemInfo heading="ขออนุญาตเชื่อมบัญชี Line กับบัญชี mana ของคุณ" :src="data?.manaPicUrl"
          :title="data?.manaDisplayName" />
        <BizShareListInfoVertical heading="ข้อมูลบัญชี Line" :infos="lineInfo" />
      </MuiCard>
      <MuiCard>
        <BizShareSessionTitle label="เลือกเดลิเวอรี่" />
        <BizShareItemLink :title="selectedItemName" :src="selectedItemImage" @on-tapped="onSelectDeliveryList" />
      </MuiCard>
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <ConsentButtonsBand accept-app-text="Accept" reject-app-text="Reject" accept-text="Accept" reject-text="Reject"
          :v-model="dataForm.acceptances"></ConsentButtonsBand>
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ConsentButtonsBand, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { useContractStore } from "~/composables/contractStore";

const lib = await getManaContext();
const _data = useContractStore();
const { dataContract, pending } = storeToRefs(_data);
const { postSubmitConsentData, getData } = _data;
const data = ref<any>();
const lineInfo = ref<any>([]);
const selectedDelivery = ref<any>();

getData("get-consent-link-rider-line-ads", "delivery").then(async () => {
  data.value = {
    _id: dataContract.value?._id,
    baName: dataContract.value?.baName,
    baPicUrl: lib.getUrl(dataContract.value?.baPicUrl?.host, dataContract.value?.baPicUrl?.path),
    createdDate: lib.getDateText(dataContract.value?.createdDate),
    manaDisplayName: dataContract.value?.manaDisplayName,
    manaPicUrl: lib.getUrl(dataContract.value?.manaPicUrl?.host, dataContract.value?.manaPicUrl?.path),
    lineDisplayName: dataContract.value?.displayName,
    deliveryList: dataContract.value?.deliveryList
  };
  lineInfo.value = [{
    label: 'Display name',
    value: data.value?.lineDisplayName,
  }];
  selectedDelivery.value = data.value?.deliveryList[0];
  dataForm.acceptances = selectedDelivery.value?._id;
});

const onSelectDeliveryList = async () => {
  const lib = await getManaContext();
  let optionDlgResult = await lib.showOptionDlg(
    "delivery-link-user-select",
    "1btn",
    JSON.stringify({ deliveryList: data.value?.deliveryList }),
    "close",
    "",
    "f"
  );
  if (optionDlgResult && !optionDlgResult.isCancel) {
    selectedDelivery.value = optionDlgResult?.selection
    dataForm.acceptances = selectedDelivery.value?._id;
  }
}

const validationRules = z.object({
  acceptances: z.string()
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  acceptances: ""
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      Acceptances: [dataForm.acceptances]
    };
    await postSubmitConsentData(formdata, "post-consent-link-rider-line-ads", "delivery");
  }
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
