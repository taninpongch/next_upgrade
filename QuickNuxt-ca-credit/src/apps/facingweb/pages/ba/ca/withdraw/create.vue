<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ถอนผ่านบัญชีที่ผูกไว้" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <!-- TODO: lesson learn component-->
          <div>
            <BizShareSessionTitle label="ธุรกิจที่ถอน" />
            <BizShareItemStatus :rightText="getAmount" :transparent="true" :title="data?.fromName" :src="fromsrc" />
            <UDivider class="mb-4" />
            <BizShareItemInfo :transparent="true" heading="ถอนไปยังบัญชี" :src="tosrc" :title="data?.toName"
              :description="data?.toSubName" />
          </div>
        </MuiCard>

        <MuiCard>
          <BizShareInputCurrency label="จำนวนเงิน" placeholder="ระบุยอดเงิน" v-model="dataForm.amount" name="amount" />
        </MuiCard>
        <MuiCard>
          <BizShareInputNote label="หมายเหตุ" placeholder="กรุณาระบุ" hint="Optional" v-model="dataForm.note"
            name="note" />
        </MuiCard>
        <ActionButton text="ตกลง"></ActionButton>
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>
<script lang="ts" setup>
import { getManaContext, ActionButton } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { storeToRefs } from "pinia";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;

getData('get-ca-withdraw-create').then(async () => {
});

const getAmount = computed(() => {
  return manaLib.toText(data.value?.fromWalletBalance)
});


const fromsrc = computed(() => {
  const img = data.value?.fromLogoHost == "icon"
    || data.value?.bizAccountdata?.fromLogoHost == ""
    ? "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png" : manaLib.getUrl(data.value?.fromLogoHost, data.value?.fromLogoPath);
  return img;
});


const tosrc = computed(() => {
  const img = data.value?.toLogoHost == "icon"
    || data.value?.toLogoHost == ""
    ? "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png" : manaLib.getUrl(data.value?.toLogoHost, data.value?.toLogoPath);
  return img;
});

const validationRules = z.object({
  externalAccountId: z.string(),
  currency: z.string().min(1, "Invalid request"),
  amount: z.string().min(1, "Invalid request"),
  note: z.string()
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  externalAccountId: "",
  currency: "THB",
  amount: "",
  note: ""
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // TODO: implement submit
  // await navigateTo("confirm");
  // await goVisit("kym", "proto-ca-withdraw-confirm", "ca-withdraw");
  if (event.data) {
    var formdata = {
      currency: event.data.currency,
      amount: parseFloat(event.data.amount),
      baId: data.value.fromId,
      remark: event.data.note
    };
    await postData(formdata, "post-ca-withdraw-create");
  }
}
</script>

<style></style>
