<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ยืนยันบัญชีนี้" />
      <BizShareManaForm @submit="onSubmit">
        <BizFinancialDetailWalletTransferWithdraw srcDest="i-ion-wallet-outline" :titleDest="data?.fromName"
          :detailOrigin="data?.details" :amount="{
            src: 'i-material-symbols-light-outbox-rounded',
            title: data?.amount,
            subtitle: '',
          }" />
        <ActionButton text="ตกลง" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext, ActionButton } from "@manaapp/ui";

const manaLib = await getManaContext();
const withdrawStore = useWithdrawStore();
const { dataWithdraw, pending } = storeToRefs(withdrawStore);
const { getData, postData } = withdrawStore;
const data = ref();

getData("get-withdraw-confirm-data").then(async () => {
  if (dataWithdraw.value.session.outs[0].txData.accountType == "ExternalPPay") {
    data.value = {
      fromName: dataWithdraw?.value?.session?.ins[0].txData.accountType,
      details: [
        { label: "เลขบัญชี", value: dataWithdraw.value.session.outs[0].txData.accountNumber },
        {
          label: "ประเภท",
          value:
            dataWithdraw.value.session.outs[0].txData.accountType == "ExternalPPay"
              ? "พร้อมเพย์"
              : "บัญชีธนาคาร",
        },
        { label: "ชื่อบัญชี", value: dataWithdraw.value.session.outs[0].txData.accountNameTH },
        { label: " ", value: dataWithdraw.value.session.outs[0].txData.accountNameEN },
      ],
      amount: manaLib.toText(dataWithdraw.value.session.outs[0].amount),
    };
  } else {
    data.value = {
      fromName: dataWithdraw?.value?.session?.ins[0].txData.accountType,
      details: [
        { label: "ธนาคาร", value: dataWithdraw?.value?.session?.outs[0].txData.bankName },
        { label: "เลขบัญชี", value: dataWithdraw?.value?.session?.outs[0].txData.accountNumber },
        {
          label: "ประเภท",
          value:
            dataWithdraw?.value?.session?.ins[0].txData.accountType == "ExternalPPay"
              ? "พร้อมเพย์"
              : "บัญชีธนาคาร",
        },
        { label: "ชื่อบัญชี", value: dataWithdraw.value.session.outs[0].txData.accountNameTH },
        { label: " ", value: dataWithdraw.value.session.outs[0].txData.accountNameEN },
      ],
      amount: manaLib.toText(dataWithdraw.value.session.outs[0].amount),
    };
  }
});

async function onSubmit() {
  await postData({}, "post-withdraw-confirm-data");
}
</script>
