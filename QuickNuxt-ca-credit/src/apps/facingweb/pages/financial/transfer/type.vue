<template>
  <MuiPage>
    <MuiHeader title="รับ-โอน" />
    <BizShareSessionTitle label="เลือกวิธีการโอนจ่าย" />
    <BizShareItem src="i-material-symbols-light-phone-android-outline" title="พร้อมเพย์"
      @on-tapped="onSelectPromptpay" />
    <BizShareItem src="i-material-symbols-light-universal-currency-outline" title="บัญชีธนาคาร"
      @on-tapped="onSelectBankAccount" />
  </MuiPage>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const { goVisit } = useManaService();
const onSelectPromptpay = () => {
  goVisit("transfer", "transfer-ppay-number", "endp-transfer-ppay");
};
const onSelectBankAccount = () => {
  goVisit("transfer", "transfer-bank-number", "endp-transfer-bank");
};
</script>
