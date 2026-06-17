<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ยืนยันบัญชีนี้" />
      <MuiCard>
        <BizFinancialSharePartyEdition
          :src="src"
          :title="data.accountInfo.accountName"
          @on-tapped="onEditAccountNmae"
        />
        <BizShareListInfoHorizontal heading="ข้อมูลบัญชี" :infos="ppayInfo" />
      </MuiCard>
      <BizShareItemStatus
        title="ยกเลิกการผูกบัตรนี้"
        rightText="ยกเลิก"
        @on-tapped="onDeleteAccount"
      />
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
getData("get-ppay-account-info").then(async () => {
  src.value = manaLib.getUrl(
    data?.value?.accountInfo?.logoHost,
    data?.value?.accountInfo?.logoPath
  )
    ? manaLib.getUrl(
        data?.value?.accountInfo?.logoHost,
        data?.value?.accountInfo?.logoPath
      )
    : "i-material-symbols-light-phone-android-outline";
});
const src = ref("");

const ppayInfo = computed(() => [
  { label: "ชื่อเรียก", value: data?.value?.accountInfo?.accountName },
  { label: "เลขบัญชี", value: data?.value?.accountInfo?.accountNo },
  { label: "ประเภท", value: data?.value?.accountInfo?.accountType },
  { label: "ชื่อบัญชี", value: data?.value?.accountInfo?.nameTH },
  { label: " ", value: data?.value?.accountInfo?.nameEN },
]);

const onEditAccountNmae = () =>
  goVisit("bank-account", "account-edit", `endp-edit-${data.value.accountInfo.id}`);
const onDeleteAccount = async () => await postData({}, "post-account-delete-confirm-dlg");
</script>
