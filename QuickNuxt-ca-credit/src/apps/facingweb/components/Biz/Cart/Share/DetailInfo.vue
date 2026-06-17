<template>
  <BizBillShareTxSummary heading="รายละเอียดการจ่ายเงิน" :data="data" />
  <UDivider />
  <BizCartShareCoupon :coupon="coupon" @on-tapped="emits(emitName)" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    data: {
      description: string,
      value: string
    }[],
    coupon?: {
      name: string
    }[]
  }>(), {}
)

const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>