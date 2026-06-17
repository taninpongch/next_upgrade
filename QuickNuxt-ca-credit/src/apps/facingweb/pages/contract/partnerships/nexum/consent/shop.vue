<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ขออนุญาตทำสัญญา" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizShareSessionTitle label="ผู้ส่งสัญญา" />
          <BizSharePartyHero :src="displaySrcAquirer" :title="data?.consentfrom?.name" :subtitle="consentDate" />
        </MuiCard>
        <MuiCard>
          <BizShareSessionTitle label="รายละเอียดสัญญา" :button="{ icon: 'i-lucide-info', label: '' }"
            @on-tapped="goto" />
          <!-- <BizShareText icon="i-lucide-dot" :text="`ขออนุญาตทำสัญญาให้ร้านของคุณเป็นร้านในเครือ ${data?.consentfrom?.name}`" class="text-sm" /> -->
          <BizShareListInfoVertical heading="" :infos="displayContractInfo" />
          <!-- <BizShareItemInfo heading="รายละเอียดสัญญา"
            :title="`ขออนุญาตทำสัญญาให้ร้านของคุณเป็นร้านในเครือ ${data?.consentfrom?.name}`"
            :titleButton="{ icon: 'i-lucide-info', label: '' }" @on-tapped="goto" /> -->
        </MuiCard>
        <MuiCard>
          <BizShareSessionTitle label="รายละเอียดสัญญาเพิ่มเติม" :button="{ icon: 'i-lucide-info', label: '' }"
            @on-tapped="goto" />
          <BizShareListInfoVertical heading="" :infos="displayContractAddionalInfo" />
          <!-- <BizShareText icon="i-lucide-dot" :text="`อัตราดอกเบี้ย ${data?.interestRatePercentage}`" class="text-sm" /> -->
          <!-- <BizShareItemInfo heading="รายละเอียดสัญญาเพิ่มเติม" :title="`อัตราดอกเบี้ย ${data?.interestRatePercentage}`"
            :titleButton="{ icon: 'i-lucide-info', label: '' }" @on-tapped="goto" /> -->
        </MuiCard>
        <MuiCard>
          <BizShareSessionTitle label="ร้านของคุณ" />
          <BizShareValidateItem v-model="dataForm.acceptances" name="acceptances">
            <BizShareItemLink v-if="shopName" :src="displayShopLogo" :title="shopName" @on-tapped="onSelectBA" />
            <BizShareItemLink v-else :src="displayShopLogo" title="คุณยังไม่มีร้าน" />
          </BizShareValidateItem>
        </MuiCard>
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
const nexumStore = useNexumStore();
const { getData, postSubmitConsentData } = nexumStore;
const { data, pending } = storeToRefs(nexumStore);
const { goVisit } = useManaService();
const displaySrcAquirer = ref();
const selectedShop = ref<any>();
const shopName = ref();
const imgUrlShop = ref();
const consentDate = ref();
const selectedShopLogoHost = ref();
const selectedShopLogoPath = ref();

const goto = async () => {
  await goVisit("nexum", "nexum-consent-shopPolicy", "end-shopPolicy");
};

getData('get-nexum-consent-shop').then(async () => {
  consentDate.value = manaLib.getDateText(data.value?.consentfrom?.createdDate);
  displaySrcAquirer.value = manaLib.getUrl(data.value?.consentfrom?.logoHost ? data.value?.consentfrom?.logoHost : "failfast.blob.core.windows.net", data.value?.consentfrom?.logoPath ? data.value?.consentfrom?.logoPath : "mcontent-imgs/defaults/dfshop.png");
  selectedShop.value = data.value?.baList[0];
  selectedShopLogoHost.value = selectedShop?.value?.logoHost;
  selectedShopLogoPath.value = selectedShop?.value?.logoPath;
  shopName.value = selectedShop?.value?.name;
  dataForm.value.acceptances = selectedShop.value?._id ? selectedShop.value?._id : "";
  dataForm.value.ba = selectedShop.value?._id ? selectedShop.value?._id : "";
});

const displayShopLogo = computed(() => {
  if (selectedShopLogoHost.value && selectedShopLogoPath.value) {
    return manaLib.getUrl(selectedShopLogoHost.value, selectedShopLogoPath.value);
  }
  else {
    return "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png"
  }
});

const listInfo = ref<any>([]);
const displayContractInfo = computed(() => {
  return listInfo.value =
    [{
      label: `ขออนุญาตทำสัญญาให้ร้านของคุณเป็นร้านในเครือ ${data?.value?.consentfrom?.name}`,
      src: 'i-lucide-dot',
      value: ``,
      status: ''
    }];
});

const displayContractAddionalInfo = computed(() => {
  return listInfo.value =
    [{
      label: `ค่าธรรมเนียม ${data?.value?.feeRate}`,
      src: 'i-lucide-dot',
      value: ``,
      status: ''
    }];
});

const validationRules = z.object({
  acceptances: z.string().min(1, "Invalid request"),
  ba: z.string().min(1, "Invalid request"),
});

type Schema = z.output<typeof validationRules>;
const dataForm = ref({
  acceptances: "",
  ba: "",
});

const onSelectBA = async () => {
  let optionDlgResult = await manaLib.showOptionDlg("nexum-consent-shopSelect", "1btn", JSON.stringify({}), 'close', '', 'f');

  if (optionDlgResult && !optionDlgResult.isCancel) {
    dataForm.value.acceptances = optionDlgResult?.selection.shopId;
    dataForm.value.ba = optionDlgResult?.selection.shopId;
    // dataForm.value.bizAddress = optionDlgResult?.selection.shopLocation;
    shopName.value = optionDlgResult?.selection.shopName;
    imgUrlShop.value = optionDlgResult?.selection.shopSrc;
    selectedShopLogoHost.value = optionDlgResult?.selection.shopLogoHost;
    selectedShopLogoPath.value = optionDlgResult?.selection.shopLogoPath;
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      Acceptances: [dataForm.value.acceptances],
      BA: dataForm.value.ba,
    };
    await postSubmitConsentData(formdata, "post-nexum-consent-shop");
  }
}
</script>