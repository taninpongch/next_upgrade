<template>
  <MuiCard class="text-center">
    <UFormGroup >
      <template #label="{ label }">
        <BizShareImage src="i-ion-file-tray-outline" class="align-middle"/>
        <span class="align-middle">{{ label }}</span>
      </template>
    </UFormGroup>
    <BizShareText :text="name" :isBold="true" />
    <BizShareItem title="ยอดเงินปัจจุบัน" :description="amount" class="text-center" :transparent="true"
      :ui="{ description: 'pt-4 text-xl font-semibold' }" />
  </MuiCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string,
    amount: string
  }>(), {}
)
</script>