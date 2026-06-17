<template>
  <BizShareManaForm @submit="onSubmit">
    <div v-if="pending">
      <BizShareSkeletonLabel />
    </div>
    <div v-else-if="dataRefund && !dataRefund.error">
      <MuiPage>
        <MuiHeader title="การรับเงินคืนจากร้านค้า" />
        <MuiCard>
          <BizShareItemInfo :src="transferInfo?.fromSrc" :heading="dataRefund?.fromHeading"
          :title="dataRefund?.fromName" />
        </MuiCard>
        <MuiCard>
          <BizShareItemInfo :src="transferInfo?.toSrc" :heading="dataRefund?.toHeading"
          :title="dataRefund?.toWalletName" />
        </MuiCard>
        <MuiCard>
          <BizShareSessionTitle label="จำนวนเงินที่ได้รับคืน" />
          <BizSharePartyHero src="i-material-symbols-light-move-to-inbox-rounded" :title="transferInfo?.amount"
          subtitle="" />
        </MuiCard>
      </MuiPage>
    </div>
    <div v-else>
      <MuiPage>
        <MuiHeader title="การรับเงินคืนจากร้านค้า" />
        <BizShareShowError :src="displayErrorImage" :title="dataRefund.error?.title" :description="dataRefund.error?.message" />
      </MuiPage>
    </div>
    <ActionButton text="ตกลง" />
  </BizShareManaForm>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useRefundStore();
const { dataRefund, pending } = storeToRefs(store);
const { getData, postData } = store;

getData('get-refund-confirm').then(async () => {
});

const transferInfo = computed(() => {
  if (!manaLib || !dataRefund.value) {
    return {
      fromSrc: "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png",
      toSrc: "i-ion-wallet-outline",
      amount: "0.00 THB"
    }
  }
  return {
    fromSrc: dataRefund.value?.fromLogoHost == 'icon' ? dataRefund.value?.fromLogoPath : manaLib.getUrl(dataRefund.value?.fromLogoHost, dataRefund.value?.fromLogoPath),
    toSrc: dataRefund.value?.toLogoHost == 'icon' ? dataRefund.value?.toLogoPath : manaLib.getUrl(dataRefund.value?.toLogoHost, dataRefund.value?.toLogoPath),
    amount: `${manaLib.toText(dataRefund.value?.amount, 'amt')} ${manaLib.toText(dataRefund.value?.amount, 'cur')}`,
  }
});

// const transferInfo = {
//   from: {
//     heading: "การรับเงินคืน",
//     src: "https://failfast.blob.core.windows.net/mana2018/imgs/dfshop.png",
//     title: "ร้านบ้านมอ",
//     description: "1,000.00 THB"
//   },
//   to: {
//     heading: "กระเป๋าที่รับเงิน",
//     src: "i-ion-wallet-outline",
//     title: "MyWallet",
//     description: ""
//   },
//   Amount: "300.00 THB"
// };

const displayErrorImage = computed(() => {
  let displayLogo = "https://failfast.blob.core.windows.net/mcontent-imgs/icons/iconunsuccess.png";
  if (manaLib && dataRefund && dataRefund.value.error && dataRefund.value.error.logoHost && dataRefund.value.error.logoPath) {
    displayLogo = dataRefund.value.error?.logoHost == 'icon' ? dataRefund.value.error.logoPath : manaLib.getUrl(dataRefund.value.error.logoHost, dataRefund.value.error.logoPath);
  }

  return displayLogo;
})

const onSubmit = () => postData({}, "post-refund-confirm");

</script>