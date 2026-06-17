<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ยืนยันบัญชีนี้" />
      <BizShareManaForm @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero src="i-material-symbols-light-universal-currency-outline-rounded" title="บัญชีธนาคาร" />
          <BizShareListInfoHorizontal heading="ข้อมูลบัญชี" :infos="bankinfo" />
        </MuiCard>
        <ActionButton text="ยืนยัน" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext, ActionButton } from "@manaapp/ui";

const manaLib = await getManaContext();
const bankAccount = useBankAccountStore();
const { data, pending } = storeToRefs(bankAccount);
const { getData, postData } = bankAccount;
const { getlistbank } = useManaService();

const bankinfo = ref<any>([]);
const bankList = ref();
const convertAll = async (list: any[]) => {
  bankList.value = list.map((it) => {
    return {
      id: it.bankId,
      src: manaLib.getUrl(it.bankLogoHost, it.bankLogoPath),
      title: it.bankName,
      description: it.bankEngName,
    };
  });
};

getData("get-bank-list-dlg").then(async () => {
  convertAll(data.value.items)
  getData("get-bank-account-confirm-data").then(async () => {
    const getbank = await getlistbank(bankList.value, data?.value?.accountInfo?.bankId);    
    bankinfo.value = [
      { label: "ธนาคาร", value: getbank?.title },
      { label: "ชื่อเรียก", value: data?.value.accountInfo?.accountName },
      { label: "เลขบัญชี", value: data?.value.accountInfo?.accountNo },
      { label: "ประเภท", value: data?.value.accountInfo?.accountType },
      { label: "ชื่อบัญชี", value: data?.value.accountInfo?.nameTH },
      { label: " ", value: data?.value.accountInfo?.nameEN },
    ];
  });
});

const onSubmit = () => postData({}, "post-confirm-bank-account");
</script>
