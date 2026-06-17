<template>
  <UFormGroup :label="label" :hint="hint">
    <!-- <template #label="{ label }">
      {{ label }}
      <UBadge variant="subtle" size="xs" :ui="{ rounded: 'rounded-full' }">{{ hint }}</UBadge>
    </template> -->
    <UTextarea :placeholder="placeholder" :ui="{ base: 'disabled:bg-gray-200 dark:disabled:bg-black' }"
      :value="modelValue" @input="handleInput" v-bind:disabled="$attrs.disabled" />
  </UFormGroup>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string,
    label: string,
    placeholder?: string,
    hint?: string
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