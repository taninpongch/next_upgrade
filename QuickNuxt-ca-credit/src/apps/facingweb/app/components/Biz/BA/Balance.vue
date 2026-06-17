<template>
  <MuiCard>
    <BizShareItemWalletChange heading="ยอดเงินคงเหลือ" :button="{ label: 'ดูบัญชี', icon: '' }" :title="amount"
      src="i-material-symbols-light-universal-currency-outline-rounded" @on-tapped="emits(emitTxlog)" />
    <UDivider class="mb-4" />
    <div class="text-center">
      <BizShareActionNormal icon="i-ion-qr-code-outline" :rounded="true" label="คิวอาร์รับเงิน" color="white"
        :blocked="false" @on-tapped="emits(emitQR)" />
    </div>
  </MuiCard>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    amount: string
  }>(), {}
)

const emitTxlog = "onTappedTxlog";
const emitQR = "onTappedQr";
const emits = defineEmits([emitTxlog, emitQR]);
</script>
