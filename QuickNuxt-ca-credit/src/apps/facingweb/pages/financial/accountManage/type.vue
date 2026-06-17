<template>
  <MuiPage>
    <MuiHeader title="สร้างบัญชีใหม่" />
    <BizShareSessionTitle label="เลือกรูปแบบบัญชี" />
    <!-- TODO: แก้ไขรูปภายหลัง -->
    <BizShareItem
      src="i-material-symbols-light-phone-android-outline"
      title="พร้อมเพย์"
      @on-tapped="onSelectPromptpay"
    />
    <BizShareItem
      src="i-material-symbols-light-universal-currency-outline-rounded"
      title="บัญชีธนาคาร"
      @on-tapped="onSelectBankAccount"
    />
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const { goVisit } = useManaService();
const endpointId = useRoute().query["endpointId"] as any;

const onSelectPromptpay = () => {
  goVisit("bank-account", "account-ppay-create", endpointId);
};
const onSelectBankAccount = () => {
  goVisit("bank-account", "account-bank-create", endpointId);
};
</script>
