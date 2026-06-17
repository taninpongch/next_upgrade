<template>
  <MuiPage>
    <BizShareResultDialog :data="data" />
    <BizShareActionDialogConfirm @on-tapped="callback" />
  </MuiPage>
</template>

<script setup lang="ts">
const { goVisit } = useManaService();
const data = {
  Title: "ยืนยันการเติมเงิน",
  Logo: "i-material-symbols-light-move-to-inbox-rounded",
  Message: "500.00 THB",
}

const callback = async () => {
  await goVisit("kym", "proto-bill-topup", "ba-topup");
  // navigateTo('../advance')
}
</script>
