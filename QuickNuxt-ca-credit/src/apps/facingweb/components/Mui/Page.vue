<template>
  <UContainer :class="bgWhite ? 'bg-white dark:bg-gray-900 space-y-4' : 'space-y-4'"
    :ui="{ base: '', padding: 'p-4 sm:p-4 lg:p-4', constrained: '' }">
    <slot></slot>
  </UContainer>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    bgWhite?: boolean
  }>(), {}
)
</script>