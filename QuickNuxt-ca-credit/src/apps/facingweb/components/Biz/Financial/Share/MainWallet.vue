<template>
  <MuiCard class="text-center bg-red-600 dark:bg-red-600 " @click="emits(emitName)">
    <UFormGroup :label="name" :ui="{ label: { base: 'text-white' } }">
      <template #label="{ label }">
        <BizShareImage src="i-ion-wallet-outline" class="align-middle"
          :ui="{ background: 'bg-transparent dark:bg-transparent', rounded: '', icon: { base: 'text-white dark:text-white' } }" />
        <span class="align-middle">{{ label }}</span>
      </template>
      <template #hint>
        <BizShareImage src="i-heroicons-star-16-solid"
          :ui="{ background: 'bg-transparent dark:bg-transparent', rounded: '', icon: { base: 'text-white dark:text-white' } }" />
      </template>
    </UFormGroup>
    <BizShareItem title="ยอดเงินปัจจุบัน" :description="amount" class="text-center text-white" :transparent="true"
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
const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>