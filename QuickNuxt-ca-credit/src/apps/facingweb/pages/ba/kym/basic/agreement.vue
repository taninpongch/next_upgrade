<template>
  <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
    <div v-if="pending">
      <BizShareSkeletonLabel />
    </div>
    <div v-else>
      <MuiPage>
        <MuiHeader title="ข้อกำหนดและเงื่อนไขในการใช้งาน" />
        <MuiCard>
          <BizShareAgreement :title="data.titleTH" :src="logomana" :paragraph="data.textTH" />
        </MuiCard>
        <MuiCard>
          <BizBAShareInputToggle label="ข้อมูลเพิ่มเติม" textToggle="ขออนุญาตเข้าถึงข้อมูล KYC"
            v-model="dataForm.reqKYC" :disabled="true" />
        </MuiCard>
      </MuiPage>
    </div>
    <ConsentButtonsBand accept-app-text="Accept" reject-app-text="Reject" accept-text="Accept" reject-text="Reject"
      :v-model="dataForm.acceptances"></ConsentButtonsBand>
  </BizShareManaForm>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ConsentButtonsBand, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postSubmitConsentData } = store;

getData('get-ba-kym-basic-agreement').then(() => {
  dataForm.value.acceptances = data.value.acceptances;
});

const logomana = computed(() => {
  if (data.value == null) {
    return "";
  }
  return manaLib.getUrl(data?.value.logo.host, data?.value.logo.path)
})


const validationRules = z.object({
  acceptances: z.string()
});

type Schema = z.output<typeof validationRules>;

const dataForm = ref({
  reqKYC: true,
  acceptances: ""
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      Acceptances: [dataForm.value.acceptances]
    };
    await postSubmitConsentData(formdata, "post-ba-kym-basic-agreement");
  }
}

</script>
