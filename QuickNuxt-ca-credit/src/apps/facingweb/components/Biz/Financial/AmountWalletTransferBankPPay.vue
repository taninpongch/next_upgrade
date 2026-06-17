<template>
  <MuiCard>
    <div>
      <BizShareItemInfo :transparent="true" heading="กระเป๋าที่เติมเข้า" :src="destinationSrc"
        :title="destinationTitle" />
      <UDivider class="mb-4" />
      <BizShareItemInfo :transparent="true" heading="บัญชีที่ใช้เติม" :src="originSrc" :title="originTitle"
        :description="originDescription" />
    </div>
  </MuiCard>

  <MuiCard>
    <BizShareInputCurrency label="จำนวนเงิน" placeholder="ระบุยอดเงิน" v-model="models.amount" name="amount" />
  </MuiCard>
  <MuiCard>
    <BizShareInputNote label="หมายเหตุ" placeholder="หมายเหตุ" v-model="models.remark" name="remark" hint="optional" />
  </MuiCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    originSrc?: string,
    originTitle: string,
    originDescription?: string,
    destinationSrc?: string,
    destinationTitle: string,
    models?: any
  }>(), {}
)
</script>