<template>
  <UFormGroup :label="props.label">
    <slot></slot>
    <template #error="{ error }">
      <span :class="[error ? 'text-red-500 dark:text-red-400' : 'text-primary-500 dark:text-primary-400']">
        {{ error ? error : (shouldShowError && props.showErrors ? fallbackMessage : '') }}
      </span>
    </template>

  </UFormGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: any,
    name?: string,
    label?: string,
    showErrors?: boolean,
  }>(), { showErrors: false }
)

const shouldShowError = computed(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue.length === 0
  return !props.modelValue
})

const fallbackMessage = 'กรุณาเลือกรายการอย่างน้อย 1 รายการ'
</script>
