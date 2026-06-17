<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="คำขออนุมัติเพิ่มงบ" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizShareSessionTitle label="ผู้ส่งสัญญา" />
          <BizSharePartyHero :src="displayImage" :title="data?.baInfo?.baName" :subtitle="consentDate" />
        </MuiCard>
        <MuiCard>
          <!-- <BizShareListInfoHorizontal heading="อ้างอิง" :infos="linkRef">
          </BizShareListInfoHorizontal>
          <UVerticalNavigation :links="linkRef.slice(linkRef.length - 1)" class="" :ui="{
            base: '-mt-4', inactive: 'group relative flex items-top gap-1.5 focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75  w-full focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 rounded-md font-semibold text-sm text-gray-500 dark:text-gray-400 dark:hover:text-white hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50 hover:text-gray-500'
            , wrapper: 'relative', label: 'truncate relative text-gray-900 dark:text-white flex-initial w-32 text-left'
          }">
            <template #badge="{ link }">
              <div class="flex-1 flex justify-between relative truncate text-wrap text-left">
                <p class="text-red-600">{{ linkRef.slice(linkRef.length - 1)[0].value }}</p>
              </div>
            </template>
</UVerticalNavigation> -->
          <BizShareListInfoHorizontal heading="อ้างอิง" :infos="linkRef">
          </BizShareListInfoHorizontal>
        </MuiCard>
        <MuiCard>
          <BizShareInputNote label="หมายเหตุ" placeholder="กรุณาระบุ" hint="Optional" v-model="dataForm.note"
            name="note" />
        </MuiCard>
        <ConsentButtonsBand accept-app-text="Accept" reject-app-text="Reject" accept-text="Accept" reject-text="Reject"
          :v-model="dataForm.acceptances"></ConsentButtonsBand>
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ConsentButtonsBand, getManaContext, } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const nexumStore = useNexumStore();
const { getData, postSubmitConsentData } = nexumStore;
const { data, pending } = storeToRefs(nexumStore);
const displayImage = ref();
const { goVisit } = useManaService();
const consentDate = ref(manaLib.getDateText(new Date().toISOString()));

getData('get-ca-consent-addfunds').then(async () => {
  consentDate.value = manaLib.getDateText(data?.value?.baInfo?.createdDate);
  displayImage.value = manaLib.getUrl(data.value?.baInfo?.logoHost ? data.value?.baInfo?.logoHost : "failfast.blob.core.windows.net", data.value?.baInfo?.logoPath ? data.value?.baInfo?.logoPath : "mcontent-imgs/defaults/dfshop.png");
});

const linkRef = [{
  label: 'ให้กับ',
  value: data.value?.addfundsInfo?.name ? data.value.addfundsInfo.name : "-",
}, {
  label: 'วงเงินทั้งหมด',
  value: data.value?.addfundsInfo?.totalAmount ? manaLib.toText(data.value.addfundsInfo.totalAmount) : "0 THB",
}, {
  label: 'ขอเพิ่มงบ',
  value: data.value?.addfundsInfo?.returnAmount ? manaLib.toText(data.value.addfundsInfo.returnAmount) : "0 THB",
  danger: true,
}]

const validationRules = z.object({
  note: z.string(),
  acceptances: z.string()
});

type Schema = z.output<typeof validationRules>;
const dataForm = ref({
  note: "",
  acceptances: ""
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      note: event.data.note,
      Acceptances: [dataForm.value.acceptances]
    };
    await postSubmitConsentData(formdata, "post-ca-consent-addfunds", data.value.serviceSubscriptionId);
  }
}
</script>