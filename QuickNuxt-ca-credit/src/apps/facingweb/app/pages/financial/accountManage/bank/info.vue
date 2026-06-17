<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ยืนยันบัญชีนี้" />
      <MuiCard>
        <BizFinancialSharePartyEdition :src="src" :title="data.accountInfo.accountName"
          @on-tapped="onEditAccountNmae" />
        <BizShareListInfoHorizontal heading="ข้อมูลบัญชี" :infos="accountInfo" />
      </MuiCard>
      <BizShareItemStatus title="ยกเลิกการผูกบัตรนี้" rightText="ยกเลิก" @on-tapped="onDeleteAccount" />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const { goVisit } = useManaService();
const bankAccount = useBankAccountStore();
const { data, pending } = storeToRefs(bankAccount);
const { getData, postData } = bankAccount;
getData("get-bank-account-info").then(() =>
  getSrc(data.value.accountInfo.logoHost, data.value.accountInfo.logoPath)
);
const src = ref("");
const getSrc = async (logoHost: string, logoPath: string) => {
  src.value = manaLib.getUrl(logoHost, logoPath)
    ? manaLib.getUrl(logoHost, logoPath)
    : "i-material-symbols-light-universal-currency-outline-rounded";
};

const accountInfo = computed(() => [
  { label: "ชื่อเรียก", value: data.value.accountInfo.accountName },
  { label: "ธนาคาร", value: data.value.accountInfo.bankName },
  { label: "เลขบัญชี", value: data.value.accountInfo.accountNo },
  { label: "ประเภท", value: data.value.accountInfo.accountType },
  { label: "ชื่อบัญชี", value: data.value.accountInfo.nameTH },
  { label: " ", value: data.value.accountInfo.nameEN },
]);

const onEditAccountNmae = () =>
  goVisit("bank-account", "account-edit", `endp-edit-${data.value.accountInfo.id}`);
const onDeleteAccount = async () =>
  await postData({}, "post-bank-account-delete-confirm-dlg");
</script>
