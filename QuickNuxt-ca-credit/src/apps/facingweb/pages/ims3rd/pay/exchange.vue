<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="อัตราการแลกเปลี่ยน" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <!-- <BizNewBillShareUserTransfer :data="data" /> -->
          <BizShareItem :src="'i-lucide-wallet'" :title="data.fromName" :description="data.fromSubName"
            :transparent="true" />
          <div class="flex">
            <UIcon class="mx-7 w-6 h-6" name="i-heroicons-arrow-small-down" />
            <UDivider />
          </div>
          <BizShareItem :src="tosrc" :title="data.toName" :description="data.toSubName" :transparent="true" />
        </MuiCard>
        <MuiCard>
          <!-- <BizShareItemStatus src="i-lucide-wallet" title="ยอดรวมทั้งหมด" class="bg-gray-100 " :rightText="fromcurrency"
            :transparent="true" right-color="red" /> -->

          <BizShareItem class="bg-gray-100 rounded-[100px] ring-white" src="i-lucide-wallet" title="ยอดรวมทั้งหมด"
            :ui="{ icon: { base: 'w-8 h-8' }, }"
            :close-button="{ label: totalToPaySource, color: 'red', variant: 'ghost', padded: false, class: 'text-xl font-bold' }" />

          <!-- <BizShareText :text="`อัตราการแลกเปลี่ยนปัจจุบัน ${data.exchangeRate.amountUnit} THB/USD`"
            class="text-gray-400 text-base" />
          <BizShareText :text="`อัตรานี้จะหมดอายุภายใน    ${dateexpire} `" class="text-gray-400" /> -->

          <UVerticalNavigation :links="infos" class="w-full" :ui="{
            base: '', inactive: 'group relative flex items-top gap-1.5 focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75 px-2.5 py-1.5 w-full focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 rounded-md  text-base text-gray-500 dark:text-gray-400 dark:hover:text-white hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50 hover:text-gray-500'
            , wrapper: 'relative', label: 'truncate text-wrap text-gray-400 relative dark:text-white flex-initial w-40 text-left'
          }">
            <template #badge="{ link }">
              <div class="flex-1 flex justify-between relative truncate text-wrap text-left text-gray-400">
                <p>{{ link.value }}</p>
              </div>
            </template>
          </UVerticalNavigation>

          <BizShareSessionTitle label="การแลกเปลี่ยน" />

          <div class=" rounded-lg ">
            <div class="flex justify-evenly">
              <!-- จาก -->
              <UCard class="text-center w-full h-max p-2 " :ui="{ body: '' }">
                <div class="flex flex-col">
                  <UFormGroup label="จาก" :hint="`&nbsp;&nbsp;&nbsp;&nbsp;สกุลเงินคุณ`"
                    :ui="{ label: { base: 'text-[10px]' }, hint: 'text-[10px]' }" />
                  <UAlert class="p-0 justify-items-start" :avatar="{
                    src: 'https://flagcdn.com/w80/th.png'
                  }" title="THB" variant="soft" />
                </div>
              </UCard>

              <!-- ลูกศร -->
              <div class="text-gray-400 text-2xl px-2 content-center">→</div>

              <!-- ไปยัง -->
              <UCard class="text-center w-full h-max p-2" :ui="{ body: '' }">
                <!-- <div class="flex flex-col "> -->
                <UFormGroup label="ไปยัง" :hint="`สกุลเงินปลายทาง`"
                  :ui="{ label: { base: 'text-[10px]' }, hint: 'text-[10px]' }" />
                <!-- <div class="text-sm text-gray-500 mt-1">ไปยัง สกุลเงินปลายทาง</div> -->
                <UAlert class="p-0 justify-items-start" :avatar="{
                  src: 'https://flagcdn.com/w80/us.png'
                }" title="USD" variant="soft" />
                <!-- <UAvatar class="mx-auto" src="https://flagcdn.com/w80/us.png" size="lg" alt="US Flag" />
                  <div class="font-semibold text-lg">USD</div> -->
                <!-- </div> -->
              </UCard>
            </div>
          </div>


          <UFormGroup label="จำนวนเงิน(ปลายทาง)">
            <template #hint>
              <BizShareText :text="toCurrency" />
            </template>
          </UFormGroup>
          <UFormGroup label="ค่าธรรมเนียม">
            <template #hint>
              <BizShareText :text="toFee" />
            </template>
          </UFormGroup>
          <UFormGroup label="รวมทั้งหมด">
            <template #hint>
              <BizShareText :text="totalToPayDest" />
            </template>
          </UFormGroup>
        </MuiCard>
        <ActionButton text="ตกลง" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext, ActionButton } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useIms3rdStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const endpointId = useRoute().query["xxx"];
const infos = ref<any>([]);

import { ref } from 'vue'

getData("get-pay-exchange").then(async () => {
  console.log("data", data.value);
  dataForm.sessionId = data.value?.endpointId;
  dataForm.calculatorExchangeRateWithOutFeeRequest = data.value?.getFee;
  infos.value = [
    { label: "อัตราแลกเปลี่ยนปัจจุบัน", value: `${data.value.exchangeRate.amountUnit} THB/USD` },
    { label: "อัตรานี้จะหมดอายุภายใน", value: dateexpire.value },
  ]
});

const validationRules = z.object({
  sessionId: z.string().min(1, "Invalid request"),
  calculatorExchangeRateWithOutFeeRequest: z.object({}),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  sessionId: "",
  calculatorExchangeRateWithOutFeeRequest: {} as any,
});

const tosrc = computed(() => {
  const img = data.value?.tologoHost == "icon"
    || data.value?.tologoHost == ""
    ? "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png" : manaLib.getUrl(data.value?.tologoHost, data.value?.tologoPath);
  return img;
});

const toCurrency = computed(() => {
  return manaLib.toText(data.value?.toCurrency);
});
const toFee = computed(() => {
  return `+ค่าธรรมเนียม ${manaLib.toText(data.value?.toFee)}`;
});

const totalToPaySource = computed(() => {
  return manaLib.toText(data.value?.totalToPaySource);
});
const totalToPayDest = computed(() => {
  return manaLib.toText(data.value?.totalToPayDest);
});
const dateexpire = computed(() => {
  return manaLib.getDateText(data.value?.dateexpire);
});
async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log("event", event);
  await postData(dataForm, "post-pay-exchange")
}

</script>