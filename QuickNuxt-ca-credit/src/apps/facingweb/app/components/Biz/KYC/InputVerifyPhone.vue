<template>
  <UFormGroup :label="label" > 
    <template #hint>
      <p v-if="hint == 'ข้อมูลไม่ถูกต้อง'" class="text-red-500">{{ hint }}</p>
      <p v-else class="text-blue-600">{{ hint }}</p>
    </template>
    <UInput :placeholder="placeholder" :type="type" :inputMode="inputMode" :model-value="modelValue" @update:model-value="handleInput"
      :ui="{ base: 'disabled:bg-gray-200 dark:disabled:bg-black' }" :disabled="Boolean($attrs.disabled)" />
  </UFormGroup>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    hint: string,
    modelValue?: string,
    label: string,
    placeholder?: string,
    type?: string,
    inputMode?: string,
  }>(), {}
)

const emitName = "update:modelValue";
const emits = defineEmits([emitName]);
function handleInput(value: string | number | null | undefined) {
  const evalue = value == null ? '' : String(value);
  emits(emitName, evalue);
}
</script>