<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <!-- TODO add title -->
      <MuiHeader title="การเข้าร่วมสัญญา" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero :src="srcDAIms" :title="dataContract?.name" :subtitle="createDate" />
        </MuiCard>
        <MuiCard>
          <BizShareItemInfo heading="รายละเอียดสัญญา" :title="dataContract?.contract?.details" />
          <BizShareItemInfo heading="การขอข้อมูล" :title="dataContract?.contract?.information" />
        </MuiCard>
        <MuiCard>
          <BizShareSessionTitle label="เลือกร้านค้า" />
          <BizShareValidateItem v-model="dataForm.acceptances" name="acceptances">
            <BizShareItemLink v-if="selectedItemName" :title="selectedItemName" :src="selectedItemImage"
              @on-tapped="onSelectShopList" />
            <BizShareItemLink v-else title="คุณยังไม่มีร้าน" />
          </BizShareValidateItem>
        </MuiCard>
        <ConsentButtonsBand accept-app-text="Accept" reject-app-text="Reject" accept-text="Accept" reject-text="Reject"
          :v-model="dataForm.acceptances"></ConsentButtonsBand>
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ConsentButtonsBand, getManaContext } from "@manaapp/ui";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const manaLib = await getManaContext();
const _data = useContractStore();
const { dataContract, pending } = storeToRefs(_data);
const { postSubmitConsentData, getData } = _data;
const createDate = ref("");
const selectedShop = ref<any>();

getData("get-consent-ims-shop", "ims").then(async () => {
  createDate.value = manaLib.getDateText(dataContract?.value?.createdDate)
  selectedShop.value = dataContract?.value?.baList[0];
  dataForm.acceptances = selectedShop?.value?._id;

});

const selectedItemName = computed(() => {
  let name = selectedShop?.value?.name;
  return name;
});

const selectedItemImage = computed(() => {
  const img = manaLib.getUrl(selectedShop.value?.logoHost, selectedShop.value?.logoPath);
  return img;
});


const srcDAIms = computed(() => {
  const img = manaLib.getUrl(dataContract?.value?.logohost, dataContract?.value?.logopath);
  return img;
});

const validationRules = z.object({
  acceptances: z.string().min(1, "Invalid request")
});

type Schema = z.output<typeof validationRules>;
const dataForm = reactive({
  acceptances: ""
});

const onSelectShopList = async () => {
  let optionDlgResult = await manaLib.showOptionDlg(
    "ims-consent-shopSelect",
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

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {

    var formdata = {
      Acceptances: [dataForm.acceptances]
    };
    await postSubmitConsentData(formdata, "post-consent-ims-shop", "ims");
  }
}

</script>
