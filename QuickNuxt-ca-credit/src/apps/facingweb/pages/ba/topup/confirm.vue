<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ยืนยันการเติม" />
      <MuiCard>
        <!-- TODO: lesson learn component-->
        <div>
          <BizShareItemInfo :transparent="true" heading="กระเป๋าที่ใช้เติม" :src="imagewallet"
            :title="data?.wallet?.walletName" />
          <UDivider class="mb-4" />
          <BizShareItemInfo :transparent="true" heading="ร้านที่เติมเข้า" :src="imageba"
            :title="data?.bizAccountdata.name" />
        </div>
      </MuiCard>

      <MuiCard>
        <BizShareSessionTitle label="จำนวนที่ต้องการเติม" />
        <BizSharePartyHero src="i-material-symbols-light-point-of-sale" :title="totaltopay" />
      </MuiCard>

      <MuiCard>
        <BizShareItemInfo heading="หมายเหตุ"
          :title="data?.session.ins[0].txData.remark ? data?.session.ins[0].txData.remark : '-'" />
      </MuiCard>
      <BizShareManaForm @submit="onSubmit">
        <ActionButton text="ยืนยัน" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const totaltopay = ref();

getData('get-ba-topup-confirm').then(async () => {
  totaltopay.value = manaLib.toText(data.value?.session.totalToPay);
});


const imagewallet = computed(() => {
  const img = data.value?.wallet?.logoHost == "icon"
    || data.value?.wallet.logoHost == ""
    ? "i-ion-wallet-outline" : manaLib.getUrl(data.value?.wallet?.logoHost, data.value?.wallet?.logoPath);
  return img;
});


const imageba = computed(() => {
  const img = data.value?.bizAccountdata?.logoHost == "icon"
    || data.value?.bizAccountdata?.logoHost == ""
    ? "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png" : manaLib.getUrl(data.value?.bizAccountdata?.logoHost, data.value?.bizAccountdata?.logoPath);
  return img;
});

async function onSubmit() {
  // TODO: implemnt confirm
  await postData({}, "post-ba-topup-confirm");
  // await navigateTo("resultDialog");
}
</script>

<style></style>
