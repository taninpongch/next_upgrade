<template>
  <MuiCard>
    <BizShareItemInfo :heading="headingTop" :src="srcDest" :title="titleDest" />
  </MuiCard>
  <MuiCard>
    <BizShareListInfoHorizontal :heading="headingMiddle" :infos="detailOrigin" />
  </MuiCard>
  <MuiCard>
    <BizShareSessionTitle :label="headingBottom" />
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
    },
    headingTop: string,
    headingMiddle: string,
    headingBottom: string
  }>(), {}
)
</script>
