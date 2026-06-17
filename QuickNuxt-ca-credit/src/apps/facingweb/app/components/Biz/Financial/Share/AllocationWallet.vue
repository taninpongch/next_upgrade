<template>
  <MuiCard class="text-center bg-[#9191A3] dark:bg-[#9191A3]">
    <UFormGroup :label="name" :ui="{ label: { base: '' } }">
      <template #label="{ label }">
        <BizShareImage src="i-lucide-wallet-cards" class="align-middle"
          :ui="{ background: 'bg-transparent dark:bg-transparent', rounded: '', icon: { base: '' } }" />
        <span class="align-middle">{{ label }}</span>
      </template>
      <template #hint>
        <div @click="emits(emitName)">
          <BizShareImage src="i-lucide-chart-pie"
            :ui="{ background: 'bg-transparent dark:bg-transparent', rounded: '', icon: { base: 'text-black dark:text-black' } }" />
        </div>
      </template>
    </UFormGroup>
    <BizShareItem title="วงเงินคงเหลือ" :description="amount" class="text-center " :transparent="true"
      :ui="{ description: 'pt-4 text-xl font-semibold' }" />
    <UProgress :value="currentAmount" :max="maxAllowance" color="black" />
    <BizShareText :text="`วงเงิน ${totalamount}`" alignment="right" class="text-white" />

  </MuiCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string,
    amount: string,
    totalamount: string,
    currentAmount?: any,
    maxAllowance?: any
  }>(), {}
)
const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>