<template>
  <MuiPage>
    <MuiHeader title="ข้อกำหนดและเงื่อนไขในการใช้งาน" />

    <!-- <UTabs :items="items" class="w-full" @change="onChange">
    </UTabs> -->

    <MuiCard>
      <BizShareAgreement v-if="content == 'TH'" :title="datakyc?.data?.titleTH" :src="logomana"
        class="text-wrap" :paragraph="datakyc?.data?.textTH" />
      <BizShareAgreement v-else :title="datakyc?.data?.titleEN" :src="datakyc?.data?.logoEN"
        :paragraph="datakyc?.data?.textEN" />
    </MuiCard>

    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <ConsentButtonsBand accept-app-text="Accept" reject-app-text="Reject" accept-text="ยอมรับ" reject-text="ปฏิเสธ"
        :v-model="dataForm.acceptances"></ConsentButtonsBand>
    </BizShareManaForm>
  </MuiPage>
</template>


<script lang="ts" setup>
import { getManaContext, ActionButton, ConsentButtonsBand } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const kyc = useKycStore();
const { datakyc } = storeToRefs(kyc);
const { getData, postSubmitConsentData } = kyc;

getData('get-basic-agreement').then(async () => {
  dataForm.acceptances = datakyc.value?.data?.acceptances
});

const logomana = computed(() => {
  if (datakyc?.value == null) {
    return "";
  }
  return manaLib.getUrl(datakyc?.value.data?.logo.host, datakyc?.value.data?.logo.path)
})

const content = ref('TH');

function onChange(index: any) {
  const item = items[index]
  if (item.label == 'คนไทย') {
    content.value = 'TH'
  }
  else {
    content.value = 'EN'
  }
}

const items = [{
  label: 'คนไทย',
  icon: 'i-heroicons-information-circle',
  content: ''
}, {
  label: 'foreign',
  icon: 'i-heroicons-information-circle',
  content: ''
}]

const validationRules = z.object({
  acceptances: z.string()
});

type Schema = z.output<typeof validationRules>;

// TODO: ใช้ ref แทน reactive อย่าลืม .value ใน dataForm ด้วย
const dataForm = reactive({
  acceptances: ""
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      Acceptances: [dataForm.acceptances]
    };
    await postSubmitConsentData(formdata, "post-consent-kyc-th-agreement");
  }
}

</script>