<template>
  <MuiCard>
    <BizShareItemInfo heading="กระเป๋าที่เติมเข้า" :src="srcDest" :title="titleDest" />
  </MuiCard>
  <MuiCard>
    <BizShareListInfoHorizontal heading="บัญชีที่ใช้เติม" :infos="detailOrigin" />
  </MuiCard>
  <MuiCard>
    <BizShareSessionTitle label="จำนวนที่ต้องการเติม" />
    <BizSharePartyHero :src="amount.src" :title="amount.title" :subtitle="amount.subtitle" />
  </MuiCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    srcDest: string,
    titleDest: string,
    detailOrigin: {
      label: string,
      value: string,
    }[],
    amount: {
      src: string,
      title: string,
      subtitle: string
    }
  }>(), {}
)
</script>
