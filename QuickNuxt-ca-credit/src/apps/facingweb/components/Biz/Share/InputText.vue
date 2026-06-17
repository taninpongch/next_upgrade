<template>
  <UFormGroup :label="label">
    <UInput :placeholder="placeholder" :type="type" :inputMode="inputMode" :value="modelValue" @input="handleInput"
      :ui="{ base: 'disabled:bg-gray-200 dark:disabled:bg-black' }" v-bind:disabled="$attrs.disabled" />
  </UFormGroup>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string,
    label: string,
    placeholder?: string,
    type?: string,
    inputMode?: string,
  }>(), {}
)

const emitName = "update:modelValue";
const emits = defineEmits([emitName]);
function handleInput($ev: any) {
  const evalue = $ev.target.value;
  $ev.target.parentNode.dataset.replicatedValue = evalue;
  emits(emitName, evalue);
}
</script>