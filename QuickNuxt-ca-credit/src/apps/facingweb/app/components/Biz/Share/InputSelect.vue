<template>
  <UFormGroup :label="label">
    <USelect :placeholder="placeholder" :options="options" option-attribute="name" :ui="{ base: 'disabled:bg-gray-200 dark:disabled:bg-black' }"
      :model-value="modelValue" @update:model-value="handleInput" :disabled="Boolean($attrs.disabled)" />
  </UFormGroup>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string,
    label: string,
    placeholder?: string,
    options: {
      name: string,
      value: string,
    }[]
  }>(), {}
)

const emitName = "update:modelValue";
const emits = defineEmits([emitName]);
function handleInput(value: string | number | null | undefined) {
  emits(emitName, value == null ? '' : String(value));
}
</script>