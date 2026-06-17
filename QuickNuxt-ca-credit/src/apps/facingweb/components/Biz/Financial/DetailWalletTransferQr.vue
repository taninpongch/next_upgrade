<template>
  <MuiCard>
    <BizShareItemInfo heading="กระเป๋าที่เติมเข้า" :src="srcDest" :title="titleDest" />
  </MuiCard>
  <MuiCard>
    <BizShareSessionTitle label="จำนวนที่ต้องการเติม" />
    <BizSharePartyHero :src="amount.src" :title="amount.title" :subtitle="amount.subtitle" />
  </MuiCard>
  <MuiCard>
    <BizShareItemInfo heading="หมายเหตุ" :title="descriptionRemark" />
  </MuiCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    srcDest: string,
    titleDest: string,
    amount: {
      src: string,
      title: string,
      subtitle: string
    },
    descriptionRemark?: string
  }>(), {descriptionRemark:"-"}
)
</script>
