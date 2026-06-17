<template>
  <MuiPage>
    <MuiHeader title="รายละเอียดการเติมเงิน" />
    <BizFinancialTopupDetailComplete :data="dataTopup" />
    <BizShareManaForm @submit="onSubmit">
      <ActionButton text="ปิด" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script lang="ts" setup>
import { ActionButton } from "@manaapp/ui";
const { goVisit } = useManaService();
const kymStore = useKymStore();
const { getData, postData } = kymStore;

const dataTopup = {
  wallet: {
    displayName: "Food Prada",
    walletName: "",
    logoHost: "failfast.blob.core.windows.net",
    logoPath: "easy/bank-account/assets/dfprofile.png",
  },
  thaiQr: {
    logoHost: "failfast.blob.core.windows.net",
    logoPath: "easy/bank-account/assets/thaiqr.png",
  },
  session: {
    qrUrlHostFqdn: "docs.lightburnsoftware.com",
    qrUrlPath: "legacy/img/QRCode/ExampleCode.png",
    amount: {
      currency: "THB",
      amountUnit: 500000,
    },
    actionDate: "2024-03-03T08:46:11.067Z",
    remark: "-",
  },
};

async function onSubmit() {
  await postData({}, "post-ca-topup-completed");
  // await goVisit("kym", "proto-ca-advance", "ca-advance");
  // await navigateTo("../advance");
}
</script>

<style></style>
