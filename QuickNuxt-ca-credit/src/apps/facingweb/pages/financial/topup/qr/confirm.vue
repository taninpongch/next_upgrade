<template>
  <div v-if="pending">
    <BizShareSkeletonLogo />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ยืนยันบัญชีนี้" />
      <BizShareManaForm @submit="onSubmit">
        <BizFinancialDetailWalletTransferQr srcDest="i-ion-wallet-outline" :titleDest="dataTopup?.wallet?.walletName"
          :amount="{
            src: 'i-material-symbols-light-move-to-inbox-rounded',
            title: amount,
            subtitle: '',
          }" :descriptionRemark="dataTopup?.session?.remark ? dataTopup?.session?.remark : '-'
            " />
        <ActionButton text="ตกลง" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext, ActionButton } from "@manaapp/ui";

const manaLib = await getManaContext();
const topupStore = useTopupStore();
const { dataTopup, pending } = storeToRefs(topupStore);
const { getData, postData } = topupStore;

const amount = ref();
getData("get-topup-qr-confirm").then(async () => {
  amount.value = manaLib.toText(dataTopup?.value.session.totalAmount);
});

async function onSubmit() {
  await postData({}, "post-topup-qr-confirm");
}
</script>
