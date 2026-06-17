<template>
  <div>
    <BizShareItemInfo :heading="from?.heading" :src="from?.src" :title="from?.title" :description="from?.description" />
    <UDivider class="mb-4" />
    <BizShareItemInfo :heading="to?.heading" :src="to?.src" :title="to?.title" :description="to?.description" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    from: {
      heading?: string,
      src: string,
      title: string,
      description?: string
    },
    to: {
      heading?: string,
      src: string,
      title: string,
      description?: string
    }
  }>(), {}
)

// TODO: เปลี่ยนไปเป็น component ส่วนกลาง
// AmountWalletTransferBankPPay (BizFinancialAmountWalletTransferBankPPay) อาจมาเรียกใช้ตัวนี้แทน??
</script>