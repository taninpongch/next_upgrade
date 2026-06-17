<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ตรวจสอบข้อมูลของคุณ" />
      <BizShareManaForm @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero :src="fromSrc" :title="data?.shop?.name" />
          <BizBillShareTxSummary heading="รายละเอียดธุรกรรม" :data="txsummary" />
          <BizShareLine />
          <BizShareItemWalletChange src="i-ion-wallet-outline" heading="กระเป๋าเงิน"
            :title="data?.fromwalletName?.walletName" />
        </MuiCard>
        <MuiCard>
          <BizShareItemInfo heading="หมายเหตุ" :title="data?.remark ? data?.remark : '-'" />
        </MuiCard>
        <ActionButton text="ตกลง" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useCartStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const fromSrc = ref();

getData("get-cart-additional-fiat-confirm").then(async () => {
  if (data.value?.shop?.logoHost && data.value?.shop?.logoPath) {
    fromSrc.value = manaLib.getUrl(data.value?.shop?.logoHost, data.value?.shop?.logoPath);
  } else {
    fromSrc.value = "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
  }
});

const txsummary = computed(() => {
  return [
    { description: 'จำนวนเงิน', value: manaLib?.toText(data.value?.amount) },
    { description: 'ดอกเบี้ย', value: manaLib?.toText(data.value?.interest) },
    { description: 'ส่วนลด', value: `-${manaLib?.toText(data.value?.discount)}` },
    { description: 'รวมทั้งหมด', value: manaLib?.toText(data.value?.totalAmount) }
  ];
});

async function onSubmit() {
  await postData({}, "post-cart-additional-fiat-confirm");
}

</script>