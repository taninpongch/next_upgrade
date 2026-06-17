<template>
  <UFormGroup>
    <slot></slot>
    <template #error="{ error }">
      <span :class="[error ? 'text-red-500 dark:text-red-400' : 'text-primary-500 dark:text-primary-400']">
        {{ !modelValue ? error : '' }}
      </span>
    </template>
  </UFormGroup>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string,
  }>(), {}
);
</script>