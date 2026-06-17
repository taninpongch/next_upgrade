<template>
  <MuiPage>
    <MuiHeader title="ถอนเงิน" />
    <BizShareListItem
      heading="เลือกบัญชีที่ผูกไว้"
      :data="myAccount"
      @on-select-item="callbackPath"
    />
  </MuiPage>
</template>

<script lang="ts" setup>
const { goVisit } = useManaService();
const myAccount = [
  {
    id: "01",
    src: "i-material-symbols-light-account-balance-wallet-outline-sharp",
    title: "บัญชีธุรกิจของฉัน",
    description: "****56789",
    path: "create",
  },
];

const callbackPath = (value: any) => {
  navigateTo(value.path);
};
</script>

<style></style>
