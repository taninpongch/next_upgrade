<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ยืนยันบัญชีนี้" />
      <BizShareManaForm @submit="onSubmit">
        <BizFinancialDetailWalletTransferBankPPay src-dest="i-ion-wallet-outline"
          :title-dest="dataTopup?.wallet?.walletName" :detail-origin="data?.details" :amount="{
            src: 'i-material-symbols-light-move-to-inbox-rounded',
            title: data?.amount,
            subtitle: '',
          }" />
        <ActionButton text="ตกลง"></ActionButton>
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext, ActionButton } from "@manaapp/ui";

const manaLib = await getManaContext();
const _data = useTopupStore();
const { dataTopup, pending } = storeToRefs(_data);
const { postData, getData } = _data;
const { getlistbank } = useManaService();
const data = ref<any>();
const bankList = ref();
const bankAccStore = useBankAccountStore();
const { data: databank } = storeToRefs(bankAccStore);
const { getData: getDataBank } = bankAccStore;


getData("get-topup-account-confirm").then(async () => {
  if (dataTopup?.value.session?.fromType == "ExternalBankAccount") {
    await getDataBank("get-bank-list-dlg").then(() => { convertAll(databank.value.items) });
    const getbank = await getlistbank(bankList.value, dataTopup?.value?.session?.fromAccountCode);
    data.value = {
      details: [
        { label: "ธนาคาร", value: getbank.title },
        { label: "เลขบัญชี", value: dataTopup?.value.session?.fromAccountNo },
        {
          label: "ประเภท",
          value: dataTopup?.value.session?.fromType == "ExternalBankAccount" ? "บัญชีธนาคาร" : "พร้อมเพย์",
        },
        { label: "ชื่อบัญชี", value: dataTopup?.value.session?.fromName },
        { label: " ", value: dataTopup?.value.session?.fromSubName },
      ],
      amount: `${manaLib.toText(dataTopup?.value?.session?.amount, "amt")} ${manaLib.toText(
        dataTopup?.value?.session?.amount,
        "cur"
      )}`,
    };
  } else {
    data.value = {
      details: [
        { label: "เลขบัญชี", value: dataTopup?.value.session?.fromAccountNo },
        {
          label: "ประเภท",
          value: dataTopup?.value.session?.fromType == "ExternalBankAccount" ? "บัญชีธนาคาร" : "พร้อมเพย์",
        },
        { label: "ชื่อบัญชี", value: dataTopup?.value.session?.fromName },
        { label: " ", value: dataTopup?.value.session?.fromSubName },
      ],
      amount: `${manaLib.toText(dataTopup?.value?.session?.amount, "amt")} ${manaLib.toText(
        dataTopup?.value?.session?.amount,
        "cur"
      )}`,
    };
  }
});

const convertAll = async (list: any[]) => {
  bankList.value = await list.map((it) => {
    return {
      id: it.bankId,
      src: manaLib.getUrl(it.bankLogoHost, it.bankLogoPath),
      title: it.bankName,
      description: it.bankEngName,
    };
  });
};


async function onSubmit() {
  await postData({}, "post-topup-account-confirm");
}
</script>
