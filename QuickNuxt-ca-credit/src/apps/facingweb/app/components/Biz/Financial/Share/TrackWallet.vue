<template>
  <MuiCard class=" bg-gray-500 dark:bg-gray-500 ">
    <BizShareImage src="i-material-symbols-light-bookmark-star-outline-rounded" size=""
      :ui="{ background: 'bg-transparent dark:bg-transparent justify-center', rounded: '', icon: { base: 'text-white dark:text-white' } }" />
    <span class="text-white">Tracked money</span>
    <p class="text-white font-semibold text-2xl ">{{ amount }}</p>
  </MuiCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name?: string,
    amount: string
  }>(), { name: "Tracked money", amount: "0.00" }
)
const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>