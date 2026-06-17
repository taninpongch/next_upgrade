<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ยินยันบัญชี" />
      <BizShareManaForm @submit="onSubmit">
        <MuiCard>
          <BizShareItemInfo heading="ธุรกิจที่ถอน" :src="fromsrc" :title="data?.fromName" />
        </MuiCard>
        <MuiCard>
          <BizShareListInfoHorizontal heading="ถอนไปยังบัญชี" :infos="detailOrigin.details" />
        </MuiCard>
        <MuiCard>
          <BizShareSessionTitle label="จำนวนที่ต้องการถอน" />
          <BizSharePartyHero  src="i-material-symbols-light-outbox-rounded" :title="totaltopay"
            subtitle="" />
        </MuiCard>
        <MuiCard>
          <BizShareItemInfo heading="หมายเหตุ" :title="data?.remark ? data.remark : '-'" />
        </MuiCard>
        <ActionButton text="ยืนยัน" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { getManaContext, ActionButton } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const detailOrigin = ref<any>([]);

getData('get-ca-withdraw-confirm').then(async () => {
  detailOrigin.value = {
    details: [
      { label: "ธนาคาร", value: data.value.tobankName },
      { label: "เลขบัญชี", value: data.value.toBankAccountNumber },
      {
        label: "ประเภท",
        value: "บัญชีธนาคาร",
      },
      { label: "ชื่อบัญชี", value: data.value.toName },
      { label: " ", value: data.value.toSubName },
    ],
  };
});

const fromsrc = computed(() => {
  const img = data.value?.fromLogoHost == "icon"
    || data.value?.bizAccountdata?.fromLogoHost == ""
    ? "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png" : manaLib.getUrl(data.value?.fromLogoHost, data.value?.fromLogoPath);
  return img;
});

const totaltopay = computed(() => {
  return manaLib.toText(data.value?.totalToPay)
});


async function onSubmit() {
  // TODO:Implement submit
  await postData({}, "post-ca-withdraw-confirm");
  // await goVisit("kym", "proto-ca-withdraw-confirm-dlg", "ca-withdraw");
  // await navigateTo("resultDialog");
}
</script>

<style></style>
