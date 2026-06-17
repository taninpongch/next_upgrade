<template>
  <MuiPage>
    <BizShareResultDialog :data="data" />
    <BizShareActionDialogConfirm @on-tapped="callback" />
  </MuiPage>
</template>

<script setup lang="ts">
const { goVisit } = useManaService();
const data = {
  Title: "ยืนยันการถอนเงิน",
  Logo: "i-heroicons-arrow-up-tray-solid",
  Message: "500.00 THB",
}

const callback = async () => {
  await goVisit("kym", "proto-bill-withdraw", "ba-withdraw");
  // navigateTo('../advance')
}
</script>
