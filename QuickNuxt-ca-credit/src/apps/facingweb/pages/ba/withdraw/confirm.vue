<template>
  <BizShareManaForm @submit="onSubmit">
    <div v-if="pending">
      <BizShareSkeletonLabel />
    </div>
    <div v-else>
      <MuiPage>
        <MuiHeader title="ยืนยันการถอนเงินออกจากบัญชีร้าน" />
        <MuiCard>
          <BizBAShareTransferInfo :from="transferInfo?.from" :to="transferInfo?.to" />
        </MuiCard>

        <MuiCard>
          <BizShareSessionTitle label="จำนวนที่ต้องการถอน" />
          <BizSharePartyHero src="i-material-symbols-light-outbox-rounded" :title="transferInfo?.withdrawAmount"
            subtitle="" />
        </MuiCard>

        <MuiCard>
          <BizShareItemInfo heading="หมายเหตุ" :title="data.remark ? data.remark : '-'" />
        </MuiCard>

      </MuiPage>
    </div>
    <ActionButton text="ตกลง" />
  </BizShareManaForm>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const transferInfo = ref();

getData('get-ba-withdraw-confirm').then(async () => {
  //TODO: use computed
  //TODO: change img path
  let displayLogo = "https://failfast.blob.core.windows.net/mana2018/imgs/dfshop.png";
  if (data.value?.logoHost && data.value?.logoPath) {
    displayLogo = manaLib.getUrl(data.value?.fromLogoHost, data.value?.fromLogoPath)
  }

  transferInfo.value = {
    from: {
      heading: "ร้านที่ถอน",
      src: displayLogo,
      title: data.value?.fromName,
      description: data.value?.fromWalletBalance ? `${manaLib.toText(data.value?.fromWalletBalance, 'amt')} ${manaLib.toText(data.value?.fromWalletBalance, 'cur')}` : "0.00 THB"
    },
    to: {
      heading: "ถอนไปยัง",
      src: "i-ion-wallet-outline",
      title: data.value?.toWalletDisplayName,
      description: data.value?.toWalletName
    },
    withdrawAmount: data.value?.amount ? `${manaLib.toText(data.value?.amount, 'amt')} ${manaLib.toText(data.value?.amount, 'cur')}` : "0.00 THB"
  };
});

const onSubmit = () => postData({}, "post-ba-withdraw-confirm");

</script>
