<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <!-- TODO add title -->
      <MuiHeader title="ขออนุญาตทำสัญญา" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero :src="data?.daPicUrl" :title="data?.daName" :subtitle="data?.createdDate" />
        </MuiCard>
        <!-- <MuiCard>
          <BizShareItemInfo heading="2.ขออนุญาตเชื่อมระบบกับบัญชีร้านของคุณ" :src="data?.manaPicUrl"
            :title="data?.manaDisplayName"  />
        </MuiCard> -->
        <MuiCard>
          <BizShareSessionTitle label="ขออนุญาตเชื่อมระบบกับบัญชีร้านของคุณ" />
          <BizShareValidateItem v-model="dataForm.acceptances" name="acceptances">
            <BizShareItemLink v-if="selectedItemName" :title="selectedItemName" :src="selectedItemImage"
              @on-tapped="onSelectShopList" />
            <BizShareItemLink v-else title="คุณยังไม่มีร้าน" />
          </BizShareValidateItem>
        </MuiCard>
        <MuiCard>
          <BizShareSessionTitle label="รายละเอียดสัญญา"
            :button="{ label: '', icon: 'i-ion-information-circle-outline' }" @on-tapped="gotoAgreement" />
          <BizShareText class="" icon="i-heroicons-building-storefront-20-solid"
            :text="`ค่าบริการร้านค้า ${data?.percentRangeFee}% (ปัจจุบัน ${data?.percentRevenue}%)`" />
          <!-- TODO กดแล้วไปไหนค่อยว่ากันอีกที -->
          <!-- <p class="underline text-center">ดูรายละเอียดสัญญา</p> -->
        </MuiCard>
        <pre>
          {{ dataForm }}
        </pre>
        <UFormGroup label="endpoint" name="endpoint">
          <UInput v-model="dataForm.endpoint" />
        </UFormGroup>
        <UButton @click="govisit">govisit</UButton>
        <UButton @click="getDataForm">getDataForm</UButton>
        <UButton @submit="onSubmit">onSubmit</UButton>
        <UButton @click="onSubmit">clickSubmit</UButton>
        <!-- <BizShareActionConsent /> -->
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

const manaLib = await getManaContext();
const endpointId = useRoute().query["endpointId"];
const _data = useJergunStore();
const { dataJergun, pending } = storeToRefs(_data);
const { postSubmitConsentData, getData } = _data;
const data = ref<any>();
const selectedShop = ref<any>();

const getDataForm = async () => {
  // dataForm.acceptances = selectedShop.value?._id;
}

const govisit = async () => {
  manaLib.visit("jergun", `default/jergun-consent-shop?endpointId=${dataForm.endpoint}`);
};

getData("get-consent-contract").then(async () => {
  data.value = {
    _id: dataJergun.value._id,
    daName: dataJergun.value.daName,
    daPicUrl: manaLib.getUrl(dataJergun.value.daLogoHost, dataJergun.value.daLogoPath),
    createdDate: manaLib.getDateText(dataJergun.value.createdDate),
    baList: dataJergun.value?.baList,
    percentRevenue: dataJergun.value?.percentRevenue,
    percentRangeFee: dataJergun.value?.percentRangeFee,
  };
  selectedShop.value = {
    _id: data.value?.baList[0]._id,
    name: data.value?.baList[0].name,
    logoUrl: data.value?.baList[0].logohost == "icon" ? data.value?.baList[0].logoPath : manaLib.getUrl(data.value?.baList[0].logoHost, data.value?.baList[0].logoPath)
  }
  dataForm.acceptances = selectedShop.value._id;
  dataForm.endpoint = endpointId?.toString() as any;
});

const validationRules = z.object({
  acceptances: z.string().min(1, "Invalid request"),
  endpoint: z.string(),
});

type Schema = z.output<typeof validationRules>;
const dataForm = reactive({
  acceptances: "",
  endpoint: ""
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      Acceptances: [dataForm.acceptances]
    };
    await postSubmitConsentData(formdata, "post-consent-contract");
  }
}

const selectedItemName = computed(() => {
  let name = selectedShop.value?.name;
  return name;
});

const selectedItemImage = computed(() => {
  // let imgUrl = lib.getUrl(selectedShop.value?.logoHost, selectedShop.value?.logoPath);
  // let imgUrl = selectedShop.value?.logoUrl?.startsWith("https://") ? selectedShop.value?.logoUrl : `https://${selectedShop.value?.logoUrl}`;
  return selectedShop.value?.logoUrl;
});

const onSelectShopList = async () => {
  let optionDlgResult = await manaLib.showOptionDlg(
    "jergun-shop-select",
    "1btn",
    JSON.stringify({}),
    "close",
    "",
    "f"
  );

  if (optionDlgResult && !optionDlgResult.isCancel) {

    selectedShop.value = optionDlgResult?.selection
    dataForm.acceptances = selectedShop.value?._id;
    // selectedShop.value.name = optionDlgResult?.selection?.name;
    // selectedShop.value.logoUrl = optionDlgResult?.selection?.logoUrl;
  }
};

const gotoAgreement = async () => {
  await manaLib.visit("jergun", "default/jergun-agreement?endpointId=enpd-agreement");
};
</script>
