<template>
  <MuiCard>
    <div>
      <BizShareSessionTitle label="กระเป๋าที่ถอน" />
      <BizShareItemStatus :transparent="true" :title="originTitle" :src="originSrc" :rightText="originAmount" />
      <UDivider class="mb-4" />
      <BizShareItemInfo :transparent="true" heading="บัญชีที่ถอนออก" :src="destinationSrc" :title="destinationTitle"
        :description="destinationSubTitle" />
    </div>
  </MuiCard>

  <MuiCard>
    <BizShareInputCurrency label="จำนวนเงิน" placeholder="ระบุยอดเงิน" v-model="models.amount" name="amount" />
  </MuiCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    originSrc?: string,
    originTitle: string,
    originAmount: string,
    destinationSrc?: string,
    destinationTitle: string,
    destinationSubTitle: string,
    models?: any
  }>(), {}
)
</script>