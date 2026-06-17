<template>
  <UFormGroup :label="label">
    <UCheckbox :label="textCheckbox" :ui="{ base: 'disabled:bg-gray-200 dark:disabled:bg-black', label: 'text-base' }"
      :modelValue="modelValue" @update:modelValue="$emit(emitName, $event)" v-bind:disabled="$attrs.disabled" />
  </UFormGroup>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: boolean,
    label?: string,
    textCheckbox: string
  }>(), {}
)

const emitName = "update:modelValue";
const emits = defineEmits([emitName]);
</script>